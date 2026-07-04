// GET /api/group-answers?digestId=<id>&storyIndex=<n>
//
// Same-origin proxy: reads the member's HttpOnly session cookie and relays the
// request to the social app's group-answers endpoint with the JWT as a Bearer
// token (the browser can't send the token cross-origin itself). Returns the
// social app's JSON verbatim. Members-only — no cookie → 401.

import {
  getSessionToken,
  resolveSocialUrl,
  json,
  type GroupEnv,
} from "../../lib/group-session";

export const onRequestGet = async (context: {
  request: Request;
  env: GroupEnv;
}): Promise<Response> => {
  const token = getSessionToken(context.request);
  if (!token) return json({ error: "unauthenticated" }, 401);

  const url = new URL(context.request.url);
  const digestId = url.searchParams.get("digestId") ?? "";
  const storyIndex = url.searchParams.get("storyIndex") ?? "";
  if (!digestId || storyIndex === "") {
    return json({ error: "bad_request" }, 400);
  }

  const target =
    `${resolveSocialUrl(context.env)}/api/digest/group-answers` +
    `?digestId=${encodeURIComponent(digestId)}&storyIndex=${encodeURIComponent(storyIndex)}`;

  try {
    const res = await fetch(target, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({ error: "bad_upstream" }));
    return json(data, res.status);
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }
};
