# Regular Expression Matching

**Link:** https://leetcode.com/problems/regular-expression-matching/

## Problem
Given an input string s and a pattern p, implement regular expression matching with support for '.' (matches any single character) and '*' (matches zero or more of the preceding element). The matching must cover the entire input string, not just a prefix.

## Solution
Use DP where dp[i][j] means s[0..i-1] matches p[0..j-1]. If p[j-1]='*': dp[i][j] = dp[i][j-2] (zero occurrences of preceding element) OR (match(s[i-1], p[j-2]) AND dp[i-1][j]) (one or more occurrences). Otherwise: dp[i][j] = match(s[i-1], p[j-1]) AND dp[i-1][j-1].

## Code
```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m+1, vector<bool>(n+1, false));
        dp[0][0] = true;

        // Handle patterns like a*, a*b*, a*b*c* matching empty string
        for (int j = 2; j <= n; j++)
            if (p[j-1] == '*') dp[0][j] = dp[0][j-2];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '*') {
                    dp[i][j] = dp[i][j-2]; // zero occurrences
                    if (p[j-2] == '.' || p[j-2] == s[i-1])
                        dp[i][j] = dp[i][j] || dp[i-1][j]; // one+ occurrences
                } else {
                    if (p[j-1] == '.' || p[j-1] == s[i-1])
                        dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        return dp[m][n];
    }
};
```
