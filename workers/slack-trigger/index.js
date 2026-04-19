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
        "User-Agent": "patient-investor-slack-trigger",
      },
      body: JSON.stringify({ event_type: "slack-reply" }),
    }
  );
  const text = await resp.text();
  console.log("GitHub dispatch status:", resp.status, "body:", text);
  return resp.ok;
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await request.text();
    console.log("Received POST body:", body.slice(0, 200));

    const payload = JSON.parse(body);

    // Respond to Slack's URL verification challenge before checking signature
    if (payload.type === "url_verification") {
      console.log("Handling URL verification challenge");
      return new Response(payload.challenge, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    const verified = await verifySlackSignature(
      request,
      body,
      env.SLACK_SIGNING_SECRET
    );
    console.log("Signature verified:", verified);
    if (!verified) {
      return new Response("Unauthorized", { status: 401 });
    }

    const event = payload.event;
    console.log("Event type:", event?.type, "channel:", event?.channel, "bot_id:", event?.bot_id, "subtype:", event?.subtype);

    if (
      event &&
      event.type === "message" &&
      !event.bot_id &&
      event.subtype !== "bot_message" &&
      event.channel === DIGEST_CHANNEL_ID
    ) {
      console.log("Triggering GitHub dispatch...");
      const ok = await triggerDispatch(env.GITHUB_TOKEN);
      console.log("Dispatch result:", ok);
    }

    return new Response("OK", { status: 200 });
  },
};
