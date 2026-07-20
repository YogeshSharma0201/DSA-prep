# Count Different Palindromic Subsequences

**Link:** https://leetcode.com/problems/count-different-palindromic-subsequences

## Problem
Given a string s containing only 'a', 'b', 'c', 'd', count the number of different non-empty palindromic subsequences. Two subsequences are different if they differ as strings. The answer may be large so return it modulo 10^9 + 7.

## Solution
DP where dp[i][j] = number of unique palindromic subsequences in s[i..j]. For each character c in {a,b,c,d}, find the leftmost (lo) and rightmost (hi) occurrence in [i, j]. If none exists, add 0. If lo == hi, add 1 (single char). If lo+1 == hi, add 2 (single char + double). Otherwise add dp[lo+1][hi-1] + 2 (inner subsequences wrapped by c, plus "c" and "cc" themselves). Sum over all 4 characters.

## Code
```cpp
int countPalindromicSubsequences(string s) {
    const int MOD = 1e9 + 7;
    int n = s.size();
    vector<vector<long long>> dp(n, vector<long long>(n, 0));

    for (int i = 0; i < n; i++) dp[i][i] = 1;

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            for (char c : {'a', 'b', 'c', 'd'}) {
                int lo = i, hi = j;
                while (lo <= j && s[lo] != c) lo++;
                while (hi >= i && s[hi] != c) hi--;
                if (lo > hi) continue;
                if (lo == hi) { dp[i][j] = (dp[i][j] + 1) % MOD; continue; }
                if (lo + 1 == hi) { dp[i][j] = (dp[i][j] + 2) % MOD; continue; }
                dp[i][j] = (dp[i][j] + dp[lo+1][hi-1] + 2) % MOD;
            }
        }
    }
    return dp[0][n-1];
}
```
