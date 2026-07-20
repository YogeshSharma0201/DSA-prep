# Count Ways to Reach Nth Stair

**Link:** https://www.geeksforgeeks.org/count-ways-reach-nth-stair/

## Problem
Given N stairs, count the number of distinct ways to reach the Nth stair from the bottom, where at each step you can climb 1 or 2 stairs.

## Solution
This is essentially Fibonacci. `dp[i]` = number of ways to reach step i. Base cases: dp[0] = 1 (already there), dp[1] = 1. For i >= 2: dp[i] = dp[i-1] + dp[i-2]. Can be generalized for m steps by summing the previous m dp values.

## Code
```cpp
int countWays(int n) {
    if (n <= 1) return 1;
    int prev2 = 1, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```
