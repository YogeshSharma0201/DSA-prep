# Regular Expression Matching

**Link:** [Regular Expression Matching - LeetCode](https://leetcode.com/problems/regular-expression-matching/)

## Problem
Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` (matches any single character) and `'*'` (matches zero or more of the preceding element). The matching must cover the entire input string, not just a prefix.

---

## Solution 1: Bottom-Up Dynamic Programming (Tabulation)

### Intuition
Use 2D DP where `dp[i][j]` indicates whether `s[0..i-1]` matches `p[0..j-1]`.
- If `p[j-1] == '*'`:
  - Zero occurrences of preceding element: `dp[i][j] = dp[i][j-2]`
  - One or more occurrences (if `p[j-2]` matches `s[i-1]`): `dp[i][j] = dp[i][j] || dp[i-1][j]`
- Otherwise, if `p[j-1] == '.'` or `p[j-1] == s[i-1]`: `dp[i][j] = dp[i-1][j-1]`.

### Code
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

---

## Solution 2: Top-Down Dynamic Programming (Memoization)

### Intuition
Recursively match `s[si..]` with `p[pi..]` starting from index `(0, 0)` using a 2D memoization table `dp[si][pi]`:
- Handle boundary cases when `si == s.size()` or `pi == p.size()`.
- If `p[pi] == '*'`: branch based on whether preceding character `p[pi-1]` matches `s[si]`.
- If `p[pi] == '.'` or `p[pi] == s[si]`: move to next characters `(si+1, pi+1)`.
- If next pattern char `p[pi+1] == '*'`: allow skipping or matching ahead.

### Code
```cpp
class Solution {
public:
    bool isMatchC(string s, string p, int si, int pi, vector<vector<int>>& dp) {
        if(si == s.size() && pi == p.size()) return true;
        if(si == s.size()) {
            if(pi+1 < p.size() && p[pi+1] == '*') return isMatchC(s, p, si, pi+2, dp);
            return false;
        }
        if(pi == p.size()) return false;

        if(dp[si][pi] != -1) return dp[si][pi];

        bool flag = false;
        if(p[pi] == '*') {
            char ch = p[pi-1];
            if(ch == '.' || s[si] == ch) {
                flag = isMatchC(s, p, si+1, pi+1, dp) || isMatchC(s, p, si, pi+1, dp) || isMatchC(s, p, si+1, pi, dp);
            }
            else {
                flag = isMatchC(s, p, si, pi+1, dp);
            }
        }
        else if(p[pi] == '.' || p[pi] == s[si]) {
            flag = isMatchC(s, p, si+1, pi+1, dp);
        }
        if(pi+1 < p.size() && p[pi+1] == '*') {
            flag |= isMatchC(s, p, si, pi+1, dp);
        }

        return dp[si][pi] = flag;
    }

    bool isMatch(string s, string p) {
        vector<vector<int>> dp(s.size()+1, vector<int>(p.size()+1, -1));
        return isMatchC(s, p, 0, 0, dp);
    }
};
```
