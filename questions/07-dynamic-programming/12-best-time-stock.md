# Best Time to Buy and Sell Stock

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

## Problem
Given an array prices where prices[i] is the price of a stock on day i, find the maximum profit from a single buy-sell transaction. You must buy before you sell. Return 0 if no profit is possible.

## Solution
Two-pointer approach: maintain a left pointer at the buy day and a right pointer at the sell day. If prices[l] < prices[r], compute profit and update maxProfit. Otherwise move l to r (found a cheaper buy day). Increment r each iteration. This runs in O(n) time and O(1) space.

## Code
```cpp
int maxProfit(vector<int>& prices) {
    int l = 0, r = 1;
    int maxP = 0;
    while(r < prices.size()) {
        if(prices[l] < prices[r]) {
            maxP = max(maxP, prices[r] - prices[l]);
        }
        else {
            l = r;
        }
        r++;
    }
    return maxP;
}
```
