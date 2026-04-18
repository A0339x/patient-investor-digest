const digestData = {
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
  "intro": "Majors sold off together this week as a nine-figure bridge exploit reminded everyone that smart contract risk still prices into LP returns. BTC is trying to hold its seven-month breakout while ETH drifts lower, which is widening realized vol in the pair and rewarding tighter ranges -- if you can stomach the rebalance cadence.",
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
};
