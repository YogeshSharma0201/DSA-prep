# Knapsack with Duplicate Items (Unbounded Knapsack)

**Link:** https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1

## Problem
Given weights `wt[]` and values `val[]` of `N` items and a knapsack capacity `W`, find the maximum value that can be put in the knapsack. Each item can be chosen **an infinite number of times** (unbounded choices).

**Example 1:**
```
Input: val[] = [1, 1], wt[] = [2, 1], capacity = 3
Output: 3
Explanation: Pick the 2nd item 3 times (weight 1 + 1 + 1 = 3, value 1 + 1 + 1 = 3).
```

**Example 2:**
```
Input: val[] = [6, 1, 7, 7], wt[] = [1, 3, 4, 5], capacity = 8
Output: 48
Explanation: Pick the 1st item 8 times (weight 1 * 8 = 8, value 6 * 8 = 48).
```

---

## Solutions

### Approach 1: 2-Row Parity DP — O(N * W) Time, O(W) Space
- Uses a $2 \times (W+1)$ table where `dp[j % 2][i]` represents the max value for item `j` and capacity `i`.
- **State Transitions:**
  1. Exclude current item: `dp[(j + 1) % 2][i]` (value from previous item $j-1$).
  2. Include current item for the first time: `val[j-1] + dp[(j + 1) % 2][i - wt[j-1]]`.
  3. Include current item multiple times (unbounded): `val[j-1] + dp[j % 2][i - wt[j-1]]` (value from current row $j$).

### Approach 2: 1D Forward DP — O(N * W) Time, O(W) Space (Optimal)
- Uses a single array `dp[W + 1]`.
- Iterate capacity `i` **forward** from `wt[j]` up to `W`. Forward traversal allows using the current item `j` multiple times in the same step.
- Transition: `dp[i] = max(dp[i], val[j] + dp[i - wt[j]])`.

---

## Code

### Approach 1: 2-Row Parity DP

```cpp
class Solution {
  public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        int W = capacity;
        
        vector<vector<int>> dp(2, vector<int>(W + 1, 0));

        for (int j = 1; j <= n; j++) {
            for (int i = 1; i <= W; i++) {
                dp[j % 2][i] = dp[(j + 1) % 2][i];
                if (i >= wt[j - 1]) {
                    dp[j % 2][i] = max(dp[j % 2][i],
                                    max(val[j - 1] + dp[(j + 1) % 2][i - wt[j - 1]],
                                        val[j - 1] + dp[j % 2][i - wt[j - 1]]));
                }
            }
        }

        return dp[n % 2][W];
    }
};
```

### Approach 2: 1D Forward DP (Optimal)

```cpp
class Solution {
  public:
    int knapSack(vector<int>& val, vector<int>& wt, int capacity) {
        int n = val.size();
        int W = capacity;
        vector<int> dp(W + 1, 0);

        for (int j = 0; j < n; j++) {
            for (int i = wt[j]; i <= W; i++) {
                dp[i] = max(dp[i], val[j] + dp[i - wt[j]]);
            }
        }

        return dp[W];
    }
};
```
