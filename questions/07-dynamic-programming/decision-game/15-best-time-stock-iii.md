# Best Time to Buy and Sell Stock III

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/

## Problem
Given an array of stock prices, find the maximum profit using at most two transactions. You must sell before buying again, so you cannot hold two stocks simultaneously. This extends the single-transaction problem to allow a second independent buy-sell pair.

## Solution
Split the array at each index i. Precompute left[i] = max profit with one transaction in prices[0..i] (scan forward tracking min price). Precompute right[i] = max profit with one transaction in prices[i..n-1] (scan backward tracking max price). The answer is max over all i of left[i] + right[i].

## Code
```cpp
int maxProfit(vector<int>& prices) {
    int n = prices.size();
    vector<int> left(n, 0), right(n, 0);

    // max profit with one transaction ending at or before i
    int minPrice = prices[0];
    for (int i = 1; i < n; i++) {
        left[i] = max(left[i-1], prices[i] - minPrice);
        minPrice = min(minPrice, prices[i]);
    }

    // max profit with one transaction starting at or after i
    int maxPrice = prices[n-1];
    for (int i = n-2; i >= 0; i--) {
        right[i] = max(right[i+1], maxPrice - prices[i]);
        maxPrice = max(maxPrice, prices[i]);
    }

    int ans = 0;
    for (int i = 0; i < n; i++)
        ans = max(ans, left[i] + right[i]);
    return ans;
}
```
