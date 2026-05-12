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

### May 11, 2026 BitMine "crypto spring" story — first simplification pass

**Article:** BitMine adds $62M ETH, treasury past 5.2M ETH, Tom Lee calls "crypto spring."
**Issue:** 2026-05-11 (Story 1)
**Primary variable:** Correlation
**Secondary variable(s):** Range (skew)
**Why this pairing:** Same pattern as the institutional-bid stories (sustained directional buying → think about pair type and range placement together). When confidence in direction is high, the two distinct levers (Correlation and Range skew) compound — and the story works as a teaching artifact for both at once.

**What got fixed in this rewrite (the lesson is the WAY it got said, not WHICH variables got used):**

The cron-generated version on 2026-05-11 used three phrases the team specifically flagged as too dense on the Three Amigos call:
- *"you experience fuller price exposure"*
- *"the composition of your position shifts toward the stable side as price rises"*
- *"the directional narrative"*

The rewrite replaced each with an active-voice plain-English equivalent that describes the actual mechanic. Sentence count went from 6 long ones (longest ~60 words) to 12 short ones (longest ~32 words), broken into 5 short paragraphs for breathing room.

**Prose pattern that worked (replacement model — keep these as canonical examples):**
- Instead of *"you experience fuller price exposure"*: *"A correlated pair (two assets that move together, like ETH and BTC) captures the full upside when the market goes up, because both sides of the pool rise together."* Mechanic + consequence in one sentence.
- Instead of *"composition of your position shifts toward the stable side as price rises"*: *"And as price rises, the pool keeps selling ETH and accumulating USDC, so your ETH exposure shrinks even further."* Plain verbs (sells, accumulates, shrinks).
- Instead of *"the directional narrative"*: *"whether you actually believe ETH is going up."* Direct restatement of the question the reader is being asked to think about.

**Notes:**
- Greg's framing of the goal on the call: *"I want to do more of that with the loop learning style than them having to understand what the words mean."* The variables compound through repetition + plain mechanics, not through accumulating a dense vocabulary.
- The team praised the *content* and the *teaching pattern* — they explicitly did not want the concepts changed. Only the *prose density* needed work. The two-lever shape (Correlation + Range skew) and the variable-naming approach are working as intended.

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

- **Analyst/jargon prose that loses the reader on first pass.** From the 2026-05-11 BitMine "crypto spring" story, the team flagged three exact phrases as too dense:
  1. *"you experience fuller price exposure"* — abstract, sounds like a research note. Plain alternative: *"you capture the full upside"* or *"both sides of the pool rise together."*
  2. *"the composition of your position shifts toward the stable side as price rises"* — technically correct, but unparseable in one pass. Plain alternative: *"as price rises, the pool keeps selling ETH and accumulating USDC, so your ETH exposure shrinks."*
  3. *"the directional narrative"* — analyst-speak. Plain alternative: *"whether you believe ETH is going up."*

  These are not the only offending shapes — they are diagnostic of a broader pattern. Any phrase that requires the reader to mentally re-parse a noun phrase ("the X of your Y shifts toward the Z") or that uses a noun-of-noun construction where a plain verb would do is a candidate for replacement. The fix is almost always: identify the actual *mechanic* (what physically happens in the pool) and describe it in active voice with short words.

- **Trader/analyst/crypto vocabulary for price direction and market state.** Use plain English for "is price going up or down?" and "what is the market doing?" — not trader shorthand. From Gregory's 2026-05-12 markup, then expanded into a corpus-wide sweep across all 8 historical digests. Replacement model (apply this lens to any draft):

  | Trader/analyst shorthand | Plain English |
  |---|---|
  | the bull case for ETH | the case for ETH increasing in price |
  | bullish forecast | forecast that prices will rise |
  | bullish view | view that prices will rise |
  | public bullish calls | public statements that ETH is going up |
  | the headline reads bullish | the headline reads positive |
  | bearish thesis | view that prices will fall |
  | risk-on euphoria | sharp risk-taking |
  | risk-off move | cautious selling |
  | asymmetric upside | more upside than downside |
  | a clean breakout through $X | price pushing cleanly through $X |
  | positioning for a breakout | positioning for a move higher |
  | ahead of a potential breakdown | ahead of a potential drop |

  **Why:** This audience is early in their LP journey. Trader shorthand makes them translate before they can absorb the actual mechanic. The variables compound through plain mechanics; jargon adds friction without adding teaching.

  **How to apply:** When drafting, scan for any phrase from the left column or its cousins. The substitution isn't word-for-word — it's "what is this *actually* saying about price, sentiment, or market state?" State that in plain English. The phrasing on the right is one option; any plain restatement that names the actual situation works.

  **Special case — keep but gloss inline: "crypto spring" and "crypto winter".** These two terms are deliberately kept (not replaced) but require an inline plain-English gloss on first use per issue, in the house em-dash-flanked style:
  - *crypto spring* — *"the period when crypto starts going up again after going down for a while, like the temperatures in spring"*
  - *crypto winter* — *"the period when crypto has gone down and stayed down for a long time, like the temperatures in winter"*

  Pattern in practice: *"Chairman Tom Lee says 'crypto winter' -- meaning the period when crypto has gone down and stayed down for a long time, like the temperatures in winter -- is near its end."* The metaphor is intuitive enough (temperatures map to price action over a long timeframe) that one gloss carries the meaning for the rest of the issue.

  **Exception — direct quotes.** If a named person used a trader phrase, keeping the phrase *as a quoted attribution* is OK. The quote marks signal it's their term, not the digest's voice. Even with the quoted attribution, gloss inline on first use per issue per the house jargon-gloss rule.

