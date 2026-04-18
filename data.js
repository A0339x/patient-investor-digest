// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    id: "april-16-2026",
    date: "April 16, 2026",
    title: "LP Mastermind\nMarket Update",
    subtitle: "What moved this week, what it means for your ranges, and what's worth talking about.",
    snapshot: [
      { label: "BTC",        value: "+2.9%" },
      { label: "ETH",        value: "+5.6%" },
      { label: "Volatility", value: "Spike then compress" },
      { label: "ETH Gas",    value: "~$0.01" }
    ],
    intro: "A geopolitical shock mid-week (Strait of Hormuz closure to ceasefire) created a classic volatility burst followed by a sharp directional move. For LPs, that's the week in a nutshell: wide swings, then a reset.",
    stories: [
      {
        title: "Volatility Spike, Then Whipsaw -- How Did Your Ranges Hold?",
        body:  "The Middle East ceasefire on April 7-8 triggered a fast 5-6% move up in ETH almost overnight, following a week of macro-driven suppression from energy price spikes and CPI coming in hot at 3.3%. If you were running tight ranges through the spike, you likely went out of range and missed the fee window. If you were running wider ranges anticipating macro uncertainty, this was a solid fee-generating week.",
        spark: "What range widths are you running right now given the macro backdrop -- tighter for fees, or wider for resilience? Did anyone get caught out of range during the April 7 move?"
      },
      {
        title: "Aave V4 Live + Gas at Record Lows -- Rebalancing Just Got Cheaper",
        body:  "Aave V4 launched on Ethereum Mainnet this week, and Ethereum gas fees are sitting at an all-time low of ~$0.01. For V3/V4 LPs, this matters practically: rebalancing positions, collecting fees, and adjusting ranges is effectively free right now compared to even 12 months ago. If you've been avoiding frequent range adjustments because of gas costs, that friction is largely gone.",
        spark: "Has cheap gas changed how often you're adjusting ranges? Or are you still managing positions the same way regardless?"
      },
      {
        title: "Apollo Global Enters DeFi Lending -- What Institutional Liquidity Means for Pools",
        body:  "Apollo Global Management partnered with Morpho to provide on-chain lending liquidity, with rights to acquire 90 million MORPHO tokens. Separately, the $12.5 trillion global repo market is beginning to settle on Ethereum. As institutional capital flows into DeFi, it changes the liquidity landscape -- deeper pools, tighter spreads, and potentially lower fee yields in the most competitive pairs as more LPs compete for the same volume.",
        spark: "Are you already seeing yield compression on major pairs like ETH/USDC? Is institutional liquidity pushing you toward niche pools or longer-tail pairs to find better returns?"
      },
      {
        title: "SEC Unlocks DeFi Front-Ends -- More On-Chain Volume Coming",
        body:  "The SEC ruled on April 13 that DeFi user interface providers don't need to register as broker-dealers -- a major legal unlock that removes a key barrier for compliant DeFi products to go mainstream. More on-chain users and volume is ultimately good for LPs: more swaps = more fees. This follows the March SEC/CFTC joint framework that gave crypto assets a formal legal taxonomy for the first time.",
        spark: "Do you factor regulatory clarity into which chains or protocols you LP on? Does this change your confidence in Ethereum-based pools specifically?"
      },
      {
        title: "V4 Hooks Are Live -- The Next Frontier for LP Strategy",
        body:  "With Aave V4's launch reinforcing the Ethereum ecosystem, Uniswap V4's hook architecture is increasingly where LP strategy innovation is happening. Hooks allow pool creators to build custom logic -- dynamic fee tiers, auto-rebalancing, TWAP-based range adjustments -- directly into the pool. Early hook-enabled pools are beginning to emerge with meaningfully different risk/return profiles than standard V3 positions.",
        spark: "Is anyone experimenting with V4 hook pools yet? What custom logic would actually change how you LP -- dynamic fees, auto-range shifting, something else?"
      }
    ],
    closing: "What are you watching going into next week? Drop your current setups, pairs, and range thoughts in the group."
  }
];
