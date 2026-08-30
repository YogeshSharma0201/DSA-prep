# Edit Distance

**Link:** [Edit Distance - LeetCode](https://leetcode.com/problems/edit-distance/)

## Problem

Given two strings `word1` (or `s`) and `word2` (or `t`), return the *minimum number of operations* required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
- **Insert** a character
- **Delete** a character
- **Replace** a character

---

## Solution (2D Dynamic Programming / Tabulation)

### Intuition & State Transition
Let `dp[i][j]` represent the minimum number of edit operations required to convert prefix `s[0..i-1]` to prefix `t[0..j-1]`.

- **Base Cases:**
  - `dp[i][0] = i`: Converting `s[0..i-1]` to an empty string requires `i` deletions.
  - `dp[0][j] = j`: Converting an empty string to `t[0..j-1]` requires `j` insertions.

- **Transitions:**
  For index `i` (in `s`) and `j` (in `t`):
  1. **If characters match (`s[i-1] == t[j-1]`):**
     No new operation needed!
     `dp[i][j] = dp[i-1][j-1]`
  2. **If characters differ (`s[i-1] != t[j-1]`):**
     We take the minimum of 3 operations + 1 extra cost:
     - **Replace:** `dp[i-1][j-1]` (change `s[i-1]` to `t[j-1]`)
     - **Delete:** `dp[i-1][j]` (remove `s[i-1]`)
     - **Insert:** `dp[i][j-1]` (insert `t[j-1]`)
     
     `dp[i][j] = 1 + min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]})`

---

## Complexity Analysis

- **Time Complexity:** O(m * n) where `m` is the length of `s` and `n` is the length of `t`.
- **Space Complexity:** O(m * n) for storing the 2D DP table.

---

## Code

```cpp
class Solution {
public:
    int minDistance(string s, string t) {
        int m = s.size(), n = t.size();

        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        // Fill base cases where one string is empty
        for (int i = 0; i < m; i++) {
            dp[i + 1][0] = i + 1;
        }
        for (int i = 0; i < n; i++) {
            dp[0][i + 1] = i + 1;
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (s[i] == t[j]) {
                    dp[i + 1][j + 1] = dp[i][j];
                }
                else {
                    dp[i + 1][j + 1] = 1 + min(dp[i + 1][j],
                                            min(dp[i][j + 1],
                                                dp[i][j]));
                }
            }
        }

        return dp[m][n];
    }
};
```