- **The APR formula — match the depth to the story's pedagogical focus.** The full APR formula for a Uniswap V3/V4 position is approximately *(Volume × fee_tier) / TVL*. For most stories — especially ones about TVL dynamics, Volume tailwinds, or general APR behavior — the simplified framing **"APR is essentially Volume divided by TVL"** is the right depth. It teaches the core relationship between the variables newcomers are still learning, without forcing them to also internalize fee tier on the same page.

  **When to use the simplified version (Volume / TVL):** any story where TVL and Volume are the moving variables and fee tier is implicitly held constant. The KelpDAO-pattern exploit stories, the new-yield-product stories, the institutional-flow stories — all use the simplified version because the lesson is about the *ratio*, not about per-swap economics.

  **When to use the full version (Volume × fee_tier / TVL):** stories where fee tier itself is the lesson — typically stablecoin pool stories (where the low fee tier is exactly what makes volume the deciding factor), pool-tier comparison stories, or anything where per-swap economics are central. The 2026-05-07 Kraken stablecoin story is the canonical example: the lesson IS that stablecoin pools have a 0.01-0.05% fee tier, so explaining what fee tier means in that story fits naturally.

  **Worked example of the full-formula version** (from Kraken Story 5, 2026-05-07): *"The catch is fee tier -- the cut the pool takes from every swap and pays out to LPs. Stablecoin pools have a fee tier of just 0.01% to 0.05%, which means for every $1 of buy or sell volume, only $0.0001 to $0.0005 ends up in the pool's fee box. For a stablecoin position to produce meaningful fee income, that small cut has to be multiplied by a lot of buy and sell volume."*

  **Why pedagogical scaffolding matters:** Gregory teaches APR to newcomers as a function of TVL and Volume first. Only later in the curriculum — after that relationship is internalized — does fee tier enter the picture. Hitting a new LP with the full formula on Day 1 confuses more than it teaches. The digest's job is to reinforce the simplified version most weeks and introduce the full formula only when the news makes fee tier central. From Gregory's 2026-05-12 markup: *"What we described in those five instances is how I teach APR to new people. Based on TVL and Volume. Only later in our curriculum do I tell them the full story -- because by then they'd understand. New people it'll just confuse."*

  **How to apply:** When drafting any sentence that names the APR formula, ask: "is fee tier the variable this story is teaching?" If no, use *"APR is essentially Volume divided by TVL"*. If yes, expand to the full *(Volume × fee_tier) / TVL* with the per-swap mechanic explained.

