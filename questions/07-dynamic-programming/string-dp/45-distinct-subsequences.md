# Distinct Subsequences

**Link:** [Distinct Subsequences - LeetCode](https://leetcode.com/problems/distinct-subsequences/)

## Problem Description

Given two strings `s` and `t`, return the *number of distinct subsequences* of `s` which equals `t`.

The test cases are generated so that the answer fits in a 32-bit signed integer.

---

## Solution 1: Top-Down Recursion with Memoization (2D DP - User's Approach)

### Approach
We match string `s` against string `t` using indices `i` (index in `s`) and `j` (index in `t`).

- **Base Cases:**
  - If `j == t.size()`, we have successfully matched all characters of `t` $\implies$ return `1`.
  - If `i == s.size()` (and `j < t.size()`), we ran out of characters in `s` without completing `t` $\implies$ return `0`.

- **Transitions:**
  - If `s[i] == t[j]`, we have two options:
    1. **Take `s[i]`:** Match `s[i]` with `t[j]` and advance both pointers $\implies$ `solve(i+1, j+1)`.
    2. **Leave `s[i]`:** Skip `s[i]` and look for a match for `t[j]` later in `s` $\implies$ `solve(i+1, j)`.
    $$\text{Total} = \text{solve}(i+1, j+1) + \text{solve}(i+1, j)$$
  - If `s[i] != t[j]`, we have no choice but to skip `s[i]` $\implies$ `solve(i+1, j)`.

### Code
```cpp
class Solution {
public:
    int solve(int i, int j, string& s, string& t, vector<vector<int>>& dp) {
        if(j == t.size()) return 1;
        if(i == s.size()) return 0;

        if(dp[i][j] != -1) return dp[i][j];

        if(s[i] == t[j]) {
            return dp[i][j] = solve(i+1, j+1, s, t, dp) + solve(i+1, j, s, t, dp);
        }
        else {
            return dp[i][j] = solve(i+1, j, s, t, dp);
        }
    }

    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(0, 0, s, t, dp);
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n \cdot m)$ where $n = |s|$ and $m = |t|$. There are $n \times m$ unique states, each evaluated in $\mathcal{O}(1)$ time.
- **Space Complexity:** $\mathcal{O}(n \cdot m)$ for the memoization matrix and recursion stack.

---

## Solution 2: Bottom-Up 2D DP (Tabulation)

### Approach
Define `dp[i][j]` as the number of distinct subsequences of `s[0...i-1]` that equal `t[0...j-1]`.

- **Base Cases:**
  - `dp[i][0] = 1` for all $0 \le i \le n$ (Matching an empty target string `t` can always be done in 1 way by choosing no characters).
  - `dp[0][j] = 0` for all $j > 0$ (An empty string `s` cannot match a non-empty `t`).

- **Recurrence:**
  - If `s[i-1] == t[j-1]`:
    $$\text{dp}[i][j] = \text{dp}[i-1][j-1] + \text{dp}[i-1][j]$$
  - If `s[i-1] != t[j-1]`:
    $$\text{dp}[i][j] = \text{dp}[i-1][j]$$

> **Note on Data Type:** In C++, intermediate values of `dp[i-1][j-1] + dp[i-1][j]` can exceed standard signed 32-bit integers during calculation even if the final result fits in an `int`. Using `unsigned long long` prevents integer overflow runtime errors.

### Code
```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        if (n < m) return 0;

        vector<vector<unsigned long long>> dp(n + 1, vector<unsigned long long>(m + 1, 0));

        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1; // Empty string t matched by 1 way
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s[i - 1] == t[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][m];
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n \cdot m)$
- **Space Complexity:** $\mathcal{O}(n \cdot m)$

---

## Solution 3: 1D Space-Optimized DP ($\mathcal{O}(m)$ Space)

### Approach
Notice that `dp[i][j]` only depends on row `i-1` (`dp[i-1][j-1]` and `dp[i-1][j]`).
We can reduce space to a **single 1D array** `dp[j]` of size $m + 1$.

To avoid overwriting `dp[j-1]` before it is used, we iterate `j` **backwards from $m$ down to $1$**:
$$\text{if } s[i-1] == t[j-1] \implies \text{dp}[j] = \text{dp}[j] + \text{dp}[j-1]$$

### Code
```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        if (n < m) return 0;

        vector<unsigned long long> dp(m + 1, 0);
        dp[0] = 1; // Base case: matching empty string t

        for (int i = 1; i <= n; i++) {
            for (int j = m; j >= 1; j--) { // Iterate backwards
                if (s[i - 1] == t[j - 1]) {
                    dp[j] = dp[j] + dp[j - 1];
                }
            }
        }

        return dp[m];
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n \cdot m)$
- **Space Complexity:** $\mathcal{O}(m)$ — Only uses a 1D vector of size $|t| + 1$.

---

## Comparison of Approaches

| Solution | DP State | Loop Order | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **1. Top-Down (User's)** | `dp[i][j]` | Top-Down Recursion | $\mathcal{O}(n \cdot m)$ | $\mathcal{O}(n \cdot m)$ |
| **2. Bottom-Up 2D** | `dp[i][j]` | Forward $i \in [1..n], j \in [1..m]$ | $\mathcal{O}(n \cdot m)$ | $\mathcal{O}(n \cdot m)$ |
| **3. Space Optimized 1D** | `dp[j]` | Forward $i \in [1..n]$, Backward $j \in [m..1]$ | $\mathcal{O}(n \cdot m)$ | $\mathcal{O}(m)$ |
