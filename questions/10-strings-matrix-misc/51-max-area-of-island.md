# Max Area of Island

**Link:** https://leetcode.com/problems/max-area-of-island

## Problem
Given a binary matrix `grid`, an island is a group of 1s connected 4-directionally. Find the maximum area of an island (number of cells with value 1) in the grid. Return 0 if there are no islands.

## Solution
DFS from each unvisited 1. Mark cells as visited (set to 0) and recursively count all connected 1s. Track the maximum area found across all DFS calls.

## Code
```cpp
int dfs(vector<vector<int>>& grid, int i, int j) {
    int m = grid.size(), n = grid[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) return 0;
    grid[i][j] = 0;
    return 1 + dfs(grid, i+1, j) + dfs(grid, i-1, j) + dfs(grid, i, j+1) + dfs(grid, i, j-1);
}

int maxAreaOfIsland(vector<vector<int>>& grid) {
    int maxArea = 0;
    for (int i = 0; i < grid.size(); i++)
        for (int j = 0; j < grid[0].size(); j++)
            if (grid[i][j] == 1)
                maxArea = max(maxArea, dfs(grid, i, j));
    return maxArea;
}
```
