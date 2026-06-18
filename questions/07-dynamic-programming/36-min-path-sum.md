# Minimum Path Sum

**Link:** https://leetcode.com/problems/minimum-path-sum/

## Problem
Given an m x n grid filled with non-negative numbers, find a path from the top-left to the bottom-right which minimizes the sum of all numbers along its path. You can only move either down or right at any point.

## Solution
In-place DP: update the grid so that grid[i][j] holds the minimum cost to reach that cell. First fill the top row (cumulative sum leftward) and leftmost column (cumulative sum downward). For other cells: grid[i][j] += min(grid[i-1][j], grid[i][j-1]). Answer is grid[m-1][n-1].

## Code
```cpp
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    for (int i = 1; i < m; i++) grid[i][0] += grid[i-1][0];
    for (int j = 1; j < n; j++) grid[0][j] += grid[0][j-1];
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            grid[i][j] += min(grid[i-1][j], grid[i][j-1]);
    return grid[m-1][n-1];
}
```
