const DIGEST_CHANNEL_ID = "C0ATN065QQ3";
const GITHUB_REPO = "A0339x/patient-investor-digest";

async function verifySlackSignature(request, body, signingSecret) {
  const timestamp = request.headers.get("x-slack-request-timestamp");
  const signature = request.headers.get("x-slack-signature");
  if (!timestamp || !signature) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`v0:${timestamp}:${body}`)
  );
  const computed =
    "v0=" +
    Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return computed === signature;
}

async function triggerDispatch(githubToken) {
  const resp = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type: "slack-reply" }),
    }
  );
  return resp.ok;
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await request.text();

    const verified = await verifySlackSignature(
      request,
      body,
      env.SLACK_SIGNING_SECRET
    );
    if (!verified) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = JSON.parse(body);

    // Respond to Slack's URL verification challenge
    if (payload.type === "url_verification") {
      return new Response(payload.challenge, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    const event = payload.event;
    if (
      event &&
      event.type === "message" &&
      !event.subtype &&
      !event.bot_id &&
      event.channel === DIGEST_CHANNEL_ID &&
      event.thread_ts &&
      event.thread_ts !== event.ts
    ) {
      // Fire and forget — respond to Slack immediately
      env.ctx?.waitUntil(triggerDispatch(env.GITHUB_TOKEN));
      triggerDispatch(env.GITHUB_TOKEN);
    }

    return new Response("OK", { status: 200 });
  },
};