- **Vague intensifiers ("is real," "is genuinely," etc.) — replace with the specific word that names what's being claimed.** From Gregory's 2026-05-12 markup: *"This is very AI written. I don't know why AI always uses 'real' instead of other verbs and adjectives, but let's find another word for that. For example, this would say 'where recovery risk after a drawdown is higher for these tokens with a higher asset selection.'"*

  *"X is real"* is doing intensifier work without naming what about X is real. It's hedged, soft, and reads as AI-generated. Specific replacements depend on what the writer actually meant:
  - *risk is real* → *risk is higher / meaningfully higher / elevated / substantial*
  - *the opportunity is real* → *the opportunity is sustained / genuine / well-supported*
  - *the tailwind is real* → *the tailwind is substantial / meaningful*
  - *profit-taking is real* → *there's meaningful profit-taking / sellers are also active*
  - *activity is real, not noise* → *activity is sustained, not noise* (compares against the right opposite)
  - *the APR is real* → *the APR is genuinely high / the math actually works out*

  **Why:** "Real" is a placeholder. It tells the reader something is being claimed but not what. Specific words (higher, sustained, substantial, elevated, genuine) tell the reader the shape of the claim — which is what teaches.

  Similar AI-tic words/phrases to watch for and replace with specifics: *genuinely* (overused), *absolutely*, *fundamentally*, *in essence*, *ultimately*, *the truth is*, *actually* (when used to argue with a hypothetical reading), *clearly*, *importantly*. Each one is an intensifier looking for a noun.

  **How to apply:** When drafting, search for "is real" / "are real" / "the real X." For each, ask: what's actually being claimed about X? Then write that specific word in place. If the answer is "I just meant it exists / is present," the sentence usually reads better without the intensifier at all — drop it.

- **Don't show the writer's "realization" or position the prose against a counter-version.** The reader sees the final draft, not the drafting history. Phrases that argue with a hypothetical wrong version — *"most LPs only use half of it,"* *"that question is real and IS part of the variable,"* *"this is where most LPs reach for it incorrectly,"* *"in the long-horizon sense, not the short-term sense"* — read as the writer showing their work after a correction landed. They break the digest voice (which should sound like a person teaching the idea directly) and add a layer of meta-narrative the reader didn't ask for. From Gregory's 2026-05-12 markup on the 05-04 Story 1 Chart paragraph: *"This was more your own wording after you had this realization."*

  **Replacement pattern:** just lay out the teaching cleanly without the corrective framing.
  - Before (meta-corrective): *"The non-obvious second variable is The Chart, and most LPs only use half of it. When BTC hits $80K and you wonder if it's 'near a top,' that question is real and IS part of The Chart variable -- being conscious of where you're buying on the chart is one of the two things the variable asks. The other thing is long-horizon..."*
  - After (clean): *"The non-obvious second variable is The Chart. It asks two questions together. The first is where on the chart you're buying: not at the very top, where most of the downside risk sits. The second is long-horizon..."*

  **Why:** Corrective framing happens when a rewrite is fixing a previous (wrong) version of the same paragraph. That history is real for the writer, invisible to the reader. The reader only experiences the prose as the digest's first word on the topic — and "actually, this question IS part of the variable" reads as defending against a position they haven't seen. Drop the defense; just teach.

  **How to apply:** After writing a paragraph, scan for phrases that argue with a hypothetical wrong reading: *"actually,"* *"this is where people get it wrong,"* *"not the X sense,"* *"the question is real,"* *"most readers think Y, but…"*. Each one is a flag. Rewrite as a direct positive statement of what the teaching is.

- **Idiomatic shorthand for a mechanic — restate as the actual math.** Phrases like *"volume has to carry the math,"* *"move the needle,"* *"do the heavy lifting,"* *"the juice is worth the squeeze,"* *"the unit economics work"* are business/builder shorthand that compress a real mechanic into an idiom. A reader who hasn't seen the idiom before can't reconstruct what's actually happening. From Gregory's 2026-05-12 markup: *"'volume has to carry the math' — what's this mean? We have to clarify what carrying the math means."* Replacement model from that fix:
  - *"The catch is fee tier: stablecoin pools pay 0.01% to 0.05%, so volume has to carry the math."* (compressed idiom)
  - → *"The catch is fee tier. Stablecoin pools pay only 0.01% to 0.05% per swap -- a small slice. For the position to produce meaningful fee income, that small slice has to be multiplied by a lot of swaps, which means very high volume."* (explicit mechanic)

  **Why:** Idioms are local-knowledge gatekeepers. They feel efficient to the writer because the writer already knows the underlying math; they feel like a stop sign to the reader who has to translate. The audience compounds knowledge by *seeing the mechanic repeatedly* — replacing every idiom with the explicit mechanic is a deposit into that compounding.

  **How to apply:** When you draft a sentence that uses a business idiom for a quantitative relationship ("carry the math," "move the needle," "make the unit economics work," "punch above its weight"), stop and ask: "what is the actual math, and what role does X play in making it work?" Then write that out in plain sentences. Usually one idiomatic phrase becomes 2-3 short sentences — and the variable lesson lands harder.

