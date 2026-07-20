# Count Palindromic Subsequences

**Link:** https://leetcode.com/problems/count-palindromic-subsequences/

## Problem
Given a digit string `s`, return the number of **5-length palindromic subsequences** of `s` modulo `10^9 + 7`. A palindromic subsequence of length 5 has the form `jkkj` → `j _ k _ k _ j` (positions i < p < q < r < t where `s[i]==s[t]` and `s[p]==s[r]`).

## Solution
For each center position `i`, count all pairs `(j, k)` such that there exist indices to the left of `i` with character `j` followed by `k`, and symmetric indices to the right with character `k` followed by `j`. Precompute `pre[i][j][k]` = number of pairs `(j,k)` (j appears before k) in `s[0..i]`, and `suf[i][j][k]` = number of pairs `(j,k)` in `s[i..n-1]`. For each center `i` (indices 2 to n-3), accumulate `pre[i-1][j][k] * suf[i+1][j][k]` over all digit pairs.

**Time:** O(n × 100) = O(n) | **Space:** O(n × 100)

## Code
```cpp
class Solution {
public:
    int pre[10000][10][10], suf[10000][10][10], cnts[10] = {};
    int countPalindromes(string s) {
        int mod = 1e9 + 7, n = s.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int c = s[i] - '0';
            if (i)
                for (int j = 0; j < 10; j++)
                    for (int k = 0; k < 10; k++) {
                        pre[i][j][k] = pre[i - 1][j][k];
                        if (k == c) pre[i][j][k] += cnts[j];
                    }
            cnts[c]++;
        }
        memset(cnts, 0, sizeof(cnts));
        for (int i = n - 1; i >= 0; i--) {
            int c = s[i] - '0';
            if (i < n - 1)
                for (int j = 0; j < 10; j++)
                    for (int k = 0; k < 10; k++) {
                        suf[i][j][k] = suf[i + 1][j][k];
                        if (k == c) suf[i][j][k] += cnts[j];
                    }
            cnts[c]++;
        }
        for (int i = 2; i < n - 2; i++)
            for (int j = 0; j < 10; j++)
                for (int k = 0; k < 10; k++)
                    ans = (ans + 1LL * pre[i - 1][j][k] * suf[i + 1][j][k]) % mod;
        return ans;
    }
};
```
