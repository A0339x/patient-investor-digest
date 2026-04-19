// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "04-21-2026",
    "date": "April 21, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-0.6%"
      },
      {
        "label": "ETH",
        "value": "-2.0%"
      },
      {
        "label": "Volatility",
        "value": "Moderate -- ETH lagging BTC"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.20"
      }
    ],
    "intro": "Bitcoin broke above a seven-month resistance level this week while ETH drifted lower, widening the gap between the two largest assets. That divergence means LPs are having very different experiences depending on which pairs they hold -- some BTC-paired ranges are running out of bounds to the upside while ETH-paired ranges are testing their lower edges. A major exploit in a liquid restaking token pool this week was also a sharp reminder that not all near-peg pairs carry the same risk profile.",
    "stories": [
      {
        "title": "A $292 Million Lesson in LRT Pool Risk",
        "body": "Kelp DAO's rsETH -- a liquid restaking token (LRT), meaning an asset that represents ETH deposited into restaking protocols and is designed to trade near 1:1 with ETH -- was drained of roughly $292 million via a cross-chain bridge exploit before emergency contracts were frozen. For LPs in rsETH/ETH pools, this triggered a rapid oracle depeg: the price feed the pool relies on showed rsETH trading far below its expected ETH parity, and the pool's automated math rebalanced positions toward the cheaper, falling asset. This is the hidden asymmetry in LRT pairs -- a tight range can look safe and fee-efficient for months, then a single exploit event pushes price out of range instantly while also degrading the value of the asset you now hold more of. Providing liquidity in any paired asset that depends on a separate protocol's security means you are taking on layered risk beyond ordinary price movement.",
        "spark": "If you were providing liquidity in an rsETH/ETH pool with a tight range around the 1:1 peg, what signals could you monitor to detect a depeg early -- and at what point would you want to exit before the pool's rebalancing leaves you holding mostly the falling asset?"
      },
      {
        "title": "BTC Breaks a Seven-Month Ceiling -- Now What?",
        "body": "Bitcoin cracked above a major resistance level this week, with prediction markets pointing toward $84,000 as the next target. For LPs in BTC-paired pools, a sharp breakout creates an immediate problem: if BTC moves above your upper range boundary, you are fully converted into the weaker asset (like USDC) and earning zero fees while price continues higher. If you had set a skewed range -- meaning your range extends further above the current price than below it -- you would have kept earning fees through more of this move. The decision now is whether to reset your range higher and pay gas to rebalance, or hold and wait for a pullback that brings price back into your existing range.",
        "spark": "If BTC is at $75,668 and your range was $68,000 to $74,000 -- now fully out of range -- what information would you want before deciding to chase the range higher versus waiting for a pullback, and how does the cost of rebalancing factor into that math?"
      },
      {
        "title": "The RAVE Pump-and-Dump: What LP Mechanics Look Like During Manipulation",
        "body": "ZachXBT alleged a coordinated pump-and-dump in the RAVE token this week, prompting investigations from major exchanges. From an LP perspective, the mechanics are instructive: as RAVE price spiked, the pool's automated rebalancing sold RAVE into the rally and accumulated the paired asset, generating meaningful fees in the process. Then as price collapsed, the pool automatically bought RAVE back at lower prices, leaving LPs holding more of the manipulated token than they started with -- at a lower average value. Whether the fees collected during the spike outweigh the shift in asset composition depends heavily on how wide your range was and how long the spike lasted before reversing.",
        "spark": "Knowing that an LP position tends to accumulate more of whichever asset falls in price, how would you weigh the higher fee potential of a newer, lower-cap token pool against the risk of ending up overexposed to a token that dumps -- compared to a deep, established pool like ETH/USDC?"
      },
      {
        "title": "ETH Drops 2% While BTC Holds -- What Your Pairing Has to Do With It",
        "body": "ETH fell about 2% over the past 24 hours while BTC slipped only 0.6%, a meaningful divergence between the two. For LPs in ETH/USDC pools, this move is felt as a straightforward downward price shift -- if ETH falls below your lower range boundary (say, $2,300 if that is where your range starts), you are fully converted into USDC and earning nothing until price recovers. For LPs in ETH/BTC pools, the same ETH weakness shows up differently: your position shifts toward ETH as it underperforms BTC, but both assets are still moving, making range management more complex. Your choice of pairing determines your baseline exposure -- ETH/USDC shifts between a volatile and a stable asset, while ETH/BTC shifts between two volatile assets that can diverge significantly.",
        "spark": "If you are long-term bullish on ETH but want to earn fees while you hold, would you prefer an ETH/USDC pool or an ETH/BTC pool right now -- and how does your view on whether ETH will outperform or underperform BTC factor into that choice?"
      }
    ],
    "closing": "The week raised a common thread across very different stories -- whether it is a depegging LRT, a BTC breakout, or a manipulated altcoin, each event tests whether your range was sized for the world you expected or the world that actually showed up. Bring your current positions to the next session and let's map out where your edges are."
  },
  {
    "id": "04-19-2026",
    "date": "April 19, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-0.6%"
      },
      {
        "label": "ETH",
        "value": "-1.6%"
      },
      {
        "label": "Volatility",
        "value": "Low, breakout watch"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.50"
      }
    ],
    "intro": "BTC slipped just 0.6% today while ETH dropped 1.6% -- a widening gap between the two that quietly shifts the asset mix in any range holding both. A $292 million bridge exploit and an alleged token manipulation scheme this week are good reminders that range management is not just about where price is, but about what happens to your position when price moves fast and without warning.",
    "stories": [
      {
        "title": "A $292M Exploit Shows What a Depeg Looks Like Inside Your Range",
        "body": "Kelp DAO's rsETH -- a liquid restaking token (LRT), meaning a token representing ETH deposited into multiple restaking protocols to earn extra yield on top of base staking rewards -- was drained of roughly $292 million through a LayerZero bridge attack, with the protocol freezing core contracts 46 minutes after the drain. For LPs in an rsETH/ETH pool, that 46-minute window illustrates exactly what a depeg (when an asset falls sharply below its expected 1:1 ratio with ETH) does to a concentrated range: arbitrage bots sweep the cheap rsETH out of the pool immediately, leaving your position holding nearly all rsETH -- the damaged asset -- while earning zero fees because price has blown past your lower bound. Tight ranges earn more fees when the peg holds, but give you almost no buffer when it breaks. This is why LRT pairs carry a different risk profile than plain ETH/USDC -- the downside is not gradual, it is a single event.",
        "spark": "If you were providing liquidity in an LRT/ETH pair, how wide would your range need to be to stay active through a sudden 30% depeg -- and is that wider range still worth the reduced fee capture during the long calm stretches in between?"
      },
      {
        "title": "Bitcoin Cracks a Seven-Month Ceiling -- Where Do You Aim Your Range Now?",
        "body": "Bitcoin pushed through a resistance level it had failed to clear for seven months, with prediction markets now pointing toward $84,000 as the next target. For LPs in BTC pairs, this tests a core setup decision: if your range is centered around $75,000 and BTC runs to $84,000, your position drifts toward the upper edge, shifts to holding mostly your paired stablecoin, and eventually exits the range entirely -- earning zero fees above your upper bound while also missing the price appreciation. A range skewed upward, say $77,000 to $92,000, earns fewer fees while price is still near the bottom but stays active through more of the move and lets you hold more BTC at the start. The tradeoff is real -- there is no setup that wins everywhere.",
        "spark": "When price pushes through a major resistance level with momentum behind it, is it better to recenter your range and chase the move, widen it to stay active longer, or let the position go out of range and reset on a pullback -- and what would make your answer different depending on the pair?"
      },
      {
        "title": "The RAVE Pump-and-Dump: A Frame-by-Frame Look at Range Mechanics",
        "body": "Onchain investigator ZachXBT alleged that the RaveDAO team orchestrated a pump-and-dump on RAVE token -- artificially inflating price and selling into retail buyers -- while Binance and Bitget opened investigations and ZachXBT offered a $25,000 whistleblower bounty. For LPs in a RAVE/USDC pool during a pump, the mechanics are important to understand: as price rockets upward through your range, your position continuously sells RAVE and accumulates USDC, so by the time the pump peaks you are holding mostly USDC. When the dump crashes price back down through your range, your position buys RAVE back at lower prices with that USDC -- you end up with more RAVE at a lower average price than you started with, and the fees collected during the pump rarely cover that round-trip loss on the asset side.",
        "spark": "High-volatility tokens generate high fees but also create the fastest exits from your range. How would you evaluate whether the fee upside in a volatile or lower-cap token is actually worth the price exposure risk on the downside?"
      },
      {
        "title": "A Judge Rules a Memecoin Is Not a Security -- What That Signals for LP Pool Depth",
        "body": "A federal judge ruled that Caitlyn Jenner's JENNER memecoin is not a security in a class action lawsuit, a legal distinction that matters for how these tokens can be traded and listed. For LPs, the more practical takeaway is about pool depth: memecoin pools tend to be thin, meaning the total dollar value of assets deposited is small. In a thin pool, even a medium-sized trade moves price significantly -- which means a single large swap can push price through your entire range in one transaction. Thin pools are also where JIT liquidity (just-in-time liquidity, where bots add funds right before a large trade and remove them immediately after to capture most of the fee) leaves passive LPs earning far less than the raw trading volume would suggest.",
        "spark": "How does total pool depth -- the combined dollar value of all LPs in a pool -- affect how quickly one large trade can move price through your range, and does that factor into which pools you choose to provide liquidity in?"
      },
      {
        "title": "What Quantum Threat Headlines Actually Teach LPs About Tail Risk",
        "body": "Decrypt's Q-Day explainer revisited the concern that future quantum computers could eventually forge Bitcoin's digital signatures, allowing unauthorized transactions. This is not a near-term risk, but it is a useful frame for a broader LP principle: narrow ranges earn more fees per dollar when price stays put, but that fee math only works if nothing dramatic happens. A sudden shock -- a major security disclosure, a regulatory shift, a macro event -- can gap price well outside a tight range instantly. The practical implication is that running a narrow range is an implicit bet that conditions stay stable, and the longer your position sits open, the more opportunities there are for something unexpected to move price far outside your bounds.",
        "spark": "How do you weigh the higher fee capture of a narrow range against the risk that an unexpected news event gaps price outside it -- and does your answer change depending on how long you plan to leave the position open?"
      }
    ],
    "closing": "BTC cracking a seven-month ceiling while ETH lags and an LRT exploit plays out in the same week is a good moment to ask whether your ranges are built for the market you expect or the one that could actually show up. Bring your current setup to the group and let's see how it holds up."
  },
  {
    "id": "4-19-2026",
    "date": "April 19, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "+0.0%"
      },
      {
        "label": "ETH",
        "value": "-0.4%"
      },
      {
        "label": "Volatility",
        "value": "Elevated -- exploit shock meets BTC breakout"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.50"
      }
    ],
    "intro": "Bitcoin quietly broke a seven-month price ceiling this week while ETH drifted slightly lower -- a divergence that silently widens impermanent loss for anyone holding both assets inside a single range. At the same time, a $292 million exploit in the liquid restaking space reminded LPs that assets can reprice violently and without warning, turning a carefully set range into a one-sided position in under an hour. Use this week as a case study, not just a market update.",
    "stories": [
      {
        "title": "The $292M Kelp DAO Exploit -- What an LRT Depeg Looks Like in Real Time",
        "body": "Kelp DAO's rsETH -- a liquid restaking token (LRT), meaning a token representing ETH you have deposited into a third-party staking protocol to earn extra yield -- was drained of roughly $292 million through a LayerZero bridge attack. The protocol's emergency pause came 46 minutes after the drain. For any LP holding an ETH/rsETH range, that window would have been catastrophic: as rsETH lost its peg (meaning its market price fell sharply below its expected 1:1 ratio with ETH), arbitrage bots would have swept all the cheap rsETH out of the pool, leaving LPs holding only rsETH at a steep loss. This is an oracle depeg event -- when one asset in your pair breaks from its expected value, your entire range fills up with the now-damaged token before you can react.",
        "spark": "If you were running an ETH/rsETH position and saw exploit news hit, how much of the damage do you think would already be done by the time you could close the position -- and does that change how you think about LRT pairs in the first place?"
      },
      {
        "title": "Bitcoin Breaks a Seven-Month Ceiling -- How Do You Aim a Range at a Breakout?",
        "body": "After holding below resistance since last September, BTC pushed through this week, and prediction markets are pointing toward $84,000 next. For LPs in BTC-based pairs, this is the moment a skewed range earns its keep -- a range set above current price rather than centered on it stays active longer as price climbs, while a centered range like $74,000--$78,000 earns fees right now but gets left behind if BTC runs to $84K and exits the range entirely. The tradeoff is real: a skewed range like $76,000--$90,000 earns fewer fees while price is still at the bottom, but it captures the appreciation and keeps collecting fees all the way up. Neither choice is wrong; the right answer depends on how confident you are in the breakout holding.",
        "spark": "When you see a potential breakout forming, how do you weigh the certain fee income from a tight centered range against the longer active window of a skewed range -- and what signal would make you commit to one over the other?"
      },
      {
        "title": "RaveDAO's Alleged Pump-and-Dump -- A Frame-by-Frame Look at How a Spike Wrecks an LP",
        "body": "Onchain investigator ZachXBT alleged that RAVE token was pumped in a coordinated scheme, with Binance and Bitget opening investigations. For any LP in a RAVE pair during the spike, here is exactly what happened: as RAVE's price shot up, arbitrageurs bought all the underpriced RAVE out of the liquidity pool, leaving LPs holding only the other asset (say, USDC). When RAVE then crashed, those LPs watched a token they no longer held fall -- this is impermanent loss (IL -- the opportunity cost of holding a position in a pool versus simply holding both tokens in your wallet) at its most extreme, where a violent move followed by a reversal leaves you worse off than doing nothing. Concentrated ranges in tight bands amplify this effect because there is no buffer outside the range to slow the drain.",
        "spark": "Before you provide liquidity in a newer or lower-cap token pair, what signals would you look for to screen out potential pump-and-dump candidates -- and would any amount of fee APR make a sketchy pair worth it?"
      },
      {
        "title": "BTC Up, ETH Flat -- What Divergence Between Your Pair's Assets Quietly Costs You",
        "body": "This week BTC broke out while ETH barely moved, meaning the two assets are diverging. In any pool that pairs a BTC-correlated token with ETH, that spread directly increases impermanent loss, even if neither asset crashed. The logic is straightforward: IL grows whenever the price ratio between your two assets shifts from where it was when you opened the position, regardless of direction. If your range was sized around last week's BTC/ETH ratio and BTC has since outrun ETH by several percent, your position is already skewed -- you are holding more ETH and less BTC-exposure than you intended, and you may be earning fewer fees because the active price has drifted toward one edge of your range.",
        "spark": "If one asset in your pair is consistently trending stronger than the other over several weeks, at what point does the accumulated IL outweigh the fee income -- and how would you track that in practice?"
      },
      {
        "title": "Alcoa Sells Smelter to Bitcoin Miner NYDIG -- What Mining Expansion Signals for LP Range Targets",
        "body": "Alcoa is nearing a deal to sell a dormant New York industrial site to Bitcoin miner NYDIG as part of a broader push to bring US mining capacity online. For LPs, this matters in two indirect ways: large mining buildouts increase steady sell pressure on BTC, since miners sell a portion of rewards to cover operating costs, which can act as a ceiling on sharp price spikes. At the same time, committing significant capital to new mining operations signals that institutional players expect BTC prices to stay high enough to justify the investment -- a mild bullish signal for where long-term range targets might sit. It is a useful reminder that LP decisions do not happen in isolation; macro forces like mining economics shape the price ranges that actually matter for your positions.",
        "spark": "How do you factor in structural sell pressure -- like miner liquidations -- when setting the upper and lower bounds of a BTC range, or do you rely on price action alone?"
      }
    ],
    "closing": "This week handed us a breakout, an exploit, and a pump-and-dump all at once -- three very different flavors of LP risk. Pick the story that hit closest to home and share how it would have changed your last range decision."
  },
  {
    "id": "4-18-2026",
    "date": "April 21, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-2.2%"
      },
      {
        "label": "ETH",
        "value": "-3.2%"
      },
      {
        "label": "Volatility",
        "value": "Elevated, directional"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.20"
      }
    ],
    "intro": "BTC just cracked a 7-month downtrend ceiling even as spot pulled back 2% on the day, while ETH underperformed again on a relative basis. For concentrated LPs, that divergence plus a fresh $292M bridge exploit means range discipline and pair selection matter more than directional conviction this week.",
    "stories": [
      {
        "title": "Kelp rsETH Bridge Drained for ~$292M",
        "body": "A LayerZero-based exploit on Kelp DAO's rsETH bridge pulled roughly $292M before the emergency multisig paused core contracts 46 minutes later. rsETH and adjacent LRT pairs will see depeg volatility, thin books, and wide spreads across V3/V4 pools. Anyone running concentrated rsETH/ETH or rsETH/wstETH ranges should assume the peg anchor is temporarily unreliable and that JIT flow will dominate fee capture. Consider pulling liquidity or widening aggressively until redemption mechanics and backing are publicly reconciled.",
        "spark": "Are you exiting LRT pairs entirely after this, or widening ranges and pricing in a permanent risk premium on the fee tier?"
      },
      {
        "title": "BTC Breaks 7-Month Downtrend Despite Red Day",
        "body": "Decrypt flags BTC clearing a seven-month ceiling with $84K cited as the next magnet, even as spot printed -2.2% on the session. That pattern -- breakout on the weekly, chop on the daily -- is classic for whipsawing tight ranges on WBTC/ETH and WBTC/USDC V3 positions. If you're running sub-5% bands you're likely getting picked off on both sides of the breakout retest. Wider asymmetric ranges skewed upside, or a move to V4 hooks with dynamic fees, earn their keep in exactly this regime.",
        "spark": "Are you repositioning WBTC ranges for a $84K target, or staying neutral until the retest confirms?"
      },
      {
        "title": "ETH Underperformance Continues as XRP Lands on Solana",
        "body": "ETH fell 3.2% against a 2.2% BTC drop, and wXRP crossing $1.2M minted on Solana is another quiet signal that non-ETH L1 liquidity keeps fragmenting. For ETH-paired LPs, persistent relative weakness means ETH/USDC ranges need to account for continued grind lower on the numeraire, not mean reversion. Stablecoin-heavy allocations and tighter bands below spot are pulling more fees than symmetric ranges right now. V4 hooks that auto-rebalance toward the stable leg are worth a serious look if you're managing size.",
        "spark": "What ETH/stable ratio are you targeting in your ranges given the persistent underperformance vs BTC?"
      },
      {
        "title": "RaveDAO Pump Investigation Opens",
        "body": "Binance and Bitget opened probes into the RAVE token after ZachXBT alleged a coordinated pump-and-dump and put up a $25K whistleblower bounty. Expect forced delistings or trading halts, which cascade into CEX/DEX arbitrage gaps and sudden LP drawdowns on any V3 pool holding RAVE. This is the recurring tax on providing liquidity to low-float, celebrity-adjacent tokens -- fees look great until the exit liquidity disappears. Worth auditing your long tail positions for anything with similar launch fingerprints.",
        "spark": "What's your hard filter for avoiding pools like this -- float, insider concentration, listing venue, or something else?"
      },
      {
        "title": "Q-Day and the Long-Tail Risk to LP Collateral",
        "body": "Decrypt's Q-Day piece revisits the quantum threat to Bitcoin signatures, and while it's not a 2026 problem, it's a reminder that LP strategies sitting on multi-year WBTC exposure inherit the underlying cryptographic risk. Any bridge-wrapped BTC or long-dated LP NFT is effectively a bet that migration paths exist before the threat matures. Not actionable this quarter, but it belongs in the same mental bucket as bridge risk and oracle risk when you're sizing positions. The recent Kelp drain shows how fast a tail risk becomes a headline.",
        "spark": "Does quantum risk change how you think about multi-year LP lockups, or is it still too far out to price?"
      }
    ],
    "closing": "Bridge exploits and celebrity memecoin probes in the same week -- what's the one risk control you're tightening before next Monday's open?"
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
