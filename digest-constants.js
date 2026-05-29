/**
 * Constants for the Digest side of the social-integration bridge.
 *
 * Mirrors patient-investor-social-media/lib/digest/constants.ts. Keep in sync
 * when changing IDs, slugs, or env var names.
 *
 * Loaded by sparks.js + functions/_middleware.ts. Plain JS (not TypeScript)
 * to match the digest's existing static-site stack.
 */

// Origin of the social app; used for spark deep links + counts fetch.
// Replaced at deploy time if NEXT_PUBLIC_SOCIAL_URL changes. The digest reads
// this from window.__DIGEST_CONFIG (injected by Pages middleware) at runtime;
// the constant below is the fallback for local dev.
export const SOCIAL_URL_FALLBACK = "https://patient-investor-demo.vercel.app";

// Slug for the chat channel that hosts spark threads.
export const DIGEST_CHANNEL_SLUG = "digest-discussion";

// Cookie name set by the Pages middleware after a successful POST /__auth.
export const DIGEST_SESSION_COOKIE = "digest_session";

// JWT issuer claim — must match social-side DIGEST_JWT_ISSUER.
export const DIGEST_JWT_ISSUER = "social.patient-investor";

// Splash page route (always public, served when no valid cookie).
export const SPLASH_PATH = "/splash.html";

// Auth handshake route — POST target for the form on the social side.
export const AUTH_PATH = "/__auth";
