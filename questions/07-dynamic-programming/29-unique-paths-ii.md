# Unique Paths II

**Link:** https://leetcode.com/problems/unique-paths-ii/

## Problem
You are given an m x n grid where some cells have obstacles (marked 1) and others are free (marked 0). Starting from the top-left corner, find the number of unique paths to the bottom-right corner, moving only right or down. You cannot step on obstacles.

## Solution
DP where `dp[i][j]` = number of paths to reach cell (i, j). If the cell is an obstacle, dp[i][j] = 0. Otherwise, dp[i][j] = dp[i-1][j] + dp[i][j-1]. Initialize top-left to 1 if not an obstacle. Can be done in-place or with a 1D rolling array.

## Code
```cpp
int uniquePathsWithObstacles(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    if (grid[0][0] == 1) return 0;
    vector<long long> dp(n, 0);
    dp[0] = 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) { dp[j] = 0; continue; }
            if (j > 0) dp[j] += dp[j-1];
        }
    }
    return dp[n-1];
}
```
