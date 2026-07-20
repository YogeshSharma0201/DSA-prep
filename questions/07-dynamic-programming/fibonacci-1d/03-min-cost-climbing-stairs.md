# Min Cost Climbing Stairs

**Link:** https://leetcode.com/problems/min-cost-climbing-stairs/

## Problem
You are given an integer array cost where cost[i] is the cost of the ith step on a staircase. Once you pay the cost, you can climb one or two steps. You can either start from the step with index 0 or the step with index 1. Return the minimum cost to reach the top of the floor (beyond the last step).

## Solution
DP: `dp[i]` = minimum cost to reach step i. dp[i] = cost[i] + min(dp[i-1], dp[i-2]). The answer is min(dp[n-1], dp[n-2]). Can be space-optimized to two variables.

## Code
```cpp
int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    int prev2 = cost[0], prev1 = cost[1];
    for (int i = 2; i < n; i++) {
        int cur = cost[i] + min(prev1, prev2);
        prev2 = prev1;
        prev1 = cur;
    }
    return min(prev1, prev2);
}
```
