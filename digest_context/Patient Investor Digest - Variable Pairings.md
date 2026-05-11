# Patient Investor Digest — Variable Pairings (Learning Loop)

Live record of which variable belongs with which kind of article, why, and how it should sound. Read this before drafting a new digest. Append a new entry every time Gregory marks an article up.

**The variables** (full definitions in `Patient Investor Digest - Variables Reference.md` in this project root):
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

### May 7, 2026 digest rewrite — full-issue rebuild (5 stories)

**Articles:** ETF inflows / Strategy $30B / AWS+USDC / Bitwise carry fund / Kraken+Reap stablecoin acquisition.
**Issue:** 2026-05-07
**Pattern under test:** every story carries a *primary* variable + a *non-obvious second* variable in an opposite emotional register, ending with a single concrete tweak the reader could make this week.

**Pairings that landed (approved as-is):**

| Story | Primary | Non-obvious second | Why the contrast works |
|---|---|---|---|
| ETF inflows | Range (skew up) | Correlation (BTC/USDC only nets half the move; BTC/ETH nets full) | Same news → two different decisions (skew vs. rotate pair type) |
| Strategy $30B | TVL (institutional dollars dilute APR) | Average Volume 45-day (Krystal hides the outlier) | "Bullish for the asset" reframed as "your APR is getting compressed" |
| AWS+USDC | Volume (structural floor rises) | Asset Selection (lower-rank stablecoins look attractive, depeg risk) | Tailwind story flips into a safety-barrier story |
| Bitwise carry | TVL (carry pulls capital from LP pools) | Market Sentiment (carry peaks in extreme greed → coming correction) | Yield-competition story is also a sentiment-warning story |
| Kraken+Reap | Range (narrow band on stablecoin pairs) | Asset Selection (narrowing only works if peg holds) | "Tighten for more fees" reframed as "the narrower you go, the more depeg risk you carry" |

**Prose patterns that worked:**
- News-first lead with dollar amounts and the mechanism, then the variable hook. Pattern:
  > *"Spot Bitcoin ETFs now hold $108.76 billion in net assets after five consecutive weeks of net inflows -- the longest buying streak of the year. Put skew -- the premium traders pay for downside protection -- is fading, which means institutions are buying plain long exposure rather than hedged bets. Sustained one-direction demand is the textbook case for Range..."*
- Jargon defined inline em-dash-flanked at first use: `Put skew -- the premium traders pay for downside protection -- is fading`. Reader learns the term without leaving the sentence.
- Explicit hand-off to the second variable: `The non-obvious second variable is X.` This sentence is doing real work -- it signals to the reader "the story isn't done, there's a second decision in here."
- Closing line is always a concrete weekly tweak, framed as a verb: `confirm every stablecoin you are paired with sits inside the top-30`, `pull its 45-day average`, `sanity-check the rank and issuer of both sides before going narrower`.
- Spark questions point at the reader's actual portfolio with a tool to open: Krystal, Coin Market Cap, the position itself. Not hypotheticals.

**Voice notes from this issue:**
- **Capitalize variable names mid-sentence to signal proper-noun emphasis** (Range, TVL, Volume, etc.) since markdown rendering is off and `**bold**` would print raw asterisks on the site. The capitalization carries the weight that bold would otherwise carry.
- **The contrast between primary and secondary variable should sit in opposite emotional registers when possible.** Tailwind + risk. Opportunity + caution. Bullish for one thing + bearish for another. That tension is the teaching moment.
- **Intro should preview which variables the issue will touch.** Sets up the curriculum at the top so each story feels like part of the same lesson rather than five disconnected news bites.

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

