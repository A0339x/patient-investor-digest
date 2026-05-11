---
type: reference
tags: [patient-investor-digest, lp, reference]
source: Instructions for making Digest.docx
---

# Patient Investor Digest — Variables Reference

The standing curriculum the digest exists to reinforce. Each issue should reference these by name in any article they actually relate to.

> *"Let's see how we could implement or modify the variables we're learning based on real-world activities."*

---

## TVL — Total Value Locked

The total dollars deposited into a liquidity pool. **Higher TVL = more stability.** Because APR is essentially a function of TVL and volume, a deep pool can absorb new inflows without the APR collapsing — it takes far more capital to "move the needle" against a $50M pool than a $500K one. TVL is the first safety filter.

- *Mental model:* $400K of inflow into a $500K pool flushes the APR. The same $400K into a $50M pool barely registers.

## Volume

24-hour buys and sells. **Volume relative to TVL is what determines pay.** When volume is higher than TVL, LPs typically earn more. The pool fee tier (0.03%, 0.05%, etc.) is the slice of volume distributed to liquidity providers.

## Average Volume (45-day)

The average daily volume across the trailing ~45 days — the **outlier detector**. Krystal only shows today's volume, which can mislead.

- **Average ≈ Daily** → stable, sticky APR. Best opportunity if TVL is also high.
- **Average > Daily** → volume likely climbing, APRs likely rising.
- **Average < Daily** → today is the outlier; volume will revert and APR will drop with it.

so when something happens in the market where volumes go up super super high, Krystal, which is the website that we use to find opportunities, will only show the daily volume. It'll calculate the APR based off of that. Because we're intelligent and we know about average volume, we would have checked average volume and we would have seen that the 24-hour volume is super high, way above the average. This would tell us that the averages or the daily volume is gonna go back down to the average and our APR will also go down so for the people who didn't check that, they would have gotten blindsided, thinking they'd make a lot more but now they're not making nearly as much. 

## Asset Selection

The market-cap rank of an asset across all crypto. **Lower number = safer.** It's our **safety barrier**.

- Top 30 — safe.
- Top 100 — exploring.
- Past 100 — iffy on safety, but potentially higher appreciation in up markets because of higher volatility.

The lower the rank number, the lower the volatility and the higher the probability of recovery after a drawdown.

 the importance of investing in coins with good asset selection is that it minimizes the probability that something bad may happen. Scams may happen and platforms may get hacked but as long as you're in the top 30, the probability of anything bad happening to your positions is very very low.  referencing the bridge hack that happened a few weeks ago, that really only impacted people who were in that type of Ethereum that was hacked. People who were not in that fake version of Ethereum were totally fine. 

## Correlation (Pearson)

How two assets move relative to each other.

- **+1** — moving together. Stays in range longest. Amplifies appreciation in an up-trend (and depreciation in a down-trend). Pick this when you want to ride a directional move.
- **0** — no pattern. Pick this in a down market when you don't want to amplify depreciation.
- **−1** — moving opposite. Leaves range fastest.

Correlated assets are really good when the market is appreciating so you get even more appreciation because your appreciation is relative to how much of each asset you hold. If you're an ETH/USDC pair and your range is 50% on each side, you'd have half your money in Ethereum and half your money in USDC. Then if Ethereum would go up, you'd only get half the appreciation because of how your range is set.  so in an upward market it might make sense to find correlated pairs so that way you get full appreciation. If you have a bitcoin-Ethereum pair and both go up by 20, you get a full 20% appreciation plus the fees you earn on that position.

 where a correlated pair is not good is when the market is going down. You don't want both your Bitcoin and Ethereum to go down by 20% because then you'd get depreciation of 20%. Instead you want to find a pair that is not correlated, where your money is maybe half in Bitcoin, half in USDC, where if Bitcoin goes down by 20% you only get about 10% depreciation.

 and so if the news is getting positive and you think the market's going to go up, it might make sense to look at some correlated positions. Likewise if you think the market's starting to go down or might have a big drop, it might be a good idea to get out of your correlated positions and find positions that are not correlated.

## Range

Set based on **support and resistance**.

- **Wider range = lower APR.**
- **Narrower range = higher APR — only while price stays inside it.**
- We could also set up a skewed range where if we believe one of the assets is going to go back up. For example in an ETH/USDC pair we would make the range so it's mostly on the Ethereum side. That way when Ethereum goes up you get more appreciation because most of your position is in Ethereum and vice versa if we want to mitigate the depreciation of an asset if we think it's about to go down. 

When price moves, your money rotates from the appreciating asset toward the depreciating one.  one of the downsides here is if your money goes 100% to Ethereum when you're out of range. If Ethereum keeps going down, you're going to get full depreciation relative to a partial depreciation that you would experience if you were in range.  on the other side if Ethereum would go up and you'd go out of range on your ETH/USDC position, where you'd have only USDC left, if Ethereum went up 1,000% more, you would get none of that appreciation. Now your money moved towards the asset that is underperforming relative to the other. You have no more Ethereum and therefore you don't get to benefit from any of the Ethereum upside.

 if you set a wider range, you're not going to make as high of an APR but you'll stay in range for longer. If you make a smaller range, a narrower range, you'd get a higher APR but you'd have to re-balance more often and you'd go out of range more often 

## The Chart

 this variable is all about taking a look at the chart and the historical price movement throughout a period of time. We just want to make sure we're not buying at the very top or we're not buying into a chart that has only gone down throughout its lifetime. Both of those scenarios would not be a good investment.  an example of a good investment is when the chart is super low on a very good asset with a healthy chart, like it goes up and down and has highs and lows and it doesn't look dead.  a really good example of how to implement this is when someone is talking about an opportunity with a lot of hype. We take a look at the chart and make sure it's not near the top because if it's near the top, it's not a good time to buy. We have more downside than upside in this case.

## Market Sentiment
 this variable is simply taking a look at the market sentiment on Coin Market Cap. We just take a peek and if the market sentiment is very negative then most likely things are going to go down, including the price. Mainly if the market sentiment is neutral it might just go sideways. One of the benefits is that as we get set at a tighter range for that period of time. The other is if it's super super high, that means the coins are probably going to go up and we might want to go into correlated pairs.  but on the extreme side of both, if it's in extreme, extreme fear, that's probably meaning that the markets are going to turn back around and start going the opposite way. If it's on extreme, extreme greed, that means the market's probably going to go into a correction. Those are two things to look out for before making either a small range or jumping into a position.


---

## Decision flow (rough)

1. **TVL** — is the pool deep enough? (Safety floor.)
2. **Asset Selection** — are both sides inside our risk band? (Safety barrier.)
3. **Volume vs. Average Volume** — is today's APR a real signal or an outlier?
4. **Correlation** — does the pair behavior match the market regime I expect?
5. **Range** — set width based on support/resistance and the answers above.

---

## Source

Extracted from `Instructions for making Digest.docx`. The source document ends mid-sentence in the Range section ("Your money moves to the asset ta…") — interpreted here as the impermanent-loss framing. Update if the original ending was different.
