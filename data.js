// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "05-07-2026",
    "date": "May 07, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-2.1%"
      },
      {
        "label": "ETH",
        "value": "-2.7%"
      },
      {
        "label": "Volatility",
        "value": "Mild risk-off, both assets pulling back"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.50"
      }
    ],
    "intro": "Both BTC and ETH are down on the day -- BTC at $79,986 (-2.1%) and ETH at $2,295 (-2.7%) -- as a mild risk-off move trims recent gains. Underneath the pullback, the longer-term picture runs the other way: five straight weeks of net ETF inflows and accelerating corporate BTC buying. That split -- short-term down, long-term up -- is exactly the regime where the Range you set last week may not match the one you are LPing into this week. Today's stories pull on Range, TVL, Volume, Correlation, and Asset Selection -- the variables that decide whether your money is in the band right now or watching from outside it.",
    "stories": [
      {
        "title": "Five Straight Weeks of ETF Inflows -- A Range Lesson and a Correlation Lesson",
        "body": "Spot Bitcoin ETFs now hold $108.76 billion in net assets after five consecutive weeks of net inflows -- the longest buying streak of the year. Put skew -- the premium traders pay for downside protection -- is fading, which means institutions are buying plain long exposure rather than hedged bets. Sustained one-direction demand is the textbook case for Range: a range skewed in the direction of the flow spends more time earning fees than one centered on today's price. If you expect BTC to drift up over the coming months, your BTC/USDC range should sit mostly above the current price. The non-obvious second variable is Correlation. In BTC/USDC, only half your money is in BTC -- so a 20% BTC move nets you about 10% of position appreciation. A correlated pair like BTC/ETH lets you ride the full move on both sides at once. The concrete tweak this week: not only 'skew my range upward,' but also 'consider rotating from a stablecoin-base pair into a correlated top-30 pair.' Same news, two decisions.",
        "spark": "Pull up your most active BTC position. Is your range centered or skewed -- and would you net more by rotating half of it into BTC/ETH? Which variable is actually driving that call for you?"
      },
      {
        "title": "Strategy On Pace to Buy $30B in BTC This Year -- Why That Affects Your Pool's TVL",
        "body": "JPMorgan analysts note that Michael Saylor's Strategy has accumulated roughly $11 billion in BTC so far in 2026 and could add $30 billion more by year-end at its current pace. A single structurally consistent buyer pulls capital from somewhere -- including DeFi positions whose holders rotate into BTC -- and that capital flow shows up as shifting TVL across pools. TVL matters because APR is essentially a function of volume relative to it: higher TVL means each LP earns a smaller slice of the same fee pie. The non-obvious second variable is Average Volume (45-day). Krystal shows today's volume, which inflates during institutional buying spurts and makes today's APR look stickier than it is. Before adding to a BTC pool this week, pull its 45-day average. If today's volume is well above the average, the headline APR will compress as volume reverts. The modification: pick the pool where 45-day average and daily volume look similar and TVL is rising slowly -- not the one with the eye-catching APR on the front page.",
        "spark": "Look at the BTC pool you most recently added to -- or were last tempted by. How does today's volume compare to its 45-day average on Krystal? What does the gap tell you about whether the APR you saw is the APR you'll actually earn?"
      },
      {
        "title": "AWS Wires USDC Into Its Agent Stack -- What That Means for Volume and Pair Choice",
        "body": "Amazon Web Services announced it is integrating USDC payments -- powered by Coinbase and Stripe -- so AI agents can make autonomous micropayments directly on-chain. USDC is a stablecoin (an asset pegged to $1), and it sits at the base of high-volume LP pairs like USDC/ETH and USDC/WBTC. When a platform of that size routes production transaction flow through USDC, the structural floor on stablecoin pair volume rises. Volume relative to TVL is what determines pay, so a new source of stablecoin volume is a Volume-side tailwind for LPs already positioned in those pairs. The non-obvious second variable is Asset Selection. USDC is issued by Circle, top-10 in market-cap rank, with audited reserves. The lesson is not 'add any stablecoin pool' -- it is 'add the pool where the stablecoin itself clears the safety barrier.' A pool paired with a lower-rank stablecoin might pay a higher fee tier, but a depeg event sends your range to one extreme instantly. This week's tweak: confirm every stablecoin you are paired with sits inside the top-30.",
        "spark": "Look at every stablecoin-paired position you currently run. Where does each stablecoin rank in market cap -- and which would you rotate out of if the rank slipped past 30?"
      },
      {
        "title": "Bitwise Acquires a $267M Crypto Carry Fund -- The Capital It Pulled In Came From Somewhere",
        "body": "Bitwise is acquiring Superstate's $267 million Crypto Carry Fund, a tokenized product that earns yield by exploiting the gap between spot crypto prices and futures prices -- a structure traders call carry. Carry trades work best in contango (a market state where futures trade at a meaningful premium to spot), and they pull yield-seeking capital that would otherwise sit in LP pools. The variable they pressure is TVL. When LP TVL softens because carry got attractive, the LPs who stay capture a larger share of the same fee pie -- volume relative to TVL rises, and so does APR. The non-obvious second variable is Market Sentiment. Contango blows out widest when sentiment is greedy, which the Variables reference flags as a leading signal of an upcoming correction. Carry inflows and extreme-greed sentiment tend to peak together. The modification: when carry funds make headlines for raising capital, treat it as a prompt to check your pool's TVL trajectory and Coin Market Cap's sentiment gauge before adding new positions -- the same conditions that fund carry are often the conditions where tight ranges get knocked out.",
        "spark": "Open Coin Market Cap right now and check the Fear and Greed index against the TVL trend on your largest LP position. Are they telling the same story? Which would you trust if they disagreed?"
      },
      {
        "title": "Kraken Buys an Asian Stablecoin Firm for $600M -- The Narrow-Range Trade Just Got More Interesting",
        "body": "Kraken's parent company acquired Reap, an Asian stablecoin infrastructure firm, for $600 million, extending its reach into cross-border payment flows. More stablecoin infrastructure means more stablecoin volume -- payments settling in USDC or USDT often route through DEX pools along the way. For stablecoin-to-stablecoin pairs like USDC/USDT, price barely moves, which is why LPs run extremely narrow Range there -- often a few basis points wide. A narrow range concentrates capital where the swaps actually happen and squeezes more fees per dollar. The catch is fee tier: stablecoin pools pay 0.01% to 0.05%, so volume has to carry the math. The non-obvious second variable is Asset Selection. Narrowing your range to capture tight stablecoin volume only works if both stablecoins hold their peg. A depeg knocks you to one extreme in seconds and locks you into whichever side is bleeding. Top-30 stablecoins -- USDC, USDT, DAI -- have the deepest issuer credibility. A higher fee tier paired with a smaller, less-vetted stablecoin is the trade that looks great until it doesn't. This week's tweak: if you are tightening a stablecoin pair, sanity-check the rank and issuer of both sides before going narrower.",
        "spark": "If you currently run a stablecoin/stablecoin position, how narrow is your range -- and what would you do in the first 30 seconds of a depeg headline? Pull the position, widen the range, or wait it out? Why?"
      }
    ],
    "closing": "Today's pullback is the kind of soft test that shows which of your ranges you would actually defend and which you set on autopilot. Run the variables across your top position -- TVL, volume vs 45-day average, asset selection, correlation -- and pick the one where you have been least disciplined. What is the smallest concrete change you would make to that position before Monday, and which variable is forcing the change?"
  },
  {
    "id": "05-04-2026",
    "date": "May 04, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "+1.6%"
      },
      {
        "label": "ETH",
        "value": "+0.9%"
      },
      {
        "label": "Volatility",
        "value": "Calm, mild uptrend"
      },
      {
        "label": "ETH Gas",
        "value": "~$2.50"
      }
    ],
    "intro": "Both BTC and ETH posted modest gains this week -- BTC crossed $80,000 for the first time since January while ETH climbed past $2,348. The broader market feels like it is catching its breath after a turbulent stretch. For LPs, that is exactly the regime where the variables matter most: fee conditions are steady, but a range you set a month ago may no longer be centered where the action is, and TVL flows are quietly rotating between competing yield opportunities. Today's stories pull on Range, The Chart, Correlation, TVL, Volume, and Asset Selection -- a wide enough sweep to audit almost any open position against.",
    "stories": [
      {
        "title": "BTC Crosses $80K While Strategy Takes a Rare Week Off -- A Range Lesson and a Chart Lesson",
        "body": "Bitcoin crossed $80,000 this week for the first time since January. The detail underneath the headline: Strategy -- the $65 billion treasury firm that has been the most consistent large BTC buyer of the past year -- took a rare week off from accumulating. The variable in this story is Range. If your range was centered below current price and BTC ran through it, your money has rotated to the other side of the pair: you collected fees on the way up, but your starting BTC exposure is now mostly stablecoin. A range skewed higher -- say $78K to $92K instead of $68K to $82K -- would have kept you earning further into the move. The non-obvious second variable is The Chart. BTC at $80K with Strategy bidding underneath is a different chart than BTC at $80K with Strategy on the sidelines. The Variables Reference is direct: do not LP into a chart that has only gone up recently, because that means buying near a top with more downside than upside available. This week's tweak: re-look at the BTC chart and decide whether the position thesis you set when Strategy was buying weekly still holds with that bid removed.",
        "spark": "If your BTC range was centered at $74K when you set it, your money is now mostly stablecoin. Open the position. Would you re-enter this same range today knowing Strategy isn't buying this week? Why or why not?"
      },
      {
        "title": "BitMine Bought 100K+ ETH for the Third Week Running -- Range Skew, and Why the Pair Type Matters",
        "body": "BitMine Immersion Technologies, backed by strategist Tom Lee, made its third consecutive weekly ETH purchase above 100,000 ETH, adding roughly $240 million in Ethereum this week alone. Sustained institutional-scale buying creates a slow upward drift, which behaves differently for LPs than a sudden spike. A fast pump pushes price out of your range before you collect many fees; a slow drift lets you earn fees at each tick (a tick is the smallest price increment a Uniswap V3 or V4 pool divides price into) as price moves through your band. The primary variable here is Range. If you believe ETH has a directional tailwind, centering your range above current price -- not symmetrically around it -- keeps you in range further into the upside. The non-obvious second variable is Correlation. In ETH/USDC, only half your dollars are in ETH, so a 20% ETH move nets about 10% of position appreciation. A correlated pair like ETH/BTC puts both sides on the same up-trend train. The modification: when you see sustained directional buying, the question is not only 'where should my Range sit' but also 'is the pair type giving me full exposure to the move I expect?'",
        "spark": "If you currently run an ETH/USDC position and you also believe ETH has a directional tailwind from BitMine-style buying, what would you net by rotating half of it into ETH/BTC? Which variable would you weigh more heavily in that call -- Range or Correlation?"
      },
      {
        "title": "Western Union Launches USDPT on Solana -- New Stablecoin Pair, and Why TVL Timing Matters",
        "body": "Western Union launched USDPT, a dollar-pegged stablecoin (an asset designed to hold a stable $1 value) on Solana for cross-border settlement across more than 200 countries. New stablecoins that gain traction create new trading pairs, and new pairs often see outsized volume in their early weeks. The primary variable for these pairs is Range: stablecoin-to-stablecoin pools use very tight ranges -- a handful of ticks wide -- because price barely moves and tight ranges concentrate liquidity where the swaps happen. The non-obvious second variable is TVL. A brand-new pair starts with effectively zero TVL. The first LPs in own the entire fee pie until others arrive, and APR is volume divided by TVL -- so early TVL is small, volume is potentially large, and the APR window is briefly very wide. As liquidity enters, that ratio compresses and APR normalizes. The catch: the same low-TVL early window also has the highest depeg risk, because a brand-new stablecoin has not been stress-tested yet. The modification: if you are tempted by the early TVL window, size the position smaller than you would on USDC/USDT and watch the peg daily for the first two weeks.",
        "spark": "If you considered an early position in a USDPT pool, what would your maximum dollar size be -- and what specifically would make you pull the position in the first two weeks? Name the trigger."
      },
      {
        "title": "DTCC Plans to Tokenize Stocks and Treasuries -- A Volume Tailwind, and a New Class of Top-Rank Assets",
        "body": "DTCC -- the institution that clears and settles nearly all U.S. stock and bond trades, managing $114 trillion in securities -- announced plans to tokenize (convert into blockchain-based tokens that move on-chain) Russell 1000 stocks and U.S. Treasuries, with major Wall Street firms already participating. This unfolds over years, not weeks, but the direction matters for LPs. The primary variable is Volume. More institutional infrastructure entering DeFi brings more transactions, and volume relative to TVL is what determines pay. Even a small percentage of DTCC's $114 trillion settled on-chain over time would dwarf current DEX volume. The non-obvious second variable is Asset Selection. The Variables Reference defines safety by market-cap rank; tokenized U.S. Treasuries blow past that scale entirely. A U.S. Treasury is the deepest, most-traded, most-vetted asset on Earth, and a tokenized version of one would be a safer Asset Selection than anything currently in the top-30 crypto rankings. The modification this week is not a trade -- it is a watch-list. When the first tokenized-Treasury pool launches on a major DEX, the early-mover dynamics will look like USDC/USDT but with an even tighter Range and a stronger safety floor.",
        "spark": "When tokenized U.S. Treasuries eventually trade in LP pools, would you treat them as a stablecoin-shaped position (tight range, low volatility) or a different category entirely? What would your first move be the day the first such pool goes live?"
      },
      {
        "title": "Haun Ventures Raises $1B for Crypto and AI -- Where VC Dollars Go, Asset Selection Risk Follows",
        "body": "Haun Ventures closed a $1 billion raise across two new funds focused on blockchain and AI, one of the largest crypto-focused venture rounds in recent memory. That capital will fund protocols, new tokens, and new trading pairs over the next one to two years. The headline reads bullish: more capital, more on-chain activity. But for LPs the harder lesson sits in Asset Selection. VC-backed tokens almost never launch inside the top-30 market-cap safety band -- they launch at rank 100 or worse, where the Variables Reference flags real recovery risk after a drawdown. Providing liquidity in a VC-funded protocol's first pool means accepting full exposure to whichever side price moves toward, on an asset whose chart has no history yet. The non-obvious second variable is The Chart. The Variables Reference says do not buy an asset whose chart has only gone up or only gone down -- you want highs and lows, two-way action. New tokens launched on VC bid usually pump first and chop later; the first six to twelve months of chart history rarely shows the healthy two-way pattern the reference asks for. The modification: when you see a major VC announcement, add the funded protocol to a watch list, but wait until the chart shows two-way price action before LPing into its early pools.",
        "spark": "Think of the last time you considered LPing in a brand-new protocol's pool. Did the asset's chart show two-way action, or only one direction? If you had waited for two-way action, what would have changed about the timing or sizing of your position?"
      }
    ],
    "closing": "Quiet weeks are planning weeks. The variables that decide your next decision are sitting in front of you with no urgency: Range that needs re-centering, Asset Selection on a new pool you were considering, The Chart on a token you had on watch, TVL on the pool whose APR looked too good. Pick one variable you have not audited in the last two weeks and run it across your largest position. What does it tell you that you would not have noticed if this week had been chaotic?"
  },
  {
    "id": "04-30-2026",
    "date": "April 30, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "+0.5%"
      },
      {
        "label": "ETH",
        "value": "-0.5%"
      },
      {
        "label": "Volatility",
        "value": "Low, rangebound"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.50"
      }
    ],
    "intro": "The Fed held rates steady this week but with an unusually deep internal split -- neither a confident hold nor a pivot signal -- which left markets in a wait-and-see mood. BTC and ETH moved less than 1% in opposite directions, making it one of the quieter weeks in recent memory. For LPs, low-volatility stretches are where your original Range setup does most of the work and where the discipline to do nothing is often correct. But quiet does not mean nothing is happening underneath. Today's stories pull on Range, Average Volume (45-day), Correlation, TVL, Volume, Asset Selection, and Market Sentiment -- the variables that decide whether 'do nothing' is actually right for your position.",
    "stories": [
      {
        "title": "BTC Trapped Below Resistance -- The Range Lesson and a 45-Day Average Worth Trusting",
        "body": "Analysts described Bitcoin as 'trapped below' a key resistance level this week, with ETF outflows continuing for a third straight day as the Fed's mixed signals kept buyers cautious. A rangebound market -- one where price bounces inside a band rather than trending in one direction -- is the textbook case for Range. Wider ranges capture the back-and-forth without dropping out; if your BTC range is too narrow and BTC finally breaks out to $83K, you go out of range instantly and earn nothing while price runs. The tradeoff is always fee intensity versus staying power, and chop favors staying power. The non-obvious second variable is Average Volume (45-day). Krystal shows today's volume, which during a quiet week is usually close to the 45-day average -- meaning the APR you are looking at right now is the most sticky, real number you will see all month. Outlier days inflate APR. Quiet days are when the APR you observe is the APR you actually earn. The modification: in chop, do not get jealous of the high-APR opportunities you saw on big move days; the boring APR in a quiet week is the one you can count on.",
        "spark": "Pull up the daily volume on your largest BTC pool and compare it to the 45-day average right now. If they look the same, what does that tell you about whether to widen your range or hold it as-is going into a potential breakout week?"
      },
      {
        "title": "BTC and ETH Drifted Apart This Week -- A Correlation Story With a Range Hook",
        "body": "BTC gained 0.5% this week while ETH fell 0.5% -- a small but real divergence between the two largest crypto assets. The primary variable here is Correlation. BTC and ETH usually move together (close to +1 Pearson correlation, in the Variables Reference's terms), which is why a BTC/ETH LP pair amplifies an up-trend so well. When that correlation softens, the Variables note warns it is one of the situations where correlated pairs become less attractive: you are no longer riding both sides up at once. The non-obvious second variable is Range. In any pair, when prices drift apart, the pool rebalances mechanically -- selling the relatively appreciating asset and accumulating the relatively depreciating one. A narrow Range makes that rotation happen fast; a wider Range slows it down. If you set a tight BTC/ETH range last month expecting tight correlation, the rotation is now eating into your position faster than fees can replace it. The modification: in a week where the two biggest assets are clearly drifting, widen the Range on your BTC/ETH positions or consider rotating one side into a USDC base where the rebalance mechanic is more predictable.",
        "spark": "If you currently run a BTC/ETH position and the two kept moving in opposite directions consistently for the next month, what would happen to the ETH/BTC ratio inside your pool? At what divergence threshold would you close or widen?"
      },
      {
        "title": "A New Solana Yield Exchange Just Raised $5M -- A TVL Rotation Story",
        "body": "Exponent, a Solana-based yield exchange (a protocol that lets users trade or lock in future yield at a fixed rate rather than accepting variable returns), raised $5 million in seed funding led by Multicoin Capital. Every new yield product pulls from the same pool of yield-seeking dollars that currently sits in LP positions. The primary variable here is TVL. When a competing strategy gets attractive enough that capital rotates out of LP pools, TVL in those pools drops -- and the LPs who stay capture a larger share of the same fee pie. The non-obvious second variable is Volume. APR is essentially Volume times fee tier divided by TVL. A TVL drop only translates to higher APR for the LPs who stayed if Volume holds steady. The modification: when you read about a new yield product launching, do not skip past it -- two things to check on your largest pool over the next four weeks are whether TVL is softening (good for you if you stay) and whether Volume is holding (the part that decides whether staying was worth it).",
        "spark": "Pick your largest LP position and pull both its TVL trend and its 30-day fee revenue. If TVL has been dropping but fees are stable, what does that tell you? What if both are dropping together?"
      },
      {
        "title": "AI Agent Cards Launching on USDT -- A Volume Tailwind, and Why Issuer Matters",
        "body": "A Tether-backed startup called Oobit announced 'Agent Cards' this week -- Visa-supported corporate expense cards that let AI agents spend USDT autonomously without a human approving each transaction. If agent spending scales, it creates a new source of transaction Volume in stablecoin pairs like USDC/USDT, and Volume is the direct driver of fees in those pools. Stablecoin-to-stablecoin pools operate in very tight Ranges (typically a few ticks wide) and earn fees almost entirely from volume rather than price swings. The non-obvious second variable is Asset Selection. USDT is issued by Tether, which sits in the top-10 by market cap but has historically faced more peg-stability and reserve-transparency questions than Circle's USDC. Both clear the top-30 safety bar, but they are not identical risks. A pool that pairs USDT with a smaller, less-vetted stablecoin would carry compounding asset-selection risk -- and depeg risk hits narrow-range positions hardest. The modification: if USDT-linked volume is rising, the natural way to capture it is USDC/USDT (top-10 on both sides), not USDT paired with a smaller stablecoin.",
        "spark": "Look at every USDT-paired position you currently run. What is on the other side of the pair, and where does it sit in market-cap rank? Would you sleep well through a USDT peg headline?"
      },
      {
        "title": "Google and Microsoft Crushed Earnings -- When Risk-On Sentiment Reaches Your Range",
        "body": "Google and Microsoft both beat Q1 earnings this week, with Google Cloud revenue up 63% and Microsoft's AI business hitting a $37 billion annual run rate. Strong results from tech giants tend to shift macro sentiment toward 'risk on' -- investors grow more willing to hold volatile assets, which historically pulls crypto markets higher. The primary variable here is Market Sentiment. The Variables Reference says to watch the Coin Market Cap sentiment gauge: at extreme greed, expect a correction; at extreme fear, expect a turnaround; on either end, the regime that follows is different from the one that came before. The non-obvious second variable is Range. If sentiment flips quickly from neutral to greedy on the back of macro news like this, a narrow Range you set during a quiet week can get knocked out fast. A move from ETH at $2,260 to $2,600 in two weeks pushes any range that ends at $2,500 out of bounds -- and your money is now fully in USDC while ETH keeps running. The modification: when sentiment looks ready to shift, audit your Range upper bounds. Either widen them, skew up, or accept you will be rebalancing more often than usual.",
        "spark": "Open Coin Market Cap and check the Fear and Greed index right now. If it moved from neutral to greed over the next two weeks while ETH ran from $2,260 to $2,600, what happens to an ETH/USDC position with a range of $2,100 to $2,500? Walk through what your asset composition looks like at $2,400 versus $2,501."
      }
    ],
    "closing": "Quiet weeks are a good time to audit which of your ranges still reflect your actual outlook -- not just the outlook you had when you set them. Run the variables across your largest position: Range width, Correlation regime, TVL trajectory, sentiment gauge. Pick one variable that has shifted since you set the position and ask whether your current setup still matches it. What are you watching heading into next week?"
  },
  {
    "id": "04-27-2026",
    "date": "April 27, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-1.3%"
      },
      {
        "label": "ETH",
        "value": "-2.7%"
      },
      {
        "label": "Volatility",
        "value": "Mild pullback, ETH lagging BTC"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.20"
      }
    ],
    "intro": "Both BTC and ETH slid into the weekend, but ETH fell roughly twice as hard as BTC -- a reminder that the two largest assets do not always move in lockstep. For LPs holding ETH-paired positions, that gap is already reshaping your pool composition: your money now holds more ETH and less of the paired asset. Institutional signals are mixed -- some big buyers pausing while others are just getting started. Today's stories pull on Range, Correlation, Market Sentiment, The Chart, Volume, TVL, and Average Volume (45-day) -- the variables that decide whether the gap between BTC and ETH this week is a problem for your position or an opportunity hiding underneath it.",
    "stories": [
      {
        "title": "ETH Fell Twice as Hard as BTC -- A Range Mechanic and a Correlation Crack",
        "body": "ETH fell -2.7% today versus BTC's -1.3%, underperforming by more than a full percentage point in a single session. The primary variable in this story is Range. For an LP holding an ETH/USDC position centered around $2,300 to $2,600, price pressing toward the lower boundary means the pool is now holding proportionally more ETH and less USDC -- the pool always rebalances toward whichever asset is depreciating. A tighter range like $2,250 to $2,350 may already be fully out of range and earning zero fees, while a wider $2,000 to $2,800 range stays active and captures every swap. The non-obvious second variable is Correlation. BTC and ETH usually move close to +1 Pearson correlation -- they drop together in similar magnitudes. ETH falling at 2x BTC is the correlation softening in the down direction, which the Variables Reference flags specifically as the regime where you do NOT want correlated pairs. If you currently hold BTC/ETH, the rebalance mechanic is running against you on both sides at once. The modification: in any week ETH falls noticeably harder than BTC, audit both your ETH-paired Range and any BTC/ETH positions -- the correlation crack hurts the correlated pair worse than the stablecoin-base pair.",
        "spark": "If ETH slid to $2,100 and your range bottom was $2,200, you are out of range and holding 100% ETH with zero fee income. Which is worse for you right now: an ETH/USDC range that has slipped out of bounds, or a BTC/ETH range that is mechanically rotating into the worse-performing asset? Why?"
      },
      {
        "title": "Bernstein Calls a 'Structurally Longer Bull Cycle' -- A Range Skew Decision, Filtered Through Sentiment",
        "body": "Bernstein published a note arguing that new institutional on-ramps and sustained capital flows point to asymmetric upside for crypto. For LPs, a directional call like this raises a real Range question: a centered range earns fees symmetrically above and below price, while a Range skewed mostly above current price captures more appreciation if the bullish forecast plays out -- but earns fewer fees if price drifts sideways or dips. A skewed range is essentially a directional bet layered on top of your fee income. The non-obvious second variable is Market Sentiment. Bernstein's note is one analyst voice. The Variables Reference says to cross-check directional views against the Coin Market Cap sentiment gauge: if sentiment is in neutral or mild-greed territory, an analyst bull call is a useful complement; if sentiment is already at extreme greed, the same bull call may be a contrarian sell signal because the Variables note warns extreme greed often precedes corrections. The modification: do not skew based on a single analyst note. Pull up the sentiment gauge first. If sentiment is neutral and the bull narrative is fresh, that is when a skew earns its keep. At extreme greed, stay centered or tighten.",
        "spark": "Open Coin Market Cap and check the Fear and Greed index right now. Where is it? If it is in neutral or mild greed, would you skew a range upward on Bernstein's call? If it is in extreme greed, what would you do instead?"
      },
      {
        "title": "BitMine Crossed 5 Million ETH -- A Floor Argument, Tested Against the Chart",
        "body": "BitMine Immersion Technologies, which runs a corporate ETH treasury strategy, crossed 5 million ETH with its largest single purchase of 2026 so far. Large persistent buyers create what traders call a price floor -- a level where consistent demand absorbs selling pressure. The primary variable here is Range. If you believe $2,000 is heavily supported by BitMine-style buying, placing your range's lower boundary near $2,100 (rather than $1,700) concentrates liquidity in a narrower band and earns proportionally more fees per dollar while price stays inside it. The non-obvious second variable is The Chart. The Variables Reference is direct: do not place your range based on a narrative alone -- look at the actual chart. Where did ETH actually bounce in the past 90 days? If the chart shows real support at $2,100, your lower boundary has visual evidence behind it. If recent bounces are deeper (say $1,800), then $2,100 is the *story's* floor, not the chart's. The narrative floor and the chart floor are not always the same. The modification: when a 'floor argument' shows up in your news feed, pull up the chart on Krystal or TradingView and find where price actually bounced. Place your lower boundary at the chart-supported level, not the headline-supported one.",
        "spark": "Pull up your ETH/USDC range right now and the ETH chart over the last 90 days. Where is your lower boundary, and where has price actually bounced in that window? Are those the same level? If not, which one should win?"
      },
      {
        "title": "Gemini Launches AI Trading Bots -- JIT Liquidity and Why Pool Size Matters",
        "body": "Gemini announced 'Agentic Trading,' letting AI bots directly manage exchange accounts -- the first such tool on a regulated US exchange. For LPs, automated participants matter because of JIT liquidity (short for just-in-time liquidity) -- a practice where bots detect a large incoming swap, deposit a very narrow range to capture most of its fees, and withdraw immediately after the trade clears. JIT bots effectively cut in line ahead of passive LPs on the most lucrative swaps. The primary variable here is Volume. JIT only works when a swap is large enough to justify the gas to deposit and withdraw -- so it concentrates on the biggest swaps in the deepest pools. The non-obvious second variable is TVL. JIT bots target deep, high-TVL pools because that is where the largest swaps land. Newer or lower-TVL pools do not pencil out for them. The modification: a passive LP in the deepest USDC/ETH pool competes directly with JIT bots for the biggest swaps. A passive LP in a smaller pool keeps more of the fees per trade because no bot is bothering. The biggest pool is not always the most profitable for a passive LP -- a middle-tier pool with similar volume-to-TVL ratio but no JIT competition may net you more.",
        "spark": "Look at the pool size of your two most active LP positions. Are they top-five-in-TVL on the asset pair, or middle-tier? If JIT bots are reading those pools first, which one do you think captures more of the fees you see in the headline APR?"
      },
      {
        "title": "Strategy's BTC Buying Pace Falls 91% -- TVL Stays, But Volume May Follow",
        "body": "Strategy dramatically slowed its bitcoin purchases this week -- down 91% from its recent pace -- after leaning heavily on its STRC preferred stock vehicle to fund prior buys. Strategy's consistent accumulation has been a steady source of upward price pressure on BTC, and any pause in that engine matters for LP positioning. The primary variable is TVL. A buyer like Strategy does not LP -- they hold BTC directly. But the BTC they pull off exchanges is BTC that does not later show up as profit-taking flow in stablecoin-base pools, so BTC pool TVL has been unusually stable. With Strategy paused, ordinary trading flow dominates again, which can mean choppier short-term TVL in BTC pools. The non-obvious second variable is Average Volume (45-day). Without a structural buyer creating upward pressure, BTC volume often drifts back toward its 45-day average -- which in 2026 has been lower than the headline weeks. The APR on Krystal this week may look fine, but if today's volume sits at or below the 45-day, that is the sticky number; if it is above, expect compression. The modification: in the two weeks following a major buyer pausing, pull the 45-day average on your BTC pools and compare to today. Use the lower of the two when estimating what APR will actually deliver.",
        "spark": "If Strategy stays paused for the next two weeks and BTC trades sideways, what does that do to the volume on the BTC pool you are most exposed to? Pull Krystal's 45-day average and compare to today's -- which number do you trust for estimating next month's APR?"
      }
    ],
    "closing": "This week is a useful reminder that macro narratives -- institutional buyers, AI bots, analyst forecasts -- all eventually show up as Range conditions, TVL flows, Volume patterns, and the chart you are LPing into. Take five minutes to check where your current positions sit and ask: is the variable that originally drove this trade still the variable in charge? Is my Range still earning, or am I holding the worse-performing asset and waiting for a bounce?"
  },
  {
    "id": "04-23-2026",
    "date": "April 23, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-0.6%"
      },
      {
        "label": "ETH",
        "value": "-2.4%"
      },
      {
        "label": "Volatility",
        "value": "Elevated, resistance overhead"
      },
      {
        "label": "ETH Gas",
        "value": "~$2.40"
      }
    ],
    "intro": "Both BTC and ETH are drifting lower this week, with ETH taking the harder hit at -2.4% in 24 hours. For LPs, a slow slide is often more disruptive than a sharp move -- price creeps toward the edge of your Range without triggering the fee volume that would reward you for staying put. The macro backdrop remains uncertain, which means ranges set during calmer conditions may need a second look. Today's stories pull on Range, The Chart, TVL, Volume, and Asset Selection -- and one of them is the textbook example of a scary headline that also delivers a Volume tailwind for the LPs who do not panic.",
    "stories": [
      {
        "title": "Bitcoin Stalls Below $80K -- A Range Decision Anchored to the Chart",
        "body": "BTC is sitting at $78,516 and analysts are flagging $80,000 as a heavily contested resistance zone -- a price level where sellers are expected to push back against further gains. Whales (large holders) and ETF buyers are stepping into the dip, but profit-taking is real. The primary variable here is Range. If your range is centered above current price hoping to capture upside through resistance, a reversal at $80K pushes price back through your band and flips your asset mix back toward the stablecoin side. You collected fees on the way up, but the BTC exposure you started with is now mostly cash. The non-obvious second variable is The Chart. 'Resistance at $80K' is an analyst phrase, but the Variables Reference is direct about using the chart rather than narratives: pull up BTC's price history and find where price has actually rejected before. If the chart shows multiple bounces off $80K to $82K, your upper boundary has earned its position. If the resistance is narrative-only and the chart has not yet tested it, your range may be sitting too tight against a level that has not proven itself. The modification: before placing your upper bound near $80K, verify on the chart that price has actually been rejected there before.",
        "spark": "If BTC tests $80K and bounces back to $76K, what happens to the asset mix inside a range set between $76K and $82K? Now pull up the BTC chart over the last 90 days -- has price actually been rejected at $80K before, or is this the first attempt?"
      },
      {
        "title": "JPMorgan Flags DeFi Exploits and Shrinking Pool Liquidity -- A TVL Story With a Hidden Volume Tailwind",
        "body": "JPMorgan published a note this week warning that persistent hacks in DeFi (decentralized finance -- on-chain protocols for trading, lending, and providing liquidity) are pushing investors toward USDT and out of liquidity pools during stress events. The headline read of this is scary: LP TVL is shrinking when exploits hit. The primary variable here is TVL. When LPs panic-withdraw from one pool after an unrelated exploit, every pool in the sector feels it -- thinner liquidity means price moves more sharply on each trade, which can knock your range out faster than usual. The non-obvious second variable is Volume. The same panic that drives TVL down also drives Volume up: arbitrage bots fire, attackers swap to launder, panicked holders rotate, and the broader market gets more active. APR is essentially Volume divided by TVL -- so when TVL drops and Volume spikes, the LPs who stayed earn substantially more per dollar deployed during the chaos. The KelpDAO exploit ten days ago was a real-world demonstration: bad news for one protocol was a fee tailwind for unrelated stable pools. The modification: when an exploit headline lands and your pool is unaffected, do not match the panic. Check the volume on your pool -- if it surged, you are now in a higher-APR window than you have seen in weeks.",
        "spark": "If an exploit in a nearby pool causes a wave of LP withdrawals and your pool's TVL drops by 40% while you stay put, what happens to your share of fees -- and what would the volume on those panic trades have to look like for you to call this a profitable week rather than a scary one?"
      },
      {
        "title": "Tether Freezes $344M in USDT -- What a Stablecoin Wobble Costs Your Range and Your TVL",
        "body": "Tether coordinated with US law enforcement to freeze $344 million in USDT on the Tron blockchain, one of the largest freezes on record. USDT itself held its $1 peg during the event, but news like this can briefly cause USDT to trade at $0.998 or $0.997 -- a depeg, when a stablecoin's price drifts away from its intended $1 anchor. The primary variable here is Asset Selection. USDT is top-10 by market cap, but the issuer's history of regulatory pressure and reserve questions makes it a different risk profile than Circle's USDC. The Variables Reference grades safety by market-cap rank, and within the top-10, the depeg track record and issuer reputation matter for stablecoin pairs in a way they do not for volatile pairs. The non-obvious second variable is TVL. A depeg event hits two things at once: your range (the price ratio in an ETH/USDT pool shifts as if ETH moved, even when ETH did not), AND the pool's TVL (panicked LPs pull out, which thins liquidity further). Two compounding hits at the same moment. The modification: if you currently hold USDT-paired positions, do not just check the peg headline -- also watch the pool's TVL trajectory in the 24 hours after, because if other LPs are exiting, your liquidity environment is changing too.",
        "spark": "If USDT briefly trades at $0.997 while ETH holds steady at $2,300, what happens to the price ratio in your ETH/USDT pool? Now pull the pool's TVL chart -- if TVL drops 20% in that same window, does that make you more or less worried than the peg deviation alone?"
      },
      {
        "title": "Microsoft-Backed Project Builds on Base -- A Volume Story With a Range Tradeoff",
        "body": "Space and Time, a blockchain data infrastructure company backed by Microsoft, is rolling out developer tools on Base -- Coinbase's Layer 2 network (a faster, cheaper blockchain that settles to Ethereum). More developer tooling on Base typically attracts more apps, more users, and more swap Volume flowing through Base's liquidity pools. The primary variable here is Volume. Higher swap volume directly drives fee income -- more trades, more fees. The non-obvious second variable is Range. A surge of new activity does not just bring more swaps; it also brings more price volatility, because new apps moving real value tend to cluster their flows unevenly. A narrow Range captures more fees per dollar deployed during steady volume, but goes out of range fast when volatility picks up. The tradeoff is always staying power versus fee intensity, and a Volume surge from new ecosystem activity is exactly the scenario where that tradeoff sharpens. The modification: if you provide liquidity on Base pools, look at the volume trend over the past four weeks -- if it has been climbing, this is a moment to either widen your Range to survive the new volatility or accept you will rebalance more often than usual.",
        "spark": "If swap volume in a Base pool you hold doubles over the next month from new app activity, would you rather hold a narrower Range for fee capture or widen it for staying power? What does your answer reveal about how much time you actually want to spend managing positions?"
      }
    ],
    "closing": "This week's price action is a useful reminder that quiet markets still have moving parts -- The Chart's actual resistance levels, TVL flows triggered by unrelated exploits, stablecoin assumptions you accepted when you set the position, and Volume changes you may not have noticed. Take five minutes and ask your largest position: which variable would I be most surprised to see has moved since I set this? That is the one to audit first."
  },
  {
    "id": "04-21-2026",
    "date": "April 21, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "+2.4%"
      },
      {
        "label": "ETH",
        "value": "+1.8%"
      },
      {
        "label": "Volatility",
        "value": "Low -- gentle uptrend"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.50"
      }
    ],
    "intro": "Both BTC and ETH logged modest gains today in a week that felt more like a slow drift upward than a decisive breakout -- the kind of market that rewards patience but quietly tests LP ranges set for sideways chop. A $600M wave of DeFi exploit losses is a sharp reminder that not every pool carries the same risk, even when the headline numbers look calm. For LPs, this is a good week to ask whether your ranges reflect the actual behavior of the pairs you're in, not just the general mood of the market.",
    "stories": [
      {
        "title": "The Kelp DAO Exploit -- What Happens to Your Range When One Token Breaks",
        "body": "Over $600 million in DeFi losses piled up in recent weeks, with Kelp DAO at the center -- a protocol that issues liquid restaking tokens, or LRTs, which are tokens that represent staked ETH while still earning additional yield elsewhere. When an LRT drifts from its expected peg to ETH (called an oracle depeg -- 'oracle' being the price feed that tells a pool what an asset is worth), any LP pool holding that token can reprice violently and instantly. If your range was set expecting the LRT to trade between $2,200 and $2,500, a depeg could push price to $1,800 in minutes, leaving your position entirely composed of the now-devalued token with no fees coming in. Kelp, Aave, and LayerZero are still pointing fingers at each other over who bears the losses, which itself is a lesson: always understand what protocol backs the assets in your pool, not just the price chart.",
        "spark": "If you hold a liquidity position where one side is a wrapped or restaked asset rather than a base token, how would you monitor for signs of a depeg -- and at what point would you exit rather than wait for recovery?"
      },
      {
        "title": "Slow Drift Up -- Why a Gentle Trend Is Harder on Ranges Than a Spike",
        "body": "BTC at $75,933 and ETH at $2,316 both ticked up modestly -- 2.4% and 1.8% respectively -- which sounds harmless, but a slow, sustained drift in one direction is actually one of the harder conditions for LP ranges to handle. A symmetric range (set equal distance above and below the current price, say $2,100 to $2,500 for ETH) performs well when price oscillates back and forth, because it captures fees on both up and down moves. But in a slow uptrend, price walks steadily toward the top of your range -- and once it crosses out, you stop earning fees entirely and hold only the non-ETH side of your pair. Skewing your range upward (for example, $2,200 to $2,700 instead of $2,100 to $2,500) gives more runway above the current price, keeping you in range longer during a trend while still concentrating liquidity enough to capture meaningful fees.",
        "spark": "How would you decide when a price move is strong enough to justify re-skewing your range in that direction versus just widening it symmetrically to cover more ground?"
      },
      {
        "title": "Institutional Money Keeps Arriving -- What Calmer Markets Mean for Fee Capture",
        "body": "Bitwise's new Avalanche ETP filing and comments from Matt Hougan about institutional capital 'reshaping crypto' are part of a bigger pattern: regulated products like ETFs bring in buyers who tend to accumulate steadily rather than trade frantically, which gradually smooths out the volatile swings that retail markets are known for. For LPs, this is a double-edged shift -- fees on a Uniswap V3 pool (where liquidity is concentrated rather than spread across all prices) are generated only when trades actually happen inside your range, so calmer markets mean fewer swaps and lower fee income per day. A narrow range earns more per trade when it stays in range but falls out quickly during a price spike; a wider range earns less per trade but stays active through longer, quieter trending periods. If institutional flows really are making ETH price behavior more gradual and less spiky, that argues for slightly wider ranges that stay in play longer rather than razor-thin ranges optimized for chop.",
        "spark": "If you believe ETH is becoming more like a traditional asset -- slower moves, longer trends, fewer spikes -- how would that change how you think about range width for an ETH/USDC pool?"
      },
      {
        "title": "A Year of SEC Clarity -- Why Regulatory Backdrop Matters for Long-Term LP Commitment",
        "body": "SEC Chair Paul Atkins has spent a year working to clarify crypto's regulatory framework, and the direction appears to be toward structure rather than crackdowns -- a shift that matters to LPs more as a background condition than a day-to-day input. When rules are uncertain, the risk that a protocol gets shut down or a token gets delisted on short notice argues for keeping ranges shorter-duration and wider, so you can exit quickly without being caught out of range with a one-sided position. As clarity increases and that tail risk shrinks, it becomes more reasonable to commit to longer rebalancing cycles and narrower ranges -- more precision, fewer emergency adjustments. Think of regulatory stability as similar to market stability: more of it lets you act with more deliberateness instead of always keeping one hand on the exit.",
        "spark": "Has a regulatory headline ever actually changed how you structured or timed a liquidity position -- or do you treat regulation as background noise separate from your range decisions?"
      },
      {
        "title": "Tokenized Collectibles and Niche Pools -- Why Thin Liquidity Punishes Beginners Hardest",
        "body": "Tokenized Pok\u00e9mon card trading platforms are approaching record volumes, and while that is an interesting signal for the tokenization space broadly, it also points toward a category of pools -- niche or newly tokenized assets paired with ETH or a stablecoin -- where LP range management works very differently than on deep pairs. In a thin pool (one without much total liquidity), a single large trade can move price dramatically inside your range: your concentrated position is a larger fraction of the total liquidity, so you absorb more of the price impact per swap. That means your asset composition can shift from 50/50 to heavily one-sided much faster than it would in an ETH/USDC pool with millions in liquidity, often before you notice. The mechanics of range management are the same, but the feedback loop is compressed and less forgiving -- which is why learning on well-established, high-volume pairs first gives you time to understand the cause and effect before the stakes get higher.",
        "spark": "What signals would you use to evaluate whether a pool has enough liquidity depth to be worth entering as an LP -- and what would make you walk away from an otherwise attractive yield?"
      }
    ],
    "closing": "A calm week with modest gains is a good moment to audit your ranges while the market is not forcing your hand -- check whether your current positions are still centered where you intended, or whether the slow drift has already pushed you closer to one boundary than you realized. Bring your current pair and range setup to the group this week and let's talk through what the trend is doing to your composition."
  },
  {
    "id": "04-20-2026",
    "date": "April 20, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-1.4%"
      },
      {
        "label": "ETH",
        "value": "-2.0%"
      },
      {
        "label": "Volatility",
        "value": "Cautious, sideways"
      },
      {
        "label": "ETH Gas",
        "value": "~$2.50"
      }
    ],
    "intro": "Bitcoin is treading water near $75,000 and ETH is sitting around $2,291 -- both down slightly and neither breaking out nor breaking down. Macro tensions and a wave of crypto headlines are pulling in different directions, keeping traders cautious. For LPs, this kind of indecisive price action is a useful moment to review range placement: not so volatile that acting feels reckless, but uncertain enough that how wide you set your range deserves real thought.",
    "stories": [
      {
        "title": "Bitcoin's Fragile Hold Near $75K",
        "body": "Analysts describe BTC as sitting in a 'fragile equilibrium' near $75,000, propped up by nearly $1 billion in spot Bitcoin ETF inflows despite geopolitical tensions. The price is neither breaking out nor collapsing -- just hovering. For LPs, a range-bound market like this rewards tighter ranges: when price stays in a narrow band, concentrating your liquidity close to the current price means more of your capital is active and earning fees on every trade. The catch is that 'fragile' equilibriums break -- if BTC dropped to, say, $68,000, a tight range set at $73,000-$77,000 would go out of bounds entirely and earn nothing until price returned. The tradeoff is always fee capture now versus staying in range if the balance tips.",
        "spark": "If you were providing liquidity on a BTC/USDC pair right now, would you set a tight range near $75,000 to maximize fees, or widen it to stay in range through a potential breakdown -- and what single piece of information would change your mind?"
      },
      {
        "title": "The KelpDAO Exploit: Why Token Selection Is a Risk Decision",
        "body": "Attackers drained $292 million from KelpDAO by forging a cross-chain message -- a fake instruction sent across blockchain networks to trick a bridge into releasing funds. KelpDAO issues LRTs, or Liquid Restaking Tokens, which are tokens representing staked ETH earning multiple layers of yield. When the exploit hit, DeFi TVL (Total Value Locked, the total amount deposited across DeFi protocols) fell by $13 billion. If you hold an LRT or any yield-bearing token in an LP pair, a sudden exploit can cause that token to depeg -- meaning its price drifts sharply away from its expected value -- in minutes. Your range does not move with it; you end up holding almost entirely the crashed token at a fraction of the price you expected. Token selection is not just about yield potential; it is about what happens to your position if that token breaks.",
        "spark": "What signals would make you uncomfortable pairing a yield-bearing or restaking token with ETH in an LP position -- and is there a yield premium that would ever make that risk feel worth taking?"
      },
      {
        "title": "BitMine Owns 4% of All ETH -- What Concentrated Accumulation Means for Ranges",
        "body": "BitMine Immersion Technologies bought 101,627 ETH last week (roughly $235 million), pushing its total treasury to about 4.12% of ETH's entire circulating supply. Chairman Tom Lee says crypto winter is near its end. When a single entity controls a large fraction of a token's supply, it reduces how much is available for trading -- which can make price more reactive to even modest buy or sell pressure over time. For ETH LPs this is worth watching: higher volatility means price crosses your range more often, which creates more fee opportunities, but it also means you may need to rebalance more frequently. If Lee is right that ETH is heading higher, a range skewed above today's price -- for example, $2,400 to $3,000 rather than $2,000 to $2,600 -- would capture more fees during the climb.",
        "spark": "If you believed ETH was likely to drift upward over the next few weeks, how would you adjust your range -- would you shift it higher, widen it asymmetrically above current price, or leave it centered on today's level?"
      },
      {
        "title": "BIS Says Stablecoins Act Like ETFs -- Not Like Cash",
        "body": "The Bank for International Settlements (BIS) -- essentially the central bank for central banks -- published a report arguing that stablecoins behave more like exchange-traded funds than actual money, meaning their value can shift and they carry redemption risk under stress. Many LPs treat stablecoin pairs as low-risk because one side is expected to stay fixed at $1. But if a stablecoin loses its peg -- even briefly dropping to $0.97 -- your range was set with the assumption of one stable asset, and suddenly both sides are moving. Your position's asset composition shifts quickly, and if price exits your range you stop earning fees entirely while holding full exposure to the depegged token. The BIS warning is a reminder that 'stablecoin pair' does not mean 'no price risk.'",
        "spark": "If you are providing liquidity in a stablecoin pair like USDC/USDT, how wide would your range need to be to stay active through a minor depeg event -- and is there a width at which fees become too thin to justify the position?"
      },
      {
        "title": "Strategy Buys $2.5 Billion in Bitcoin -- What Institutional Blocks Do to Price",
        "body": "Strategy made its largest Bitcoin purchase in over 16 months, buying $2.54 billion worth of BTC last week alongside the ex-dividend date for its STRC preferred stock. Purchases this large do not just move price -- they temporarily thin out the order book (the list of open buy and sell orders sitting at various prices), which can cause short, sharp price spikes as the buy works through available supply. For BTC LPs, that kind of spike can push price through a narrow range quickly: you earn a burst of fees as trades cross your liquidity, then find yourself out of range on the other side before you can react. A wider range would have captured the entire move; a narrower one might have earned more per unit of liquidity but gone inactive immediately after.",
        "spark": "Has a sudden price spike ever pushed your LP position out of range faster than you could respond -- looking back, what range width would have kept you active through that move while still earning meaningful fees?"
      }
    ],
    "closing": "This week is a good reminder that managing LP ranges is not just about picking a price band -- it is about understanding the risks baked into every token you hold and every macro current pulling at prices. Bring your hardest range-setting question to the group this week."
  },
  {
    "id": "april-16-2026",
    "date": "April 16, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what\u2019s worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "+2.9%"
      },
      {
        "label": "ETH",
        "value": "+5.6%"
      },
      {
        "label": "Volatility",
        "value": "Spike then compress"
      },
      {
        "label": "ETH Gas",
        "value": "~$0.01"
      }
    ],
    "intro": "A geopolitical shock mid-week (Strait of Hormuz closure to ceasefire) created a classic volatility burst followed by a sharp directional move. For LPs, that\u2019s the week in a nutshell: wide swings, then a reset.",
    "stories": [
      {
        "title": "Volatility Spike, Then Whipsaw -- How Did Your Ranges Hold?",
        "body": "The Middle East ceasefire on April 7-8 triggered a fast 5-6% move up in ETH almost overnight, following a week of macro-driven suppression from energy price spikes and CPI coming in hot at 3.3%. If you were running tight ranges through the spike, you likely went out of range and missed the fee window. If you were running wider ranges anticipating macro uncertainty, this was a solid fee-generating week.",
        "spark": "What range widths are you running right now given the macro backdrop -- tighter for fees, or wider for resilience? Did anyone get caught out of range during the April 7 move?"
      },
      {
        "title": "Aave V4 Live + Gas at Record Lows -- Rebalancing Just Got Cheaper",
        "body": "Aave V4 launched on Ethereum Mainnet this week, and Ethereum gas fees are sitting at an all-time low of ~$0.01. For V3/V4 LPs, this matters practically: rebalancing positions, collecting fees, and adjusting ranges is effectively free right now compared to even 12 months ago. If you\u2019ve been avoiding frequent range adjustments because of gas costs, that friction is largely gone.",
        "spark": "Has cheap gas changed how often you\u2019re adjusting ranges? Or are you still managing positions the same way regardless?"
      },
      {
        "title": "Apollo Global Enters DeFi Lending -- What Institutional Liquidity Means for Pools",
        "body": "Apollo Global Management partnered with Morpho to provide on-chain lending liquidity, with rights to acquire 90 million MORPHO tokens. Separately, the $12.5 trillion global repo market is beginning to settle on Ethereum. As institutional capital flows into DeFi, it changes the liquidity landscape -- deeper pools, tighter spreads, and potentially lower fee yields in the most competitive pairs as more LPs compete for the same volume.",
        "spark": "Are you already seeing yield compression on major pairs like ETH/USDC? Is institutional liquidity pushing you toward niche pools or longer-tail pairs to find better returns?"
      },
      {
        "title": "SEC Unlocks DeFi Front-Ends -- More On-Chain Volume Coming",
        "body": "The SEC ruled on April 13 that DeFi user interface providers don\u2019t need to register as broker-dealers -- a major legal unlock that removes a key barrier for compliant DeFi products to go mainstream. More on-chain users and volume is ultimately good for LPs: more swaps = more fees. This follows the March SEC/CFTC joint framework that gave crypto assets a formal legal taxonomy for the first time.",
        "spark": "Do you factor regulatory clarity into which chains or protocols you LP on? Does this change your confidence in Ethereum-based pools specifically?"
      },
      {
        "title": "V4 Hooks Are Live -- The Next Frontier for LP Strategy",
        "body": "With Aave V4\u2019s launch reinforcing the Ethereum ecosystem, Uniswap V4\u2019s hook architecture is increasingly where LP strategy innovation is happening. Hooks allow pool creators to build custom logic -- dynamic fee tiers, auto-rebalancing, TWAP-based range adjustments -- directly into the pool. Early hook-enabled pools are beginning to emerge with meaningfully different risk/return profiles than standard V3 positions.",
        "spark": "Is anyone experimenting with V4 hook pools yet? What custom logic would actually change how you LP -- dynamic fees, auto-range shifting, something else?"
      }
    ],
    "closing": "What are you watching going into next week? Drop your current setups, pairs, and range thoughts in the group."
  }
];
