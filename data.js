// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "4-18-2026",
    "date": "April 18, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
      {
        "label": "BTC",
        "value": "-2.2%"
      },
      {
        "label": "ETH",
        "value": "-3.1%"
      },
      {
        "label": "Volatility",
        "value": "Elevated, exploit-driven"
      },
      {
        "label": "ETH Gas",
        "value": "~$1.80"
      }
    ],
    "intro": "Majors sold off together on a nine-figure bridge exploit. BTC is holding its breakout while ETH drifts, widening realized vol and rewarding tighter ranges.",
    "stories": [
      {
        "title": "Kelp DAO rsETH bridge drained for ~$292M",
        "body": "A LayerZero-based bridge exploit drained roughly $292M in rsETH before Kelp's emergency multisig paused core contracts 46 minutes later. LSTs and LRTs typically trade as correlated-pair LPs (rsETH/ETH, wstETH/ETH), and a depeg cascade will blow through narrow ranges before you can react. Anyone running tight LRT ranges should check oracle assumptions and consider wider buffers until the peg re-anchors.",
        "spark": "Are you pulling LRT liquidity on headline risk, or widening ranges and pricing the tail into your fee expectations?"
      },
      {
        "title": "BTC cracks a seven-month downtrend",
        "body": "Bitcoin broke a seven-month ceiling this week with analysts pointing to $84K as the next target, even as today's tape shows a -2.2% pullback. For WBTC/ETH and WBTC/USDC LPs, a directional BTC regime after months of chop changes the calculus -- single-sided drift risk outweighs fee capture in narrow ranges. Expect more divergence trades between BTC and ETH pairs until ETH catches a bid of its own.",
        "spark": "Has the breakout changed how you're skewing WBTC/ETH ranges -- wider on the upside, or are you just sitting out the trend?"
      },
      {
        "title": "XRP goes live on Solana via wrapped wXRP",
        "body": "Over $1.2M of wrapped XRP has been minted on Solana, opening a new venue for XRP DeFi liquidity outside the XRPL and EVM wrappers. Early wrapped-asset pools tend to see fat spreads and thin depth, which means wide-range LPs can earn while the market finds price, but bridge risk is the hidden leg. Worth watching whether V4 hook-enabled pools on other chains try to capture this flow with custom fee curves.",
        "spark": "Would you seed a wXRP/SOL pool at launch pricing, or wait for a deeper book and tighter spreads before committing range?"
      },
      {
        "title": "RaveDAO pump-and-dump allegations hit CEX listings",
        "body": "ZachXBT flagged RAVE as a coordinated pump, prompting Binance and Bitget investigations and a $25K whistleblower bounty. Memecoin and low-float token pools are where concentrated LPs get adverse-selected hardest -- informed flow drains one side of the range before the headline breaks. If you're running V3 ranges on recently listed tokens, tighter JIT-style execution or hooks with dynamic fees are increasingly the only defensible setup.",
        "spark": "Do you still LP on fresh listings, and if so, what's your framework for sizing the rug/dump tail vs. the fee opportunity?"
      },
      {
        "title": "Q-Day chatter resurfaces the quantum risk to BTC",
        "body": "Decrypt's Q-Day explainer is recycling the long-tail thesis that quantum computers could eventually forge Bitcoin signatures. It's not a this-cycle risk, but it is a reminder that WBTC and bridged BTC wrappers depend on signature assumptions that may migrate, and any future post-quantum fork could fracture LP liquidity across variants. Worth filing under slow-moving structural risk rather than actionable today.",
        "spark": "How do you think about multi-year protocol risk when setting LP horizons -- is it in your model at all, or strictly a price-only game?"
      }
    ],
    "closing": "A quieter week on price, a louder week on risk -- which of these stories actually changes your positioning, and which are you ignoring?"
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
