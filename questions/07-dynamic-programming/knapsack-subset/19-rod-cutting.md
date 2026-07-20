# Rod Cutting Problem

**Link:** https://www.geeksforgeeks.org/cutting-a-rod-dp-13/

## Problem
Given a rod of length N and prices for pieces of lengths 1 to N, determine the maximum value obtainable by cutting the rod into pieces and selling them.

## Solution
Unbounded knapsack variant. `dp[j]` = maximum value achievable for rod length j. For each length i from 1 to N, update dp[j] = max(dp[j], price[i-1] + dp[j-i]) for all j >= i. Iterate lengths forward since the same piece can be used multiple times.

## Code
```cpp
int rodCutting(int n, vector<int>& price) {
    vector<int> dp(n + 1, 0);
    for (int j = 1; j <= n; j++) {
        for (int i = 1; i <= j; i++) {
            dp[j] = max(dp[j], price[i-1] + dp[j-i]);
        }
    }
    return dp[n];
}
```
