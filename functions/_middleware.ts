// =============================================================================
// Cloudflare Pages Functions middleware — digest gate.
// =============================================================================
// Runs before every request to the digest site. Three paths:
//
//   POST /__auth      → validate JWT from form body, set HttpOnly cookie,
//                       302 redirect to /
//   GET  /splash.html → always public (it's the "you haven't unlocked"
//                       message)
//   anything else     → require digest_session cookie. If valid → serve
//                       static asset. If missing or invalid → serve
//                       splash.html with 401 status.
//
// JWT format: HS256, claims { sub, name, iss, iat, exp }. Validated against
// any secret in DIGEST_SHARED_SECRETS (comma-separated) for zero-downtime
// rotation. Issuer must match DIGEST_JWT_ISSUER.
//
// IMPORTANT: this file is the digest's only auth gate. If it ever fails
// open (serves protected content without a valid cookie), the digest leaks.
// curl-test the gate after any change to this file. See test plan G1-G5.
// =============================================================================

const COOKIE_NAME = "digest_session";
const EXPECTED_ISSUER = "social.patient-investor";

type Env = {
  DIGEST_SHARED_SECRETS: string;
  // Optional, used for splash page CTA. Falls back to "/" if absent.
  SOCIAL_URL?: string;
  /**
   * Feature flag for the gate itself. When NOT equal to "true", middleware
   * passes through (no gating, no cookie check, no splash redirect). Lets
   * us deploy the gate code without immediately locking out existing
   * digest readers. Flip to "true" via Cloudflare Pages dashboard once
   * current readers have been granted access via social admin toggle.
   *
   * The middleware always handles POST /__auth (for token handshake) even
   * when gating is disabled — this avoids race conditions during rollout
   * where members try the flow before the flag flips.
   */
  GATE_ENABLED?: string;
};

// Minimal Cloudflare Pages Functions types. Avoids dragging in
// @cloudflare/workers-types as a dep just for these two surfaces.
type PagesContext<EnvT> = {
  request: Request;
  env: EnvT;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  params: Record<string, string>;
};
type PagesFunction<EnvT = unknown> = (
  context: PagesContext<EnvT>,
) => Response | Promise<Response>;

// ----- Base64url helpers ----------------------------------------------------

function b64urlDecode(input: string): Uint8Array {
  // base64url → base64 (URL-safe → standard)
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (input.length % 4)) % 4);
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  // Constant-time compare. Don't short-circuit on length mismatch for the
  // signature check itself — but lengths differing means false anyway.
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ----- JWT verification ----------------------------------------------------

type Claims = {
  sub: string;
  name: string;
  iss: string;
  iat: number;
  exp: number;
};

async function verifyHS256(
  token: string,
  secret: string,
): Promise<Claims | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerPart, payloadPart, sigPart] = parts;

  // Decode + check header.
  let header: { alg?: string; typ?: string };
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlDecode(headerPart)));
  } catch {
    return null;
  }
  if (header.alg !== "HS256") return null;

  // Decode payload.
  let payload: Partial<Claims>;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadPart)));
  } catch {
    return null;
  }
  if (
    typeof payload.sub !== "string" ||
    typeof payload.name !== "string" ||
    typeof payload.iss !== "string" ||
    typeof payload.iat !== "number" ||
    typeof payload.exp !== "number"
  ) {
    return null;
  }
  if (payload.iss !== EXPECTED_ISSUER) return null;
  const nowSec = Math.floor(Date.now() / 1000);
  if (payload.exp <= nowSec) return null;

  // Verify signature.
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify", "sign"],
  );
  const data = enc.encode(`${headerPart}.${payloadPart}`);
  const sig = b64urlDecode(sigPart);
  // Web Crypto verify is constant-time internally. Cast to BufferSource — TS
  // generic-Uint8Array narrowing isn't expressive enough for the WebCrypto
  // signature on every TS version.
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sig as unknown as BufferSource,
    data as unknown as BufferSource,
  );
  if (!ok) return null;

  return payload as Claims;
}

