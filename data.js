// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
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
