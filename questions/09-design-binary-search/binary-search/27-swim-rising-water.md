# Swim in Rising Water

**Link:** https://leetcode.com/problems/swim-in-rising-water/

## Problem
You are given an n x n grid where `grid[i][j]` is the elevation at cell (i, j). At time t you can swim to an adjacent cell if both cells have elevation at most t. Find the minimum time t to swim from the top-left corner (0, 0) to the bottom-right corner (n-1, n-1).

## Solution
Use a Dijkstra-like approach with a min-heap. The "cost" to reach a cell is the maximum elevation encountered along the path. Initialize with `(grid[0][0], 0, 0)`. For each popped cell, try all four neighbors; the cost to reach a neighbor is `max(currentCost, grid[nr][nc])`. Push to heap if this is an improvement. Return when (n-1, n-1) is reached.

## Code
```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<int>> dist(n, vector<int>(n, INT_MAX));
        using T = tuple<int,int,int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        dist[0][0] = grid[0][0];
        pq.push({grid[0][0], 0, 0});
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

        while (!pq.empty()) {
            auto [cost, r, c] = pq.top(); pq.pop();
            if (r == n-1 && c == n-1) return cost;
            if (cost > dist[r][c]) continue;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
                int newCost = max(cost, grid[nr][nc]);
                if (newCost < dist[nr][nc]) {
                    dist[nr][nc] = newCost;
                    pq.push({newCost, nr, nc});
                }
            }
        }
        return dist[n-1][n-1];
    }
};
```
