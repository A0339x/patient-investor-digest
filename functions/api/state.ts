// GET /api/state — which issues has the members platform put on hold?
//
// The Digest hides an issue until its publishAt time AND while its id is on the
// platform's held list (an issue the owner pulled back before it went live).
// This is a thin same-origin relay of `${SOCIAL_URL}/api/digest/state`, which
// returns { held: ["MM-DD-YYYY", ...] }.
//
// FAIL-OPEN on purpose: any error, timeout or non-200 from the platform returns
// { held: [] } with status 200, so a platform outage can never blank the Digest.
//
// Gate note: functions/_middleware.ts runs before this. With GATE_ENABLED off it
// passes everything through, so this is public (the list is only issue ids).
// With the gate on, a request without a valid digest_session cookie gets the
// splash page (401 HTML) instead -- fine, because index.html is gated the same
// way, so any reader who got the page has the cookie; the page treats a
// non-JSON/non-200 answer as an empty list.

import { resolveSocialUrl, type GroupEnv } from "../../lib/group-session";

const TIMEOUT_MS = 2500;

function respond(held: string[], cacheControl: string): Response {
  return new Response(JSON.stringify({ held }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": cacheControl },
  });
}

export const onRequestGet = async (context: {
  env: GroupEnv;
}): Promise<Response> => {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${resolveSocialUrl(context.env)}/api/digest/state`, {
      signal: ctl.signal,
    });
    if (!res.ok) return respond([], "no-store");
    const data = (await res.json()) as { held?: unknown };
    const held = Array.isArray(data.held)
      ? data.held.filter((id): id is string => typeof id === "string")
      : [];
    return respond(held, "public, max-age=60");
  } catch {
    return respond([], "no-store");
  } finally {
    clearTimeout(timer);
  }
};
