# 0/1 Knapsack Problem

**Link:** https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1

## Problem
Given weights and values of N items, and a knapsack of capacity W, find the maximum value that can be put in the knapsack. Each item can be included at most once (0/1 choice).

---

## Solutions

### Approach 1: 2D Dynamic Programming — O(N * W) Time, O(N * W) Space
- `dp[i][w]` stores the max value considering the first `i` items with capacity `w`.
- **State Transition:**
  $$\text{dp}[i][w] = \max(\text{dp}[i-1][w], \text{val}[i-1] + \text{dp}[i-1][w - \text{wt}[i-1]])$$

### Approach 2: 2-Row DP (Parity Modulo Optimization) — O(N * W) Time, O(W) Space
- Since row `i` only depends on row `i-1`, we use a $2 \times (W+1)$ table where current row is `i % 2` and previous row is `(i - 1) % 2`.
- **Crucial Rule:** Items `i` MUST be the outer loop and capacity `w` MUST be the inner loop to prevent data corruption across items.

### Approach 3: 1D Space-Optimized DP — O(N * W) Time, O(W) Space (Optimal)
- Uses a single array `dp[W + 1]`.
- Iterate capacity `w` **backwards** from `W` down to `wt[i]` to ensure values from previous state `i-1` are preserved during updates.

---

## Code

### Approach 1: 2D DP Table

```cpp
class Solution {
  public:
    int knapsack(int W, vector<int> &val, vector<int> &wt) {
        int n = val.size();
        vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                dp[i][w] = dp[i - 1][w];
                if (w >= wt[i - 1]) {
                    dp[i][w] = max(dp[i][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
                }
            }
        }
        return dp[n][W];
    }
};
```

### Approach 2: 2-Row Space Optimization (Modulo 2)

```cpp
class Solution {
  public:
    int knapsack(int W, vector<int> &val, vector<int> &wt) {
        int n = val.size();
        vector<vector<int>> dp(2, vector<int>(W + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                dp[i % 2][w] = dp[(i - 1) % 2][w];
                if (w >= wt[i - 1]) {
                    dp[i % 2][w] = max(dp[i % 2][w], val[i - 1] + dp[(i - 1) % 2][w - wt[i - 1]]);
                }
            }
        }
        return dp[n % 2][W];
    }
};
```

### Approach 3: 1D Space Optimization (Optimal)

```cpp
class Solution {
  public:
    int knapsack(int W, vector<int> &val, vector<int> &wt) {
        int n = val.size();
        vector<int> dp(W + 1, 0);
        
        for (int i = 0; i < n; i++) {
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
            }
        }
        return dp[W];
    }
};
```

