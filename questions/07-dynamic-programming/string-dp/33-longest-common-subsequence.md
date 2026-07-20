# Longest Common Subsequence

**Link:** https://leetcode.com/problems/longest-common-subsequence/

## Problem
Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence derived by deleting some or no characters without changing the order.

## Solution
2D DP where `dp[i][j]` is the LCS length of text1[0..i-1] and text2[0..j-1]. If the characters match, `dp[i][j] = dp[i-1][j-1] + 1`. Otherwise, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`. Initialize with zeros; the answer is `dp[m][n]`.

## Code
```cpp
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i-1] == text2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}
```