async function verifyToken(token: string, env: Env): Promise<Claims | null> {
  const secrets = (env.DIGEST_SHARED_SECRETS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (secrets.length === 0) return null;
  for (const s of secrets) {
    const claims = await verifyHS256(token, s);
    if (claims) return claims;
  }
  return null;
}

// ----- Cookie helpers ------------------------------------------------------

function getCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function buildSetCookie(value: string, expSeconds: number): string {
  const maxAge = Math.max(0, expSeconds - Math.floor(Date.now() / 1000));
  return [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    // Lax works because the cookie is set on a TOP-LEVEL POST navigation
    // initiated by a form submit from the social side. First-party context
    // to the digest origin. SameSite=None would widen CSRF surface without
    // benefit.
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

// ----- Splash response -----------------------------------------------------

async function splashResponse(
  context: { env: Env; next: () => Promise<Response> },
  status: number,
): Promise<Response> {
  // Fetch the static splash.html from the deploy and return its body with
  // the chosen status. Pages serves splash.html as an ordinary static file
  // — we just relabel the response status here.
  // Calling next() on the splash path skips re-running this middleware.
  const splashReq = new Request(
    new URL("/splash.html", "https://example.invalid").toString(),
  );
  try {
    // Pages Functions provide a way to fetch static assets via context.next()
    // when path matches. Simpler approach: synthesize the response directly.
    return new Response(SPLASH_HTML(context.env.SOCIAL_URL ?? "/"), {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Unauthorized", { status });
  }
}

// Inline fallback splash. If functions/_middleware can't reach static
// splash.html for any reason, this string is what serves. Kept tiny on
// purpose — splash.html (the real file) is the canonical version.
function SPLASH_HTML(socialUrl: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>The Patient Investor Digest</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root { --bg:#0D0B07; --text:#E8E8E4; --muted:#888880; --gold:#C9A84C; }
  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', -apple-system, sans-serif;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    line-height: 1.65;
  }
  .stage {
    text-align: center;
    max-width: 540px;
    position: relative;
  }
  .lamp {
    width: 10px; height: 10px;
    background: var(--gold);
    border-radius: 50%;
    margin: 0 auto 32px;
    box-shadow: 0 0 60px 20px rgba(201,168,76,0.05);
  }
  .wordmark {
    color: var(--gold);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.2em;
    margin-bottom: 96px;
  }
  h1 {
    font-weight: 700;
    font-size: 60px;
    margin-bottom: 32px;
    line-height: 1.1;
  }
  .body p {
    font-size: 18px;
    margin-bottom: 24px;
  }
  .body em {
    font-style: italic;
    color: var(--text);
  }
  .closing {
    color: var(--gold);
    font-weight: 500;
    font-size: 16px;
    margin: 40px 0;
  }
  a.back {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    transition: color 180ms;
  }
  a.back:hover { color: var(--gold); text-decoration: underline; text-underline-offset: 4px; }
  @media (max-width: 640px) {
    h1 { font-size: 40px; }
    .body p { font-size: 16px; }
    .wordmark { letter-spacing: 0.15em; }
  }
</style>
</head><body>
<main class="stage">
  <div class="lamp" aria-hidden="true"></div>
  <div class="wordmark">PATIENT INVESTOR DIGEST</div>
  <h1>Hello there.</h1>
  <div class="body">
    <p>You've found the Digest. It hasn't unlocked for you yet, but it's waiting. Each week, a new issue ties the week's actual market news to the variables you're learning. Stories end with Sparks that open into live group conversations where members work through the trade-offs together.</p>
    <p><em>It's the secret-agent toolkit for the mastermind. The place where the variables stop being abstract and start being how you read the market.</em></p>
  </div>
  <div class="closing">Stay the course. You'll unlock it as you go.</div>
  <a class="back" href="${socialUrl}">← Back to the mastermind</a>
</main>
</body></html>`;
}

// ----- Main middleware entry -----------------------------------------------

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // POST /__auth — token handshake from the social side. Extract token from
  // application/x-www-form-urlencoded body, validate, set cookie, redirect.
  if (request.method === "POST" && url.pathname === "/__auth") {
    let token: string | null = null;
    try {
      const form = await request.formData();
      const raw = form.get("t");
      token = typeof raw === "string" ? raw : null;
    } catch {
      // Fall through to splash.
    }
    if (!token) return splashResponse(context, 400);

    const claims = await verifyToken(token, env);
    if (!claims) return splashResponse(context, 401);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": buildSetCookie(token, claims.exp),
        "Cache-Control": "no-store",
      },
    });
  }

  // GET /splash.html — always public.
  if (url.pathname === "/splash.html") {
    return next();
  }

  // Feature flag: when off, pass through everything else (no gating).
  // Lets us deploy the middleware without locking out current readers.
  // POST /__auth above runs regardless so members can pre-authenticate.
  if (env.GATE_ENABLED !== "true") {
    return next();
  }

  // Every other path: require a valid cookie.
  const token = getCookie(request, COOKIE_NAME);
  if (!token) return splashResponse(context, 401);
  const claims = await verifyToken(token, env);
  if (!claims) return splashResponse(context, 401);

  // Cookie is valid. Inject claims as a tiny script the digest page can read
  // for the "Welcome back, [name]" strip. We DON'T inject the raw token —
  // sparks.js calls /api/digest/discussions using cookie-based auth via a
  // server-side proxy if needed. For v1, the name is the only thing the
  // page needs from the JWT.
  const response = await next();
  // Only rewrite HTML responses; leave assets alone.
  const ct = response.headers.get("Content-Type") ?? "";
  if (!ct.startsWith("text/html")) return response;

  const safeName = String(claims.name)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const inject = `<script>window.__DIGEST_MEMBER__=${JSON.stringify({ name: claims.name, sub: claims.sub })};</script>`;
  void safeName; // reserved for future inline templating
  const original = await response.text();
  const rewritten = original.includes("</head>")
    ? original.replace("</head>", `${inject}</head>`)
    : inject + original;
  return new Response(rewritten, {
    status: response.status,
    headers: response.headers,
  });
};
