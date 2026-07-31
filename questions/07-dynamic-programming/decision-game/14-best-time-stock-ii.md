# Best Time to Buy and Sell Stock II

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

## Problem
You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

## Solution
This problem can be solved using a greedy approach. Since we can make as many transactions as we want, we should capture every price increase from one day to the next.

Iterate through the `prices` array starting from the second day (index 1). If the price today is higher than the price yesterday, add the difference to our total profit. This effectively sums up all the upward slopes in the price graph, which yields the maximum possible profit.

## Code
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        
        return profit;        
    }
};
```
