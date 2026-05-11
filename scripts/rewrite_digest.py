"""Rewrite a specific digest in data.js with new content.

Reads data.js, replaces the digest whose `id` matches REPLACEMENT['id'],
and writes the file back in the exact format the cron writer uses.

Run from inside patient-investor-digest/:
    python3 scripts/rewrite_digest.py
"""

import json
import os
import sys

DATA_FILE = "data.js"

REPLACEMENT = {
    "id": "05-07-2026",
    "date": "May 07, 2026",
    "title": "LP Mastermind\nMarket Update",
    "subtitle": "What moved this week, what it means for your ranges, and what's worth talking about.",
    "snapshot": [
        {"label": "BTC", "value": "-2.1%"},
        {"label": "ETH", "value": "-2.7%"},
        {"label": "Volatility", "value": "Mild risk-off, both assets pulling back"},
        {"label": "ETH Gas", "value": "~$1.50"},
    ],
    "intro": "Both BTC and ETH are down on the day -- BTC at $79,986 (-2.1%) and ETH at $2,295 (-2.7%) -- as a mild risk-off move trims recent gains. Underneath the pullback, the longer-term picture runs the other way: five straight weeks of net ETF inflows and accelerating corporate BTC buying. That split -- short-term down, long-term up -- is exactly the regime where the Range you set last week may not match the one you are LPing into this week. Today's stories pull on Range, TVL, Volume, Correlation, and Asset Selection -- the variables that decide whether your money is in the band right now or watching from outside it.",
    "stories": [
        {
            "title": "Five Straight Weeks of ETF Inflows -- A Range Lesson and a Correlation Lesson",
            "body": "Spot Bitcoin ETFs now hold $108.76 billion in net assets after five consecutive weeks of net inflows -- the longest buying streak of the year. Put skew -- the premium traders pay for downside protection -- is fading, which means institutions are buying plain long exposure rather than hedged bets. Sustained one-direction demand is the textbook case for Range: a range skewed in the direction of the flow spends more time earning fees than one centered on today's price. If you expect BTC to drift up over the coming months, your BTC/USDC range should sit mostly above the current price. The non-obvious second variable is Correlation. In BTC/USDC, only half your money is in BTC -- so a 20% BTC move nets you about 10% of position appreciation. A correlated pair like BTC/ETH lets you ride the full move on both sides at once. The concrete tweak this week: not only 'skew my range upward,' but also 'consider rotating from a stablecoin-base pair into a correlated top-30 pair.' Same news, two decisions.",
            "spark": "Pull up your most active BTC position. Is your range centered or skewed -- and would you net more by rotating half of it into BTC/ETH? Which variable is actually driving that call for you?",
        },
        {
            "title": "Strategy On Pace to Buy $30B in BTC This Year -- Why That Affects Your Pool's TVL",
            "body": "JPMorgan analysts note that Michael Saylor's Strategy has accumulated roughly $11 billion in BTC so far in 2026 and could add $30 billion more by year-end at its current pace. A single structurally consistent buyer pulls capital from somewhere -- including DeFi positions whose holders rotate into BTC -- and that capital flow shows up as shifting TVL across pools. TVL matters because APR is essentially a function of volume relative to it: higher TVL means each LP earns a smaller slice of the same fee pie. The non-obvious second variable is Average Volume (45-day). Krystal shows today's volume, which inflates during institutional buying spurts and makes today's APR look stickier than it is. Before adding to a BTC pool this week, pull its 45-day average. If today's volume is well above the average, the headline APR will compress as volume reverts. The modification: pick the pool where 45-day average and daily volume look similar and TVL is rising slowly -- not the one with the eye-catching APR on the front page.",
            "spark": "Look at the BTC pool you most recently added to -- or were last tempted by. How does today's volume compare to its 45-day average on Krystal? What does the gap tell you about whether the APR you saw is the APR you'll actually earn?",
        },
        {
            "title": "AWS Wires USDC Into Its Agent Stack -- What That Means for Volume and Pair Choice",
            "body": "Amazon Web Services announced it is integrating USDC payments -- powered by Coinbase and Stripe -- so AI agents can make autonomous micropayments directly on-chain. USDC is a stablecoin (an asset pegged to $1), and it sits at the base of high-volume LP pairs like USDC/ETH and USDC/WBTC. When a platform of that size routes production transaction flow through USDC, the structural floor on stablecoin pair volume rises. Volume relative to TVL is what determines pay, so a new source of stablecoin volume is a Volume-side tailwind for LPs already positioned in those pairs. The non-obvious second variable is Asset Selection. USDC is issued by Circle, top-10 in market-cap rank, with audited reserves. The lesson is not 'add any stablecoin pool' -- it is 'add the pool where the stablecoin itself clears the safety barrier.' A pool paired with a lower-rank stablecoin might pay a higher fee tier, but a depeg event sends your range to one extreme instantly. This week's tweak: confirm every stablecoin you are paired with sits inside the top-30.",
            "spark": "Look at every stablecoin-paired position you currently run. Where does each stablecoin rank in market cap -- and which would you rotate out of if the rank slipped past 30?",
        },
        {
            "title": "Bitwise Acquires a $267M Crypto Carry Fund -- The Capital It Pulled In Came From Somewhere",
            "body": "Bitwise is acquiring Superstate's $267 million Crypto Carry Fund, a tokenized product that earns yield by exploiting the gap between spot crypto prices and futures prices -- a structure traders call carry. Carry trades work best in contango (a market state where futures trade at a meaningful premium to spot), and they pull yield-seeking capital that would otherwise sit in LP pools. The variable they pressure is TVL. When LP TVL softens because carry got attractive, the LPs who stay capture a larger share of the same fee pie -- volume relative to TVL rises, and so does APR. The non-obvious second variable is Market Sentiment. Contango blows out widest when sentiment is greedy, which the Variables reference flags as a leading signal of an upcoming correction. Carry inflows and extreme-greed sentiment tend to peak together. The modification: when carry funds make headlines for raising capital, treat it as a prompt to check your pool's TVL trajectory and Coin Market Cap's sentiment gauge before adding new positions -- the same conditions that fund carry are often the conditions where tight ranges get knocked out.",
            "spark": "Open Coin Market Cap right now and check the Fear and Greed index against the TVL trend on your largest LP position. Are they telling the same story? Which would you trust if they disagreed?",
        },
        {
            "title": "Kraken Buys an Asian Stablecoin Firm for $600M -- The Narrow-Range Trade Just Got More Interesting",
            "body": "Kraken's parent company acquired Reap, an Asian stablecoin infrastructure firm, for $600 million, extending its reach into cross-border payment flows. More stablecoin infrastructure means more stablecoin volume -- payments settling in USDC or USDT often route through DEX pools along the way. For stablecoin-to-stablecoin pairs like USDC/USDT, price barely moves, which is why LPs run extremely narrow Range there -- often a few basis points wide. A narrow range concentrates capital where the swaps actually happen and squeezes more fees per dollar. The catch is fee tier: stablecoin pools pay 0.01% to 0.05%, so volume has to carry the math. The non-obvious second variable is Asset Selection. Narrowing your range to capture tight stablecoin volume only works if both stablecoins hold their peg. A depeg knocks you to one extreme in seconds and locks you into whichever side is bleeding. Top-30 stablecoins -- USDC, USDT, DAI -- have the deepest issuer credibility. A higher fee tier paired with a smaller, less-vetted stablecoin is the trade that looks great until it doesn't. This week's tweak: if you are tightening a stablecoin pair, sanity-check the rank and issuer of both sides before going narrower.",
            "spark": "If you currently run a stablecoin/stablecoin position, how narrow is your range -- and what would you do in the first 30 seconds of a depeg headline? Pull the position, widen the range, or wait it out? Why?",
        },
    ],
    "closing": "Today's pullback is the kind of soft test that shows which of your ranges you would actually defend and which you set on autopilot. Run the variables across your top position -- TVL, volume vs 45-day average, asset selection, correlation -- and pick the one where you have been least disciplined. What is the smallest concrete change you would make to that position before Monday, and which variable is forcing the change?",
}


def main():
    if not os.path.exists(DATA_FILE):
        print(f"ERROR: {DATA_FILE} not found. Run from inside patient-investor-digest/.", file=sys.stderr)
        sys.exit(1)

    with open(DATA_FILE) as f:
        content = f.read()
    start = content.index("[")
    end = content.rindex("]") + 1
    digests = json.loads(content[start:end])

    target_id = REPLACEMENT["id"]
    found = False
    for i, d in enumerate(digests):
        if d.get("id") == target_id:
            digests[i] = REPLACEMENT
            found = True
            break

    if not found:
        print(f"ERROR: digest with id={target_id} not found in {DATA_FILE}", file=sys.stderr)
        sys.exit(1)

    with open(DATA_FILE, "w") as f:
        f.write("// data.js — Patient Investor Digest\n")
        f.write("// Scheduled task prepends new issues to the TOP of this array automatically.\n")
        f.write("// Manual additions: follow the same object structure and add to the top.\n")
        f.write(f"const DIGESTS = {json.dumps(digests, indent=2)};\n")

    print(f"Rewrote digest {target_id} in {DATA_FILE}")


if __name__ == "__main__":
    main()
