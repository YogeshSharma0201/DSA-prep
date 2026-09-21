# Interleaving String

**Link:** [Interleaving String - LeetCode](https://leetcode.com/problems/interleaving-string/)

## Problem

Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an **interleaving** of `s1` and `s2`.

An **interleaving** of two strings `s1` and `s2` is a configuration where `s1` and `s2` are divided into $n$ and $m$ non-empty substrings respectively, such that:
- `s1 = p1 + p2 + ... + pn`
- `s2 = q1 + q2 + ... + qm`
- `|n - m| <= 1`
- The interleaving is `p1 + q1 + p2 + q2 + ...` or `q1 + p1 + q2 + p2 + ...`

---

## Initial Solution (Top-Down Memoization)

### Intuition
Check matching characters from the end of `s3` against `s1` and `s2`. Calculate `k = i + j + 1` dynamically as the position in `s3`. At each step, if `s3[k]` matches `s2[j]`, recursively check if `s1[0..i]` and `s2[0..j-1]` interleave to form `s3[0..k-1]`. Similarly, if `s3[k]` matches `s1[i]`, recursively check `s1[0..i-1]` and `s2[0..j]`.

Memoize states using `dp[i+1][j+1]` to avoid recomputation.

### Code
```cpp
class Solution {
public:
    bool solve(int i, int j, string& s1, string& s2, string& s3, vector<vector<int>>& dp) {
        if(i == j && i == -1)  return true;
        
        int k = i+j+1;
        if(dp[i+1][j+1] != -1) return dp[i+1][j+1];

        return dp[i+1][j+1] = ((j >= 0 && s3[k] == s2[j] 
            && solve(i, j-1, s1, s2, s3, dp))
                || (i >= 0 && s3[k] == s1[i] 
            && solve(i-1, j, s1, s2, s3, dp)));
    }

    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size();
        int m = s2.size();
        int k = s3.size();

        if(k != m+n) return false;

        vector<vector<int>> dp(n+1, vector<int>(m+1, -1));

        return solve(n-1, m-1, s1, s2, s3, dp);
    }
};
```

### Complexity Analysis
- **Time Complexity:** $O(N \times M)$ where $N = |s1|$ and $M = |s2|$ because there are $(N+1) \times (M+1)$ states.
- **Space Complexity:** $O(N \times M)$ for the 2D DP memoization table + recursion call stack depth $O(N+M)$.

---

## Optimized Solution (2D Dynamic Programming)

### Key Optimization Insight
The index `k` in `s3` is strictly tied to `i` and `j` by the relation `k = i + j` (when using character counts / prefix lengths $i$ from $s1$ and $j$ from $s2$). Thus, `k` is redundant in the DP state, allowing us to drop the third dimension and optimize to 2D DP.

### State Definition & Transitions
Let `dp[i][j]` be `true` if `s3[0..i+j-1]` is an interleaving of `s1[0..i-1]` and `s2[0..j-1]`.

- **Base Case:** `dp[0][0] = true` (empty strings interleave to form an empty string).
- **Transition:**
  `dp[i][j]` is true if either:
  1. `i > 0 && s1[i-1] == s3[i+j-1] && dp[i-1][j]`
  2. `j > 0 && s2[j-1] == s3[i+j-1] && dp[i][j-1]`

### Code (2D Tabulation)
```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if (n + m != s3.size()) return false;

        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
        dp[0][0] = true;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && s1[i - 1] == s3[i + j - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
                if (j > 0 && s2[j - 1] == s3[i + j - 1]) {
                    dp[i][j] = dp[i][j] || dp[i][j - 1];
                }
            }
        }

        return dp[n][m];
    }
};
```

### Complexity Analysis
- **Time Complexity:** $O(N \times M)$
- **Space Complexity:** $O(N \times M)$

---

## Further Optimization (1D Space-Optimized DP)

Since `dp[i][j]` only depends on `dp[i-1][j]` (the previous row) and `dp[i][j-1]` (the current row, previous column), we can compress the 2D DP array into a single 1D vector of length $M+1$.

### Code (1D Space-Optimized)
```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if (n + m != s3.size()) return false;

        vector<bool> dp(m + 1, false);

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i == 0 && j == 0) {
                    dp[j] = true;
                } else {
                    bool fromS1 = (i > 0 && s1[i - 1] == s3[i + j - 1] && dp[j]);
                    bool fromS2 = (j > 0 && s2[j - 1] == s3[i + j - 1] && dp[j - 1]);
                    dp[j] = fromS1 || fromS2;
                }
            }
        }

        return dp[m];
    }
};
```

### Complexity Analysis
- **Time Complexity:** $O(N \times M)$
- **Space Complexity:** $O(M)$ where $M = |s2|$