- **Category shorthand that hides the concrete thing.** Phrases like *"Ethereum yield ecosystem,"* *"the DeFi landscape,"* *"crypto market structure,"* and *"the Ethereum staking economy"* are abstract aggregate nouns. They sound informative but leave the reader uncertain about what the digest is actually pointing at. From Gregory's 2026-05-12 markup on the Sharplink story: *"Does it mean Pools with ETH as one of the assets?"* — exactly the kind of question the prose should have answered before the reader had to ask. Replacement model:
  - *"the same Ethereum yield ecosystem"* → name the specific pool type (see the "separate the general mechanism from the specific case" rule below for the full pattern)
  - *"the DeFi landscape"* → name the specific protocols, pool types, or chains being discussed
  - *"crypto market structure"* → name the specific market dynamic (e.g., spot vs. derivatives volume, exchange concentration, on-chain vs. off-chain settlement)

  **Why:** Beginner readers can plausibly hear an aggregate term as several different things. A reader hearing "Ethereum yield" might think pools running on Ethereum, pools containing ETH, or ETH-denominated yield products like LSTs — three meaningfully different categories. The prose has to do the disambiguation work upfront, in the same sentence, or the variable lesson lands fuzzy.

  **How to apply:** When you draft a sentence with a phrase like "X ecosystem" or "Y landscape" or "Z market," stop and ask: "what is the specific thing I'm pointing at?" Replace the aggregate with the concrete thing — usually a specific pool type, pair, protocol, or mechanic. Often it takes a few more words; the trade is worth it.

- **Never reference internal editorial docs in the prose.** Phrases like *"the Variables Reference says…"*, *"the Variables note flags…"*, *"per the curriculum…"* are scaffolding for us, not content for the reader. The reader doesn't know those documents exist, and naming them creates the impression there's a separate source-of-truth they're missing. Always state the underlying claim directly. From Gregory's 2026-05-12 markup: *"Remove any reference to the variable reference. Just say [the claim] directly."*

  Replacement patterns:
  - *"The Variables Reference says to watch the Coin Market Cap Fear and Greed gauge: extreme greed precedes a correction…"* → *"The Coin Market Cap Fear and Greed gauge is the practical indicator here: extreme greed precedes a correction…"*
  - *"The Variables Reference flags real recovery risk after a drawdown"* → *"recovery risk after a drawdown is real"*
  - *"By the Variables Reference's market-cap-rank framework, ETH already passes"* → *"By market-cap rank, ETH already passes"*
  - *"which the Variables note flags as the regime where…"* → *"which is the regime where…"*
  - *"per the Variables Reference"* / *"in the Variables Reference's terms"* / *"the Variables note warns"* — all delete; restate the claim.

  **Why:** A reader hearing "the Variables Reference says X" thinks "oh there's a document I haven't read." That breaks the digest's voice (which should sound like a person teaching), creates an unanswered curiosity ("where is this document?"), and adds a layer of indirection between the reader and the claim. The claim itself is the teaching; the source is irrelevant to the reader.

  **How to apply:** Any time you find yourself writing "the Variables Reference…" / "the Variables note…" / "the curriculum…" / "per the source…", stop, find the actual claim, and state it directly. The Variables Reference and Variable Pairings are still consulted internally during drafting — they just don't get name-checked in the rendered prose.

- **Multiple levers — clarify stacking vs. alternatives.** When a story enumerates two or more variables, levers, or decisions, the prose should make clear whether picking both increases the benefit (they stack) or whether they're alternative expressions of the same conviction (pick one based on the shape of your view). The default assumption a beginner reader brings to "two levers" is that more = more — they pull both expecting doubled benefit. If that's not actually how the levers compose, say so explicitly.

  **Worked example from 2026-05-12 markup on the 05-11 BitMine story.** The story originally introduced two levers (Correlation and Range skew) without saying whether they stack. Gregory's feedback: *"Some readers may think that if they pull both these levers, the benefits will stack. It's not quite the case though. It's more like one or the other."* The addition that landed:

  > *These two levers are alternatives, not additions. A correlated pair is a choice about which pair you're in -- it gives full upside through both assets at once. A skewed range is a choice about how you set your range within whatever pair you pick -- it stretches the time you're earning during a move. Most LPs lean on one or the other based on the shape of their conviction. Pulling both at once is possible, but only really pays off if you're holding a more specific view -- like 'ETH is going up AND ETH will outperform BTC' -- which is a stronger bet to commit to.*

  The shape of this paragraph is the model for any future "multiple levers" story:
  1. **Name the mistake directly** — "alternatives, not additions" puts the wrong mental model and the right one side by side. The reader who came in thinking "more levers = more benefit" gets corrected upfront.
  2. **Explain *why* they don't stack** — different levers usually operate on different decisions (pair type vs. range placement; pool selection vs. fee tier; etc.). Naming the decision layer each lever sits on makes the non-stackability concrete.
  3. **Don't say "never stack"** — if stacking is technically possible, say what bigger view it would require. Often the cleanest framing is: stacking means committing to a more specific bet than picking one.

  **How to apply:** When a draft introduces two or more "things to keep in mind" or "levers" or "decisions," ask: "would a beginner reader plausibly read this as 'pick all of them for maximum benefit'?" If yes, add the stacking/alternatives clarifier explicitly. If they genuinely DO stack cleanly, say so — that's also worth being explicit about. The danger is only when the prose leaves the question unanswered.

