# Longest Palindromic Subsequence

**Link:** [Longest Palindromic Subsequence - LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)

## Problem

Given a string `s`, find the length of the **longest palindromic subsequence** in `s`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

---

## Solution (Reduction to Longest Common Subsequence - LCS)

### Intuition & Reduction
A palindrome is a string that reads the same forwards and backwards. 

Therefore, finding the **Longest Palindromic Subsequence (LPS)** of a string `s` is equivalent to finding the **Longest Common Subsequence (LCS)** between string `s` and its reversed string `t = reverse(s)`:

$$\text{LPS}(s) = \text{LCS}(s, \text{reverse}(s))$$

### Dynamic Programming Transition
Let `dp[i][j]` represent the LCS length between `s[0..i-1]` and `t[0..j-1]`, where `t = reverse(s)`:
- **If characters match (`s[i-1] == t[j-1]`):**
  `dp[i][j] = 1 + dp[i-1][j-1]`
- **If characters differ (`s[i-1] != t[j-1]`):**
  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

---

## Complexity Analysis

- **Time Complexity:** O(n^2) where `n` is the length of string `s`.
- **Space Complexity:** O(n^2) for the 2D DP matrix.

---

## Code

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int m = s.size();
        int n = s.size();

        string t = s;
        reverse(s.begin(), s.end());

        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (s[i] == t[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                }
                else {
                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[m][n];
    }
};
```
