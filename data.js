// data.js — Patient Investor Digest
// Scheduled task prepends new issues to the TOP of this array automatically.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
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
    "intro": "The Fed held rates steady this week but with an unusually deep internal split -- neither a confident hold nor a pivot signal -- leaving markets in a wait-and-see mood. BTC and ETH moved less than 1% in opposite directions, making it one of the quieter weeks in recent memory. For LPs, low-volatility stretches like this are when your original range setup does most of the work, and the discipline to do nothing is often the right call.",
    "stories": [
      {
        "title": "BTC Trapped Below Resistance -- What a Rangebound Market Means for Your Setup",
        "body": "Analysts described Bitcoin as 'trapped below' a key resistance level this week, with ETF outflows continuing for a third straight day as the Fed's mixed signals kept buyers cautious. In LP terms, a rangebound market is one where price bounces inside a band rather than trending in one direction. That environment rewards wider ranges that capture the back-and-forth movement -- if your BTC-paired range is too narrow and BTC finally breaks out to, say, $83,000, you go out of range instantly and earn nothing while price runs. When a market looks stuck, widening your range slightly reduces out-of-range risk even if it dilutes how concentrated your fees are. The tradeoff is always fee intensity versus staying power, and quiet, choppy markets tend to favor staying power.",
        "spark": "If you believed BTC would stay between $72,000 and $80,000 for the next two weeks, how would you set your range differently than if you thought a breakout was coming? What specifically changes, and why?"
      },
      {
        "title": "ETH and BTC Drift Apart -- How Divergence Shifts Your Asset Mix",
        "body": "BTC gained 0.5% this week while ETH fell 0.5% -- a small but real divergence between the two largest crypto assets. For LPs in any pool pairing these two assets, divergence matters because your position's composition shifts automatically as prices move. When ETH falls relative to BTC, the pool rebalances mechanically -- selling ETH as it gets cheaper and accumulating BTC as it gets more expensive. This is not a bug; it is the core mechanic of how a Uniswap V3 range position works: the pool always prices at the live market rate, so your mix of the two assets drifts with price. The key question is not whether that drift happens -- it always will -- but whether the fees you earn over time compensate for the shift in your holdings.",
        "spark": "If ETH kept falling relative to BTC over the next month, what would happen to the ratio of ETH to BTC inside your pool position? At what point might it make sense to close or rebalance the position?"
      },
      {
        "title": "A New Yield Exchange on Solana -- Knowing What You Are Competing Against",
        "body": "Exponent, a Solana-based yield exchange (a protocol that lets users trade or lock in future yield at a fixed rate rather than accepting variable returns), raised a $5 million seed round this week led by Multicoin Capital. This matters for LPs because fee income from a Uniswap position is always variable -- some weeks the pool is busy and fees are high, other weeks it is quiet and fees are low. Fixed-yield products are an alternative to LP positions, and understanding the rates they offer helps you benchmark whether your range is actually earning a competitive return. If a fixed-yield product offers 8% annually and your LP fees have been running at 4% annualized, that gap is worth knowing -- even if LP positions carry upside that fixed products do not.",
        "spark": "How do you currently estimate whether the fees your range is earning are good enough? What would you compare them against to decide if a different strategy might perform better?"
      },
      {
        "title": "AI Agents Getting Their Own Payment Cards -- What That Could Mean for Stablecoin Pools",
        "body": "A Tether-backed startup called Oobit announced 'Agent Cards' this week -- Visa-supported corporate expense cards that let AI agents spend USDT autonomously without a human approving each transaction. If AI agent spending scales up on-chain, it creates a new source of transaction volume in stablecoin pairs like USDC/USDT, and volume is the direct driver of fees in those pools. Stablecoin-to-stablecoin pools (sometimes called stable pairs) operate in very tight price ranges -- typically between $0.999 and $1.001 -- and earn fees almost entirely from volume rather than from price swings. More autonomous agent activity flowing through these pools could meaningfully lift fee income for LPs sitting in those tight, capital-efficient ranges.",
        "spark": "Stable pairs earn fees almost entirely from volume rather than price movement. How does that change the way you would think about setting and maintaining a range in a USDC/USDT pool compared to an ETH/USDC pool?"
      },
      {
        "title": "Big Tech AI Earnings Beat -- When Risk-On Sentiment Reaches Crypto",
        "body": "Google and Microsoft both crushed Q1 earnings this week, with Google Cloud revenue up 63% and Microsoft's AI business hitting a $37 billion annual run rate. Strong results from tech giants tend to shift market sentiment toward 'risk on' -- investors grow more willing to hold volatile assets, which historically pulls crypto markets higher. For LPs, a sentiment shift toward risk-on can mean sharper price moves in ETH and altcoin pools as capital flows in. If you have been sitting in a narrow range during a quiet week and sentiment turns quickly, it is worth checking whether your range still fits -- a rapid move from, say, ETH at $2,260 to $2,600 could push you out of a tight range, leaving your position heavily concentrated in USDC while ETH keeps running.",
        "spark": "If positive tech sentiment drove ETH from $2,260 to $2,600 over the next two weeks, what would happen to a position with a range of $2,100 to $2,500? Walk through what your asset composition looks like at $2,400 versus $2,501."
      }
    ],
    "closing": "Quiet weeks are a good time to review whether your ranges still reflect your actual outlook -- not just your outlook from when you set them. What are you watching heading into next week?"
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
    "intro": "Both BTC and ETH slid into the weekend, but ETH fell roughly twice as hard as BTC -- a reminder that the two assets do not always move in lockstep. For LPs holding ETH-paired positions, that gap reshapes your asset composition: your pool now holds more ETH and less of the paired asset. Institutional signals are mixed -- some big buyers are pausing while others are just getting started -- so it is worth checking where your ranges sit before making aggressive adjustments.",
    "stories": [
      {
        "title": "ETH Drops Faster Than BTC -- What That Gap Means for Your Ranges",
        "body": "ETH fell -2.7% today versus BTC's -1.3%, meaning ETH underperformed by more than a full percentage point in a single session. For an LP holding an ETH/USDC range centered around, say, $2,300-$2,600, price pressing toward the lower boundary means your pool is now holding proportionally more ETH and less USDC -- this tilt is called range skew, and it happens whenever price drifts toward one edge of your active range. A tighter range like $2,250-$2,350 may already be fully out of range and earning zero fees, while a wider range like $2,000-$2,800 would still be active and capturing every swap. Whether tighter or wider is better depends on your fee goals and how much you want to monitor the position.",
        "spark": "If ETH continued sliding to $2,100 and your range bottom was $2,200, you would be out of range and holding 100% ETH with no fee income. What would be your next move -- wait for a bounce back inside your range, reset the range lower, or widen it to recapture active fee earning?"
      },
      {
        "title": "Bernstein Calls a 'Structurally Longer Bull Cycle' -- Should You Skew Your Range Higher?",
        "body": "Bernstein published a note arguing that new institutional on-ramps and sustained capital flows point to asymmetric upside for crypto broadly. For LPs, a directional call like this raises a real positioning question: a centered range earns fees symmetrically above and below current price, while a skewed range -- set mostly above the current price -- captures more appreciation if the bullish forecast plays out but earns fewer fees if price stays flat or dips. A skewed range is essentially a directional bet layered on top of your fee income. The trade-off is that skewing upward costs you fee revenue during sideways or down markets, so the bet needs to be right often enough to make up the difference.",
        "spark": "How much conviction would you need in a bull case before you would shift your range from centered to skewed upward -- and how would you track whether that choice actually outperformed just staying centered?"
      },
      {
        "title": "BitMine Crosses 5 Million ETH -- Big Buyers and What They Mean for Your Range Floor",
        "body": "BitMine Immersion Technologies, which runs a corporate ETH treasury strategy, crossed 5 million ETH with its largest single purchase so far in 2026. Large, persistent buyers create what traders call a price floor -- a level where consistent demand tends to absorb selling pressure. For LPs on ETH pairs, a credible price floor can inform where you place your range's lower boundary: if you believe $2,000 is heavily supported by institutional buying, placing your range bottom near $2,100 rather than $1,700 lets you concentrate your liquidity over a narrower band, which earns proportionally more fees per dollar deployed while price stays inside that band. Concentrated liquidity is the core trade-off in Uniswap V3-style pools -- a narrower range earns more when price stays inside it, but goes inactive faster if price moves outside it.",
        "spark": "If a single corporate buyer holds 5 million ETH and is still accumulating, does that change where you feel comfortable setting your lower range boundary on an ETH/USDC pair -- or does the uncertainty around when they might stop buying make you keep the range wider anyway?"
      },
      {
        "title": "Gemini Launches AI Trading Bots -- What Automated Participants Mean for LP Fee Capture",
        "body": "Gemini announced 'Agentic Trading,' letting AI bots directly manage exchange accounts, billing it as the first such tool on a regulated US exchange. For liquidity providers, automated participants matter because of a practice called JIT liquidity -- short for just-in-time liquidity -- where bots detect a large incoming trade, instantly deposit a very narrow range to capture most of its fees, then withdraw immediately after the trade clears. JIT bots effectively jump ahead of passive LPs on high-value swaps. This is most pronounced in deep, high-volume pools; newer or lower-liquidity pools are less attractive to bots and may offer passive LPs a larger share of fees on each trade.",
        "spark": "If JIT bots are skimming fee revenue from large trades in the most popular pools, does that shift which pools you want to provide liquidity in -- or does the sheer volume in those pools still make them worthwhile for passive LPs?"
      },
      {
        "title": "Strategy's BTC Buying Pace Falls 91% -- What a Pause in a Major Buyer Means for Range Positioning",
        "body": "Strategy dramatically slowed its bitcoin purchases -- down 91% from its recent pace -- after leaning heavily on its STRC preferred stock vehicle to fund prior buys. Strategy's consistent accumulation has been a steady source of upward price pressure on BTC, so any pause in that buying engine matters for range positioning. Reduced buying pressure does not mean price drops, but it does mean one reliable driver of directional momentum is quieter for now. For LPs in BTC pairs, a sideways market is actually a decent environment for a well-placed active range -- price stays inside the range longer and accumulates more fees -- but only if the range is wide enough to survive the drifting without going out of range and earning nothing.",
        "spark": "If a key buyer steps back and BTC trades sideways for several weeks, would you prefer a wide range that earns modest fees continuously, or a tighter range you plan to actively rebalance -- and what does your answer reveal about how much time you actually want to spend managing positions?"
      }
    ],
    "closing": "This week is a useful reminder that macro narratives -- institutional buyers, AI bots, analyst forecasts -- all eventually show up as price and volatility, which is the environment your ranges live in. Take a few minutes to check where your current positions sit relative to today's prices and ask yourself: is my range still earning, and does its shape still match my outlook for the week ahead?"
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
    "intro": "Both BTC and ETH are drifting lower this week, with ETH taking the harder hit at -2.4% in 24 hours. For LPs, a slow slide like this is often more disruptive than a sharp move -- price creeps toward the edge of your range without triggering the kind of fee volume that would reward you for staying put. The macro backdrop remains uncertain, which means ranges set during calmer conditions may need a second look.",
    "stories": [
      {
        "title": "Bitcoin Stalls Below $80K -- What Resistance Means for Your Range",
        "body": "BTC is sitting at $78,516 and analysts are flagging $80,000 as a heavily contested resistance zone -- a price level where a lot of sellers are expected to show up and push back against further gains. Whales (large holders) and ETF investors are buying into the dip, but profit-taking pressure is real. For LPs in a BTC/USDC or WBTC/ETH pool, a reversal at $80K would push price back down through whatever range you've set, flipping your asset mix back toward the stable side. If you've been holding a range centered above current price hoping to capture upside, that skewed positioning now carries more risk of being left fully in the appreciating asset if BTC stalls and retreats.",
        "spark": "If BTC tests $80K and bounces back to $76K, how does that round trip change the asset composition inside a range set between $76,000 and $82,000 -- and would you rather be narrower or wider going into a known resistance zone like this?"
      },
      {
        "title": "JPMorgan Flags DeFi Exploits and Shrinking Pool Liquidity",
        "body": "JPMorgan published a note this week warning that persistent hacks in DeFi (decentralized finance -- on-chain protocols for trading, lending, and providing liquidity) are pushing investors toward USDT and out of liquidity pools during stress events. TVL, or Total Value Locked, is the total dollar amount deposited across DeFi protocols -- when it stagnates or falls, it means LPs are pulling capital. For you as an LP, a drop in TVL in your pool matters in two ways: thinner liquidity means price moves more sharply on each trade (which can knock you out of range faster), and fewer LPs competing means fees are split fewer ways, but also that the pool becomes less attractive to traders who rely on tight spreads.",
        "spark": "If an exploit in a nearby pool causes a wave of LP withdrawals, and your pool's TVL drops by 40% while you stay put, what happens to your share of fees -- and does that change how you think about which pools carry hidden concentration risk?"
      },
      {
        "title": "Tether Freezes $344 Million in USDT -- What a Stablecoin Wobble Costs LPs",
        "body": "Tether coordinated with US law enforcement to freeze $344 million in USDT on the Tron blockchain, one of the largest freezes on record. While USDT itself held its $1 peg during this event, news like this can briefly cause USDT to trade at $0.998 or $0.997 -- what's called a depeg, when a stablecoin's price drifts away from its intended $1 value. If you're providing liquidity in an ETH/USDT pool and USDT depegs even slightly, the price ratio inside your pool shifts as if ETH moved -- which can push you out of range without ETH itself going anywhere. This is a reminder that in stablecoin-paired pools, your range isn't just exposed to the volatile asset; it's also exposed to the stability assumptions baked into the other side.",
        "spark": "If USDT briefly trades at $0.997 while ETH holds steady at $2,300, what happens to the price ratio in your ETH/USDT pool -- and does knowing this change how you compare USDT-paired pools against USDC-paired ones?"
      },
      {
        "title": "Microsoft-Backed Project Builds on Base -- More Volume Could Mean More Fees",
        "body": "Space and Time, a blockchain data infrastructure company backed by Microsoft, is rolling out tools for developers building applications on Base -- Coinbase's Layer 2 network (a faster, cheaper blockchain that settles transactions on Ethereum). More developer tooling on Base typically attracts more apps, more users, and more swap volume flowing through Base's liquidity pools. Higher swap volume is generally good for LPs: more trades mean more fees collected. But a surge in activity also tends to come with price volatility, and a narrow range that captures more fees per dollar deployed can go out of range quickly when new activity drives bigger price swings.",
        "spark": "If swap volume in a pool you're in doubles over the next month due to new Base app activity, would you rather hold a narrower range to maximize fee capture or widen your range to stay in play through the volatility -- and what would help you decide which tradeoff is worth it for your situation?"
      }
    ],
    "closing": "This week's price action is a useful reminder that quiet markets still have moving parts -- resistance levels, TVL shifts, and stablecoin assumptions all affect your ranges even when nothing feels dramatic. Come ready to share where your current ranges sit relative to these price levels and whether the last week tested them at all."
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