- **Separate the general mechanism from the specific case in this story.** When a story is about a specific instance of a more general dynamic, state the general rule in general terms first, then explicitly instantiate it for THIS story. From Gregory's 2026-05-12 markup on the Sharplink rewrite: *"In this case, it's pools where ETH is one of the assets. In other cases, it might be something else."* The danger if you don't separate them: the reader hears the general rule and the specific instantiation as one fused thing, can't transport the rule to a different story next week, and the variable lesson stays local.

  **Worked example from this story (Sharplink, Ethereum-focused fund):**
  - First draft (general rule and specific case fused): *"more money flows into the same kinds of pools the fund is targeting -- pools where ETH is one of the assets."* Reader hears: "the rule is about ETH pools." Wrong takeaway.
  - Final (separated): *"more money flows into the same kinds of pools the fund is targeting. Sharplink's fund is Ethereum-focused, so the pools getting deeper are the ones with ETH as one of the assets."* Reader hears: "the rule is about whatever pools the fund targets. In this story, that happens to be ETH-paired pools because Sharplink is Ethereum-focused."

  **Why:** The variables (TVL, Volume, Range, etc.) compound by transporting across stories. A reader who only ever sees the rule applied to ETH pools won't recognize the same rule when it shows up next month with a Solana fund and SOL-paired pools. Explicit separation is what makes the rule portable.

  **How to apply:** Any time you write a sentence that says "the same kind of X" or "this type of Y" or "the pools the fund targets," ask: "does this sentence work for any fund, any chain, any asset? Or did I bake the current story's specifics into the rule?" If the latter, split into two sentences: general mechanism first, specific instantiation second, with a connector like "in this case," "for [name]'s fund," or "since [actor] is [focus]-focused."

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
- **The Chart variable has two halves: long-horizon health AND where on the chart you're buying.** The Variables Reference frames both: *"we just want to make sure we're not buying at the very top or we're not buying into a chart that has only gone down throughout its lifetime."* Earlier rewrites narrowed The Chart to just the long-horizon half. From Gregory's 2026-05-12 markup on 05-04 Story 1: *"$80k is pretty far from the previous all time high. That's part of the chart variable -- being conscious of where in the chart you buy."*

  **The two halves:**
  1. **Long-horizon health, evaluated over the asset's lifetime** — does the chart show two-way action, real highs and lows, the shape of something alive? Or has it only gone in one direction throughout its history? Arbitrum (ARB) trending down for ~3 years is the canonical example of a failing long-horizon chart. From Gregory's 2026-05-12 markup: *"Maybe not necessarily through years but through the lifetime of the chart. Because the Solana chart, for example, wouldn't go throughout multiple years, but we would still use this variable to help discern what we're doing with Solana."* The bar is "long enough for the chart to show its shape" — not a fixed number of years. Some assets have a decade of chart, some have eighteen months. The variable applies to all of them; the threshold is "has the asset shown its character yet?" If the lifetime is too short to tell (e.g., a token that launched last week), the variable can't be applied and the position has to wait for more history.
  2. **Where on that chart you're buying** — even on a healthy chart, where price is sitting today matters. Buying at the very top means most of the downside is in front of you; the upside is in the rearview mirror. Buying well below the previous all-time high means there's still room for upside.

  **Both halves must be considered together.** An asset can pass long-horizon (alive chart, two-way action over years) but still be a bad buy if price is sitting at the very top. An asset can be buyable on the where-on-chart half (price has dropped a lot) but still be a bad LP if the long-horizon chart is dead — that's the "catching a falling knife" trap, and a dead chart doesn't bounce just because it looks cheap.

  **Worked example (BTC at $80K, 05-04 Story 1):** BTC passes both halves — multi-year chart is alive (big drawdowns, big rallies, both directions in play) AND $80K is comfortably below the previous all-time high (not buying at a top). ARB fails the long-horizon half entirely — the where-on-chart question doesn't even get asked, because the whole shape is dead.

  **Why both halves matter:** Gregory teaches LPs to think about asset quality the way a long-horizon investor does. "Don't buy at a top" is a real check — but only AFTER the asset has already passed the long-horizon health check. The two halves work together; an asset that fails either one isn't a chart-buy.

  **How to apply:** When using The Chart variable, structure the discussion as a pair of questions: (1) Is the multi-year chart alive? (2) Is current price far enough from the top to leave upside? Show both questions in worked examples. The previous framing of "The Chart is long-horizon, not short-term" was too narrow — short-term resistance levels (like *"$80K is a 90-day resistance"*) are still NOT what the variable asks; but where-on-the-chart **relative to the asset's multi-year shape** absolutely is.
