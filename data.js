// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "04-19-2026",
    "date": "April 19, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-0.3%"
      },
      {
        "label": "ETH",
        "value": "-1.3%"
      },
      {
        "label": "Volatility",
        "value": "Elevated, breakout watch"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.20"
      }
    ],
    "intro": "Bitcoin just cracked a seven-month resistance ceiling while ETH is lagging behind -- a split that widens bid-ask spreads and makes ranges harder to hold. For LPs, choppy breakout conditions are a stress test for how well your range is positioned relative to where price might go next. The stories below each carry a concrete lesson about what market structure does to your position.",
    "stories": [
      {
        "title": "A $292M Bridge Exploit Shows What a Depeg Looks Like Inside Your Range",
        "body": "Kelp DAO's rsETH -- a liquid restaking token (LRT), meaning a token representing ETH staked across multiple restaking protocols simultaneously -- was drained of roughly $292 million through a LayerZero bridge exploit, with the protocol freezing contracts about 46 minutes after the drain. For LPs in an rsETH/ETH pool, those 46 minutes illustrated exactly how a depeg (when an asset loses its expected 1:1 peg to ETH) interacts with a concentrated range. If your range was set for rsETH between $0.98 and $1.02 ETH and rsETH dropped to $0.70, price would have blown through your lower bound instantly, leaving your position holding nearly all rsETH -- the asset losing value -- while collecting zero fees. Tight ranges earn more fees in stable conditions but offer almost no buffer when the peg breaks.",
        "spark": "If you were providing liquidity in an LRT/ETH pair, how wide would your range need to be to stay active during a sudden 30% depeg event -- and is that width still worth the reduced fee capture during the calm stretches in between?"
      },
      {
        "title": "Bitcoin Breaks a Seven-Month Ceiling -- What Do You Do With Your Range Now?",
        "body": "Bitcoin crossed above a resistance level it had failed to break for seven months, with prediction markets now pricing a move toward $84,000. That kind of breakout creates a classic LP dilemma: if your range was centered at $75,000 and BTC pushes to $80,000, your position goes out of range on the upside and you stop earning fees -- but you also now hold mostly your stablecoin pair, meaning you missed the price appreciation above your upper bound. Shifting your range upward to chase the move captures more fees but risks a reversal. Widening the range keeps you earning fees through a bigger price swing but dilutes your fee-per-dollar because your liquidity is spread thinner across the range.",
        "spark": "When price breaks a key resistance level with momentum behind it, is it generally better to recenter your range and chase the move, or to let the position sit out of range and wait for a pullback before resetting -- and what would make you answer differently depending on the pair?"
      },
      {
        "title": "The RAVE Pump-and-Dump Is a Case Study in Fee Capture vs. Price Exposure",
        "body": "Onchain investigator ZachXBT alleged the RAVE token team orchestrated a pump-and-dump -- artificially inflating price and then selling into retail buyers -- while Binance and Bitget opened investigations and ZachXBT offered a $25,000 bounty for whistleblowers. Tokens experiencing artificial pumps generate enormous trading volume, and LPs in those pools can collect significant fees during the pump phase. But the dump that follows is fast and severe: if price drops 60% in minutes, a concentrated range exits immediately and you are left holding nearly all of the token that just collapsed in value. The fees collected during the pump rarely offset the drop in the asset you end up holding when price blows through your lower bound.",
        "spark": "High-volatility tokens generate high fees for LPs, but the same price swings that create fee opportunities also create rapid moves out of range. How would you think about evaluating whether the fee upside in a volatile token is worth the price exposure risk on the downside?"
      },
      {
        "title": "ETH Is Lagging BTC -- and That Gap Matters for Your Ranges",
        "body": "BTC is down 0.3% today while ETH is down 1.3% -- a small but meaningful divergence between two assets that usually move together. For LPs in ETH/USDC or ETH/BTC pools, this kind of drift is exactly what moves price across your range even when the broader market feels quiet. When ETH falls relative to BTC, your ETH/USDC pool price drops, your position shifts toward holding more ETH, and if the gap keeps widening you drift further from center. This is different from both assets falling together, which leaves your pair ratio roughly stable and your range position less affected.",
        "spark": "If ETH continues to underperform BTC over the next week, how would that change how you think about centering or widening your ETH/USDC range compared to a week where the two assets move in lockstep?"
      },
      {
        "title": "Strategy Moves to Semi-Monthly Bitcoin Yield Payments -- A Frame for Comparing LP Returns",
        "body": "Strategy (formerly MicroStrategy) is moving to semi-monthly dividend payments on its STRC preferred stock, which pays an 11.5% annualized yield backed by the company's Bitcoin treasury. This is a useful comparison point for LP thinking: STRC generates yield by leveraging a large BTC position and passing income to shareholders, while LP fees are generated by providing liquidity that other traders need to execute swaps. Both produce yield, but the risk profiles are very different -- STRC holders carry Strategy's corporate risk plus BTC price exposure, while LPs carry price movement within their range plus the risk of volume drying up in their pool.",
        "spark": "When you compare LP fee yield to other crypto yield products like yield-bearing preferred stock or lending protocols, what specific risks are you actually trading against each other -- and which of those risks feels hardest to predict?"
      }
    ],
    "closing": "This week's mix -- a tentative BTC breakout, ETH lagging, and a major exploit in the LRT space -- is a reminder that range management is not just about fee capture, it is about understanding what your position turns into when markets move fast. Bring your biggest open question to the group this week."
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
