# 0/1 Knapsack Problem

**Link:** https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

## Problem
Given weights and values of N items, and a knapsack of capacity W, find the maximum value that can be put in the knapsack. Each item can be included at most once (0/1 choice).

## Solution
Bottom-up DP: `dp[i][w]` = maximum value using the first i items with capacity w. For each item, either skip it (dp[i-1][w]) or include it if weight fits (dp[i-1][w-wt[i]] + val[i]). Space can be optimized to 1D by iterating w from W down to wt[i].

## Code
```cpp
int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}
```
