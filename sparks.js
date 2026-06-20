// =============================================================================
// sparks.js — turn each digest Spark into a live link to its chat thread.
// =============================================================================
// Phase 2 of the Digest ↔ Social integration. For every `.story-spark` on the
// page, fetch the discussion count for that (digest_id, story_index) from the
// social app and render:
//   * a "Discuss in chat →" button that opens the spark's thread in a new tab
//   * a badge: "N members chatting" (or "Be the first to weigh in" at 0)
//
// Auth: the Pages middleware injects <meta name="digest-jwt"> for members with
// a valid session cookie. We send it as `Authorization: Bearer <jwt>` to the
// JWT-authed counts endpoint (locked Decision 11). No JWT → sparks stay plain
// text (unauthenticated reader). Expired/invalid JWT → a one-time banner +
// buttons fall back to the channel root, so the feature degrades, never breaks.
//
// Polls every 60s, but only while the tab is visible (Page Visibility API), so
// a backgrounded tab doesn't hammer the endpoint.
//
// Mirrors constants in patient-investor-social-media/lib/digest/constants.ts.
// =============================================================================

import {
  SOCIAL_URL_FALLBACK,
  DIGEST_CHANNEL_SLUG,
} from "./digest-constants.js";

const POLL_MS = 60_000;

function socialOrigin() {
  const cfg = window.__DIGEST_CONFIG__;
  const fromCfg = cfg && typeof cfg.socialUrl === "string" ? cfg.socialUrl.trim() : "";
  return (fromCfg || SOCIAL_URL_FALLBACK).replace(/\/+$/, "");
}

function readJwt() {
  const meta = document.querySelector('meta[name="digest-jwt"]');
  const v = meta?.getAttribute("content")?.trim();
  return v || null;
}

function channelRootUrl() {
  return `${socialOrigin()}/channels/${DIGEST_CHANNEL_SLUG}`;
}

// ----- DOM helpers ----------------------------------------------------------

/** All spark mounts on the page, grouped by digest_id. */
function collectSparksByDigest() {
  const byDigest = new Map(); // digest_id -> Array<{ el, storyIndex, actions }>
  document.querySelectorAll(".story-spark[data-digest-id]").forEach((el) => {
    const digestId = el.getAttribute("data-digest-id");
    const storyIndex = Number(el.getAttribute("data-story-index"));
    const actions = el.querySelector("[data-spark-actions]");
    if (!digestId || Number.isNaN(storyIndex) || !actions) return;
    if (!byDigest.has(digestId)) byDigest.set(digestId, []);
    byDigest.get(digestId).push({ el, storyIndex, actions });
  });
  return byDigest;
}

function badgeText(count) {
  if (count === 0) return "Be the first to weigh in";
  if (count === 1) return "1 member chatting";
  return `${count} members chatting`;
}

/**
 * Render the CTA + badge into a spark's actions container. `data` may be null
 * (degraded: no counts available) — the button still works, badge shows "—".
 */
function renderSpark(actions, { threadUrl, count }) {
  const href = threadUrl || channelRootUrl();
  const hasCount = typeof count === "number";
  actions.innerHTML = "";

  const link = document.createElement("a");
  link.className = "spark-cta";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Discuss in chat →";

  const badge = document.createElement("span");
  badge.className = "spark-count" + (hasCount && count === 0 ? " spark-count--empty" : "");
  badge.textContent = hasCount ? badgeText(count) : "—";

  actions.append(link, badge);
  actions.hidden = false;
}

// ----- Expired-token banner (one-shot) --------------------------------------

let bannerShown = false;
function showExpiredBanner() {
  if (bannerShown) return;
  bannerShown = true;
  const bar = document.createElement("div");
  bar.className = "spark-session-banner";
  bar.setAttribute("role", "status");
  const social = socialOrigin();
  bar.innerHTML =
    `Your session expired, so live discussion counts are paused. ` +
    `<a href="${social}" target="_blank" rel="noopener">Reopen the Digest from the mastermind</a> ` +
    `to refresh.`;
  document.body.prepend(bar);
}

// ----- Fetch + apply --------------------------------------------------------

async function fetchDiscussions(digestId, jwt) {
  const url = `${socialOrigin()}/api/digest/discussions?digest_id=${encodeURIComponent(digestId)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
    // Cross-origin; no cookies needed (auth is the bearer token).
    credentials: "omit",
  });
  if (res.status === 401) return { status: 401 };
  if (!res.ok) return { status: res.status };
  const body = await res.json();
  return { status: 200, sparks: Array.isArray(body.sparks) ? body.sparks : [] };
}

/**
 * Refresh all sparks for all digests once. Returns true if a poll loop is
 * worth continuing (i.e. we have a usable token), false to stop (401).
 */
async function refreshAll(byDigest, jwt) {
  let keepPolling = true;

  await Promise.all(
    Array.from(byDigest.entries()).map(async ([digestId, mounts]) => {
      let result;
      try {
        result = await fetchDiscussions(digestId, jwt);
      } catch {
        result = { status: 0 }; // network error → degrade
      }

      if (result.status === 401) {
        showExpiredBanner();
        keepPolling = false;
        // Buttons keep working (channel root), badges show "—".
        for (const m of mounts) renderSpark(m.actions, {});
        return;
      }

      if (result.status !== 200) {
        // 500 / network: graceful degradation. Don't nuke any counts we may
        // have rendered on a previous successful poll; only fill empties.
        for (const m of mounts) {
          if (m.actions.hidden) renderSpark(m.actions, {});
        }
        return;
      }

      const byIndex = new Map(result.sparks.map((s) => [s.story_index, s]));
      for (const m of mounts) {
        const s = byIndex.get(m.storyIndex);
        if (s) {
          renderSpark(m.actions, {
            threadUrl: s.thread_url,
            count: s.reply_count,
          });
        } else {
          // No thread mapped for this spark yet (e.g. not backfilled).
          renderSpark(m.actions, { count: 0 });
        }
      }
    }),
  );

  return keepPolling;
}

// ----- Boot -----------------------------------------------------------------

function init() {
  const jwt = readJwt();
  if (!jwt) return; // unauthenticated reader — leave sparks as plain text

  const byDigest = collectSparksByDigest();
  if (byDigest.size === 0) return;

  let timer = null;
  let stopped = false;

  async function tick() {
    const keep = await refreshAll(byDigest, jwt);
    if (!keep) stop();
  }

  function start() {
    if (stopped || timer !== null) return;
    timer = setInterval(() => {
      if (document.visibilityState === "visible") void tick();
    }, POLL_MS);
  }

  function stop() {
    stopped = true;
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  // First load now; subsequent refreshes on the visible-gated interval. Also
  // refresh immediately when the tab regains focus so counts feel live.
  void tick();
  start();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !stopped) void tick();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
