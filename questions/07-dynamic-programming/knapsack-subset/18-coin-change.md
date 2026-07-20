# Coin Change

**Link:** https://leetcode.com/problems/coin-change/

## Problem
Given an array of coin denominations and a target amount, find the minimum number of coins needed to make up that amount. You may use each coin denomination any number of times. Return -1 if the amount cannot be made with the given coins.

## Solution
Bottom-up DP where dp[j] represents the minimum number of coins needed to make amount j. Initialize dp[0] = 0 and all others to a large value. For each coin and each amount >= coin value, update dp[j] = min(dp[j], dp[j - coin] + 1). The image uses a 2D rolling array variant iterating over coins first.

## Code
```cpp
int coinChange(vector<int>& coins, int amount) {
    int n = coins.size();

    int maxAmount = INT_MAX>>1;
    vector<vector<int>> dp(2, vector<int>(amount+1, maxAmount));

    for(int i=0; i<n; i++) {
        for(int j=0; j<=amount; j++) {
            if(i==0) {
                if(j % coins[i] == 0) {
                    dp[i%2][j] = j / coins[i];
                }
            }
            else {
                dp[i%2][j] = dp[(i+1)%2][j];
                if(j >= coins[i]) {
                    dp[i%2][j] = min(1 + dp[i%2][j-coins[i]], dp[i%2][j]);
                }
            }
        }
    }

    return dp[(n+1)%2][amount] >= maxAmount ? -1 : dp[(n+1)%2][amount];
}
```
