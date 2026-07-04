// GET /api/session — is this Digest reader a signed-in member, and who?
//
// The client can't read the HttpOnly digest_session cookie, so it asks here.
// We verify the cookie server-side and report { signedIn, name }. The Digest's
// group-discussion widgets only render when signedIn is true, so public readers
// (no session) see nothing — matching the "hide reply for non-members for now"
// decision. At launch this is where a "Sign in to answer" CTA would hang off a
// signedIn:false response.

import {
  getSessionToken,
  verifySession,
  resolveSocialUrl,
  json,
  type GroupEnv,
} from "../../lib/group-session";

export const onRequestGet = async (context: {
  request: Request;
  env: GroupEnv;
}): Promise<Response> => {
  const socialUrl = resolveSocialUrl(context.env);
  const token = getSessionToken(context.request);
  if (!token) return json({ signedIn: false, name: null, socialUrl });
  const claims = await verifySession(token, context.env);
  if (!claims) return json({ signedIn: false, name: null, socialUrl });
  return json({ signedIn: true, name: claims.name, socialUrl });
};
