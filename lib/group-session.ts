// Shared session helpers for the Digest "For the Group" Pages Functions.
//
// Lives OUTSIDE functions/ so Cloudflare Pages never treats it as a route; the
// function files import it and esbuild bundles it in. It re-implements the same
// HS256 verify + cookie read as functions/_middleware.ts (kept separate on
// purpose — the live gate stays untouched). Claims shape and the cookie name
// mirror the social side's mintDigestToken: { sub, name, iss, iat, exp }.

const COOKIE_NAME = "digest_session";
const EXPECTED_ISSUER = "social.patient-investor";

// Fallback keeps the proxies working even if SOCIAL_URL isn't set on the Pages
// project. The social app's canonical prod origin.
const SOCIAL_URL_FALLBACK = "https://patient-investor-demo.vercel.app";

export type GroupEnv = {
  DIGEST_SHARED_SECRETS?: string;
  SOCIAL_URL?: string;
};

export type SessionClaims = {
  sub: string;
  name: string;
  iss: string;
  iat: number;
  exp: number;
};

export function resolveSocialUrl(env: GroupEnv): string {
  return (env.SOCIAL_URL?.trim() || SOCIAL_URL_FALLBACK).replace(/\/$/, "");
}

/** Raw JWT string from the HttpOnly digest_session cookie, or null. */
export function getSessionToken(request: Request): string | null {
  const cookie = request.headers.get("Cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function b64urlDecode(input: string): Uint8Array {
  const b64 =
    input.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (input.length % 4)) % 4);
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function verifyHS256(
  token: string,
  secret: string,
): Promise<SessionClaims | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerPart, payloadPart, sigPart] = parts;

  let header: { alg?: string };
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlDecode(headerPart)));
  } catch {
    return null;
  }
  if (header.alg !== "HS256") return null;

  let payload: Partial<SessionClaims>;
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
  if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    b64urlDecode(sigPart) as unknown as BufferSource,
    enc.encode(`${headerPart}.${payloadPart}`) as unknown as BufferSource,
  );
  return ok ? (payload as SessionClaims) : null;
}

/** Verify a token against any of the comma-separated shared secrets. */
export async function verifySession(
  token: string,
  env: GroupEnv,
): Promise<SessionClaims | null> {
  const secrets = (env.DIGEST_SHARED_SECRETS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const s of secrets) {
    const claims = await verifyHS256(token, s);
    if (claims) return claims;
  }
  return null;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
