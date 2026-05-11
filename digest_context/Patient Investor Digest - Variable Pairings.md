# Patient Investor Digest — Variable Pairings (Learning Loop)

Live record of which variable belongs with which kind of article, why, and how it should sound. Read this before drafting a new digest. Append a new entry every time Gregory marks an article up.

**The variables** (full definitions in `Patient Investor Digest - Variables Reference` in the Gray Wolf vault):
TVL · Volume · Average Volume (45-day) · Asset Selection · Correlation · Range

**The verb posture from the instructions:** *implement or modify*. Articles should push the reader toward a concrete decision they could make this week, not just explain a concept.

---

## Pairings

Each entry: what the article is about, which variable anchors it, why that variable is the right hook, and the prose pattern that landed (or what was missing).

---

### KelpDAO / rsETH exploit (2026-04-21)

**Article:** $292M drained from Kelp DAO's rsETH via cross-chain bridge exploit before contracts were frozen.
**Issue:** 2026-04-21
**Primary variable:** Asset Selection
**Secondary variable(s):** Volume
**Why this pairing:**
- *Asset Selection* is the risk lesson — an LRT inherits the rank and risk of the protocol issuing it, not the ETH underneath. Holding rsETH in a pool is not the same as holding ETH, even if the price chart looked identical the day before.
- *Volume* is the non-obvious opportunity lesson — when an exploit hits, a lot of money moves fast. Arbitrage bots fire, attackers themselves swap to launder, and panicked holders rotate out. Market-wide volume spikes. LPs in *unrelated* pools (ETH/USDC, BTC/USDC) can earn meaningful fees during the chaos. A "bad" event for one protocol is a volume tailwind for everyone else.

**Prose pattern that worked:**
- News-first lead with specific numbers and inline jargon definition. Model sentence:
  > *"Kelp DAO's rsETH — a liquid restaking token (LRT), meaning an asset that represents ETH deposited into restaking protocols and is designed to trade near 1:1 with ETH — was drained of roughly $292 million via a cross-chain bridge exploit before emergency contracts were frozen."*
- The asset-selection framing the prior draft had (*"a derivative inherits the rank and risk of the protocol behind it, not the underlying ETH"*) is the right shape — keep it, name the variable explicitly.
- The volume angle was missing entirely from the published version. Should be added: a paragraph explaining why exploit days often *increase* fee income on unrelated mainstream pools because of bot-driven and panic-driven volume.

**Notes:**
- Lead with the news factually before pivoting to the LP lesson. Don't bury the actual event under the framing.
- This article carries two variables in opposite emotional registers: Asset Selection (caution, what *not* to hold) and Volume (opportunity, what you're earning during the chaos). That contrast is part of why this pairing is strong — it teaches that the same news has two different decisions attached.

---

### Entry template (copy when adding)

**Article:** {headline / one-line summary}
**Issue:** {date}
**Primary variable:** {variable}
**Secondary variable(s):** {variable, or none}
**Why this pairing:** {one sentence — what about the story makes this variable the natural teaching hook}
**Prose pattern that worked:** {actual sentence from the digest, or "missing — should have read: …"}
**Notes:** {anything else worth carrying forward}

---

## Anti-patterns

Things to NOT do, with the article that triggered the lesson.

- *(empty — populate as we go)*

---

## Voice / framing notes

Corrections about *how* a variable was taught, not which variable. Tone, posture, action-orientation, jargon level.

- The verb is **implement or modify**. If a paragraph only explains a variable and never points the reader toward a tweak they could make Monday morning, it's not done yet.
- **Lead with the actual news, factually, with specific numbers.** Name the protocol, name the token, name the dollar amount, name the mechanism (e.g., "cross-chain bridge exploit"). Then pivot to the LP lesson. Don't bury the event under the framing.
- **Define jargon inline at first use,** parenthetical or em-dash flanked: `rsETH — a liquid restaking token (LRT), meaning an asset that represents ETH deposited into restaking protocols and is designed to trade near 1:1 with ETH — was drained…`. The reader learns the term without needing to leave the sentence.
- **Look for the non-obvious second variable.** Most stories have one obvious variable (asset selection for an exploit, range for a price move). The strongest articles also surface the *counterintuitive* variable that flips the framing — e.g., an exploit feels like a "be afraid" story, but Volume turns it into a "you might be earning during the chaos" story. Two variables in opposite emotional registers teaches more than one variable explained well.

---

## How to use this file when drafting a new digest

1. Read the pairings list. Look for articles in your news set that match a pattern already documented (KelpDAO-shaped, Strategy-block-shaped, institutional-flow-shaped, etc.).
2. Read the anti-patterns. Make sure you're not reaching for a variable just because it's available.
3. Read the voice notes. Audit each paragraph for whether it gives the reader something to *do*, not just something to know.
4. Draft. Then re-check that every variable named in your pairings actually shows up by name in the relevant article — not just gestured at.
