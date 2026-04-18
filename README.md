# Patient Investor Digest

A static HTML publication site for the LP Mastermind community.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub
2. Go to Cloudflare Pages → Create a project → Connect to GitHub
3. Select this repo
4. Build settings: **Framework preset = None**, leave build command and output directory blank
5. Deploy — Cloudflare will serve `index.html` directly

## Adding a New Issue

Open `index.html` and find the `DIGESTS` array near the top of the `<script>` block. Add a new object to the **top** of the array (newest first):

```js
{
  id: "april-21-2026",          // used in the URL: #april-21-2026
  date: "April 21, 2026",
  title: "LP Mastermind Market Update",
  subtitle: "What moved this week...",
  snapshot: [
    { label: "BTC",        value: "+X%" },
    { label: "ETH",        value: "+X%" },
    { label: "Volatility", value: "..." },
    { label: "ETH Gas",    value: "~$X.XX" }
  ],
  intro: "...",
  stories: [
    {
      title: "Story title",
      body: "Story body text.",
      spark: "Conversation question for the group."
    },
    // ... up to 5 stories
  ],
  closing: "What are you watching going into next week?..."
}
```

Commit and push — Cloudflare Pages will auto-redeploy within ~30 seconds.
