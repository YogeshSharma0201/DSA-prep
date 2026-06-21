# Climbing Stairs

**Link:** https://leetcode.com/problems/climbing-stairs

## Problem
You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps. Count the number of distinct ways to reach the top. This is a classic combinatorics problem where the answer follows the Fibonacci sequence.

## Solution
The number of ways to reach step i equals the sum of ways to reach step i-1 (then take 1 step) and step i-2 (then take 2 steps). This gives dp[i] = dp[i-1] + dp[i-2], identical to the Fibonacci recurrence. Use two variables to achieve O(1) space.

## Code
```cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```