- The verb is **implement or modify**. If a paragraph only explains a variable and never gives the reader something concrete to think through, it's not done yet. *Note:* this does NOT mean handing them the modification — see the hypothetical/educational rule above. It means making the variable's implication thinkable.
- **Lead with the actual news, factually, with specific numbers.** Name the protocol, name the token, name the dollar amount, name the mechanism (e.g., "cross-chain bridge exploit"). Then pivot to the LP lesson. Don't bury the event under the framing.
- **Define jargon inline at first use,** parenthetical or em-dash flanked: `rsETH — a liquid restaking token (LRT), meaning an asset that represents ETH deposited into restaking protocols and is designed to trade near 1:1 with ETH — was drained…`. The reader learns the term without needing to leave the sentence.
- **Look for the non-obvious second variable.** Most stories have one obvious variable (asset selection for an exploit, range for a price move). The strongest articles also surface the *counterintuitive* variable that flips the framing — e.g., an exploit feels like a "be afraid" story, but Volume turns it into a "you might be earning during the chaos" story. Two variables in opposite emotional registers teaches more than one variable explained well.
- **Humanize. Sound like a person, not an analyst.** This is the simplification rule from the 2026-05-11 Three Amigos call. The team's feedback after seeing the May 11 cron-generated digest on screen: *"humanize it so it sounds more like you than AI. Because when you think about the standard user is going to be probably going through this really quickly. And if you have to go back, because I just went through it and then I said, okay, what does this mean again? — that's when I stopped and said, wait a minute, I need to give you that feedback."* Three concrete sub-rules:
  - **Single-pass readability test.** If a reader has to re-read a sentence to figure out what it meant, the sentence failed. Reader pace is fast — every sentence has to land the first time.
  - **Shorter sentences, plainer words. Same concept.** From the call: *"it can say the exact same thing and just make it shorter and more simplified."* Do not change *what* is being taught — change *how* it is being said. Aim for sentences under ~30 words; break the long ones into two short ones. Prefer Anglo-Saxon verbs ("rise", "shrink", "rotate", "earn", "capture") over Latinate noun phrases ("experience appreciation", "exhibit composition shifts", "demonstrate exposure").
  - **Loop learning over vocabulary loading.** From Greg on the same call: *"I want to do more of that with the loop learning style than them having to understand what the words mean."* The variables compound through repetition, not through dense vocabulary. A reader should be able to absorb the variable through the *mechanic and consequence chain* without needing a glossary in their head.
  - **Why:** Audience is busy LPs who scan the digest, not researchers who study it. A dense sentence forces them to slow down or skip — both kill the compounding-knowledge goal. Shorter sentences with plain words let the variable land, the pattern repeat, and the curriculum work. A second reading should *deepen* understanding, not *unlock* it.
  - **How to apply:** After drafting, scan for the antipatterns logged in the Anti-patterns section (noun-of-noun phrases, analyst vocabulary, sentences over ~30 words). For any flagged phrase, ask: "what is the actual mechanic this is describing?" and rewrite using active voice. Test: read the sentence once at normal pace. If you have to slow down or re-read, simplify.

---

## How to use this file when drafting a new digest

1. Read the pairings list. Look for articles in your news set that match a pattern already documented (KelpDAO-shaped, Strategy-block-shaped, institutional-flow-shaped, etc.).
2. Read the anti-patterns. Make sure you're not reaching for a variable just because it's available.
3. Read the voice notes. Audit each paragraph for whether it gives the reader something to *do*, not just something to know.
4. Draft. Then re-check that every variable named in your pairings actually shows up by name in the relevant article — not just gestured at.
