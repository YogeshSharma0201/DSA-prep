# Integer Break

**Link:** https://leetcode.com/problems/integer-break/

## Problem
Given a positive integer n, break it into at least two positive integers that sum to n and maximize the product of those integers. Return the maximum product. For example, breaking 10 into 3+3+4 gives product 36.

## Solution
Mathematically, breaking into 3s maximizes the product. Compute the number of 3s as n/3. Handle the remainder: if remainder is 1, replace one 3 with two 2s (since 3*1 < 2*2); if remainder is 2, multiply by 2. Special cases: n=2 returns 1, n=3 returns 2 (must split into at least 2 parts).

## Code
```cpp
int integerBreak(int n) {
    if (n == 2) return 1;
    if (n == 3) return 2;

    int product = 1;
    while (n > 4) {
        product *= 3;
        n -= 3;
    }
    // n is now 2, 3, or 4 — all multiply optimally as-is
    return product * n;
}
```

## DP Solution
`dp[i]` = max product from breaking `i`. For each split `j` in `[1, i)`, either keep `j` as-is or use `dp[j]` (already broken further), same for `i-j`. Take the max across all splits.

```cpp
int integerBreak(int n) {
    vector<int> dp(n+1, 0);

    dp[0] = 0;
    dp[1] = 1;

    for(int i=2; i<=n; i++) {
        for(int j=1; j<i; j++) {
            dp[i] = max(dp[i], max(j,dp[j]) * max(i-j, dp[i-j]));
        }
    }

    return dp[n];
}
```
