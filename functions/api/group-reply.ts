// POST /api/group-reply
//
// Same-origin proxy: reads the member's HttpOnly session cookie and relays the
// answer to the social app's group-reply endpoint with the JWT as a Bearer
// token. The social app re-verifies the token and authors the message as that
// member. Returns the social app's JSON verbatim. Members-only — no cookie →
// 401.
//
// Body (JSON, passed straight through): { digestId, storyIndex, digestTitle,
// contextLabel, promptText, body }.

import {
  getSessionToken,
  resolveSocialUrl,
  json,
  type GroupEnv,
} from "../../lib/group-session";

export const onRequestPost = async (context: {
  request: Request;
  env: GroupEnv;
}): Promise<Response> => {
  const token = getSessionToken(context.request);
  if (!token) return json({ error: "unauthenticated" }, 401);

  let payload: unknown;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const target = `${resolveSocialUrl(context.env)}/api/digest/group-reply`;
  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({ error: "bad_upstream" }));
    return json(data, res.status);
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }
};