- **Hypothetical and educational. Not advice. Not commands.** This is the central voice rule. The digest's job is to surface variables, explore their impacts, and show the reader how to think through them. It is NOT to tell the reader what to do with their portfolio. Words and patterns to **avoid**: "The modification: …", "This week's tweak: …", "do not LP into …", "audit your X", "confirm every X", "pull up X" (as imperative), "Before adding to X …", "pick the pool where …", "verify X" (as imperative), "a wide enough sweep to audit any position against". Words and patterns to **use**: "Keep in mind that …", "If you LP into [scenario], you risk [consequence]. What that means is …", "When [scenario] happens, you can think about [variable behavior] this way …", "It's a really good habit to …", "Next time you're adding liquidity, …", "When the market moves up and you feel confident about the direction, keep in mind that you can …", "So when you're in a pair where [scenario], keep in mind that [consequence]. For these types of pairs, you really want to make sure you [action] or consider [alternative]". The shape is *educational thought experiments and "keep in mind" framing*, not directives.
- **When you enumerate multiple levers or considerations, UNPACK each one with mechanics + consequence.** Naming the levers abstractly ("there are two distinct levers: how you place your Range, and which kind of pair you're in") is not enough — it sounds like a variable name-drop. The exceptional voice walks through *why* each lever works, in plain mechanical terms, and connects it to the consequence the reader will actually feel. The model paragraph Gregory wrote: *"When the market moves up and you feel confident about the direction, keep in mind there are two distinct levers - Skew your range so that you have more room to the upside. This will give you more exposure to the coin you think will be going up, and therefore allow you to get more appreciation, and two - correlated pairs. If you choose a correlated pair - A LP with two assets that move the same, as the market goes up, both of those assets will go up more or less the same, depending on how good their correlation is, and you will be able to experience more appreciation as a result!"* Notice the shape:
  - Enumerate the levers ("one... two...")
  - For each one, explain in plain English *what it does mechanically* ("skew your range so that you have more room to the upside")
  - Then connect to *what the reader will experience* ("this will give you more exposure... and therefore allow you to get more appreciation")
  - Define inline if needed ("a correlated pair - A LP with two assets that move the same")
  - End with the felt consequence ("you will be able to experience more appreciation as a result!")
  - **Energy is allowed.** That exclamation point at the end is doing work — it signals the writer is excited about the leverage, not lecturing. Match that energy when the lesson genuinely is empowering. Subdue it when the lesson is about risk.
  - **Why:** Naming a variable without unpacking the mechanic teaches nothing. The reader needs the *cause-effect chain* — "skew → more exposure → more appreciation" — to internalize the variable. After the chain runs, the variable name is a handle they can grab; before the chain runs, the variable name is jargon.
  - **How to apply:** Any time a paragraph lists "two ways," "two levers," "two questions," "two decisions" — stop and ask whether each item is unpacked with mechanics and consequence, or just named. If just named, expand. The "Same news, two different questions left on the table" closer is fine *after* both items have been unpacked. It is not a substitute for unpacking.
  - **Why:** Gregory's audience is early-LP-journey, but the digest is not coaching individuals — it's compounding shared vocabulary. Direct advice short-circuits the variable-thinking the digest is trying to build. When a reader is told "skew your range up," they don't have to think about which variables drove that conclusion. When they're told "when you feel confident the market is moving up, keep in mind that you get more appreciation by skewing your range up, and/or by being in a correlated pair," they're now reasoning *through* the variables — which is the whole point. The original instructions phrase ("implement or modify the variables we're learning") means *the reader implements and modifies — through their own reasoning — based on the variables we expose*. It does not mean we hand them the modification.
  - **How to apply:** When you find yourself writing "The modification:" or "This week's tweak:" or any imperative verb pointed at the reader, stop. Rewrite as a thought experiment. The model sentence Gregory liked: *"when you see sustained directional buying, the question is not only 'where should my Range sit' but also 'is the pair type giving me full exposure to the move I expect?'"* — that is the shape. Two questions, both pointing the reader at variables, no command.
- **The Chart is a long-time-preference variable, not a 30-day-resistance variable.** Earlier rewrites leaned on phrases like "verify on the chart that price has actually been rejected at $80K before" — that is short-term technical analysis. The Variables Reference is about whether the asset's *multi-year* chart looks healthy. The canonical bad-Chart example: Arbitrum, which has been going down for roughly three years. The Chart variable asks: would I LP into an asset that has only gone in one direction over a long horizon? An asset whose chart shows healthy two-way action over years is a different decision than an asset whose chart has been bleeding for years. References to "the chart" in the digest should reach for that horizon, not the past 30 days.
  - **Why:** Gregory is teaching LPs to think about asset quality the way a long-horizon investor does. Short-term technical levels are not the curriculum. Long-term chart health is.
  - **How to apply:** When using The Chart variable, frame the question as "does this asset's price action over years look like something I'd want exposure to?" Use concrete bad examples (an asset that has only gone down for 3 years) and concrete good examples (an asset with multi-year highs and lows, two-way action, not at a top right now).
- The verb is **implement or modify**. If a paragraph only explains a variable and never gives the reader something concrete to think through, it's not done yet. *Note:* this does NOT mean handing them the modification — see the hypothetical/educational rule above. It means making the variable's implication thinkable.
- **Lead with the actual news, factually, with specific numbers.** Name the protocol, name the token, name the dollar amount, name the mechanism (e.g., "cross-chain bridge exploit"). Then pivot to the LP lesson. Don't bury the event under the framing.
- **Define jargon inline at first use,** parenthetical or em-dash flanked: `rsETH — a liquid restaking token (LRT), meaning an asset that represents ETH deposited into restaking protocols and is designed to trade near 1:1 with ETH — was drained…`. The reader learns the term without needing to leave the sentence.
- **Look for the non-obvious second variable.** Most stories have one obvious variable (asset selection for an exploit, range for a price move). The strongest articles also surface the *counterintuitive* variable that flips the framing — e.g., an exploit feels like a "be afraid" story, but Volume turns it into a "you might be earning during the chaos" story. Two variables in opposite emotional registers teaches more than one variable explained well.

---

## How to use this file when drafting a new digest

1. Read the pairings list. Look for articles in your news set that match a pattern already documented (KelpDAO-shaped, Strategy-block-shaped, institutional-flow-shaped, etc.).
2. Read the anti-patterns. Make sure you're not reaching for a variable just because it's available.
3. Read the voice notes. Audit each paragraph for whether it gives the reader something to *do*, not just something to know.
4. Draft. Then re-check that every variable named in your pairings actually shows up by name in the relevant article — not just gestured at.
