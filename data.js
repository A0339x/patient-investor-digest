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
        "value": "-0.4%"
      },
      {
        "label": "ETH",
        "value": "-1.4%"
      },
      {
        "label": "Volatility",
        "value": "Low, muted drift"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.20"
      }
    ],
    "intro": "Both BTC and ETH dipped modestly over the last 24 hours, with ETH underperforming BTC -- a pattern that often signals risk-off sentiment among crypto traders. For LPs, quiet price action like this tends to mean steady fee collection inside active ranges, but it also means less urgency to rebalance. The more interesting story this week is what happened at the edges: a major exploit, a token pump, and BTC quietly pushing through a level it has not cleared in seven months.",
    "stories": [
      {
        "title": "BTC Breaks a Seven-Month Ceiling -- What That Means for Your Range Setup",
        "body": "Bitcoin just cleared a price level it had been stuck below since last September, with prediction markets now pointing toward $84,000 as a near-term target. When an asset breaks through a multi-month resistance level -- a price ceiling where sellers have repeatedly shown up -- it often signals a shift in momentum that can sustain a directional move. For LPs in BTC-paired pools, a centered range (equal distance above and below current price) captures fees well in choppy markets, but a skewed range -- one set asymmetrically higher, say $76,000 to $90,000 instead of $68,000 to $84,000 -- lets you capture more appreciation if the breakout holds. The tradeoff is that a skewed-high range goes inactive faster if price reverses, so you stop earning fees until you rebalance.",
        "spark": "If you believed BTC had a 60% chance of reaching $84,000 and a 40% chance of falling back to $68,000, how would you think about where to place the boundaries of your range -- and how wide would you make it?"
      },
      {
        "title": "The Kelp DAO Exploit: What 'Oracle Depeg' Risk Looks Like in Practice",
        "body": "Kelp DAO's rsETH -- a liquid restaking token (LRT), meaning a token that represents staked ETH earning additional yield -- was drained of roughly $292 million through a bridge exploit before the protocol could freeze its contracts. An oracle is the price feed a DEX uses to value an asset; when a token is exploited or manipulated, its oracle price can briefly detach from its real value, a situation called an oracle depeg. If you were providing liquidity in an rsETH/ETH pool at the time, your range would have been pricing rsETH as if it were still worth close to 1 ETH -- meaning you could have been selling 'real' ETH for an increasingly worthless token. This is a category of risk separate from normal price movement: it is protocol failure, not just volatility.",
        "spark": "How would you evaluate whether the extra yield from an LRT pair -- compared to a plain ETH/USDC pool -- is worth the additional layer of smart contract and peg risk you are taking on?"
      },
      {
        "title": "RaveDAO Pump-and-Dump Allegations: How Price Spikes Change Your Position Composition",
        "body": "Onchain investigator ZachXBT alleged that the RaveDAO team orchestrated a pump-and-dump in the RAVE token, a scheme where insiders drive the price up sharply before selling into the spike, leaving buyers holding a rapidly falling asset. For LPs in a pool containing RAVE, that price spike would have changed the composition of their position in a specific way: as RAVE's price shot up, the pool's automated math would have sold your RAVE and bought the paired asset (say, ETH or USDC) to keep the ratio balanced -- so when the price collapsed, you would have been left holding mostly the paired asset with very little RAVE remaining. In manipulated markets, this means LPs can end up on the wrong side of a coordinated move without any individual bad decision on their part.",
        "spark": "What signals -- in a token's trading history, liquidity depth, or team transparency -- might prompt you to avoid providing liquidity in a pool before you have enough data to assess manipulation risk?"
      },
      {
        "title": "Wrapped XRP Arrives on Solana: Bridged Assets Carry a Hidden Peg Risk",
        "body": "Over $1.2 million in wrapped XRP (wXRP) has been minted on Solana, expanding XRP's availability in DeFi pools on that chain. A wrapped token is a representation of an asset from one blockchain issued on another -- it is only as reliable as the bridge that created it. For LPs, providing liquidity in a wXRP pool means you are not just exposed to XRP's price moves; you are also exposed to the risk that the bridge holding the underlying XRP is exploited or paused, causing wXRP to trade below its 1:1 peg with real XRP. This week's Kelp DAO exploit is a live example of what that looks like. When evaluating wrapped-asset pairs, the bridge's security track record and the size of its insurance or backstop fund are worth researching before you commit capital.",
        "spark": "If a wrapped token briefly trades at a 5% discount to the asset it represents, how does that affect the value of your LP position -- and does a wider range help or hurt you in that scenario?"
      },
      {
        "title": "Staking vs. Active Range Management: A Frame for Thinking About Your Time",
        "body": "Zac Prince of Galaxy's retail platform made the case this week that retail investors are better served by staking than by prediction markets, arguing that long-term compounding beats short-term speculation for most people. The same tension applies to LP range management: a very tight range captures the most fees per dollar when price stays inside it, but it requires frequent rebalancing -- repositioning your range when price moves out of it -- to stay active. A wider range captures fewer fees per dollar but stays active longer with less attention. Neither approach is universally better; the right choice depends on how much time you can actually dedicate to monitoring your positions and how much you trust your read on near-term price direction.",
        "spark": "Given the hours per week you currently spend on your LP positions, what range width feels like the right fit -- and how would you know if you were rebalancing too often or not often enough?"
      }
    ],
    "closing": "This week had a bit of everything: a clean breakout in BTC, a major exploit, and a reminder that not all yield is created equal. As you review your own ranges, the key question is whether the assets you are providing liquidity in have the depth, transparency, and stability that match the attention you are able to give them."
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
