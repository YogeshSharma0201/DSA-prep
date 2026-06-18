# Pacific Atlantic Water Flow

**Link:** https://leetcode.com/problems/pacific-atlantic-water-flow/

## Problem
Given an m x n grid of heights, rain water can flow to adjacent cells with equal or lower height. The Pacific Ocean touches the top and left edges; the Atlantic Ocean touches the bottom and right edges. Return all cells from which water can flow to both oceans.

## Solution
Instead of simulating water flowing down, reverse the flow and BFS/DFS upward from each ocean's border. Mark cells reachable from the Pacific and cells reachable from the Atlantic. Cells in both sets are the answer.

## Code
```cpp
class Solution {
    int m, n;
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

    void bfs(vector<vector<int>>& heights, queue<pair<int,int>>& q,
             vector<vector<bool>>& visited) {
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r+d[0], nc = c+d[1];
                if (nr<0||nr>=m||nc<0||nc>=n||visited[nr][nc]) continue;
                if (heights[nr][nc] >= heights[r][c]) {
                    visited[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
    }

public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        m = heights.size(); n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        queue<pair<int,int>> pq, aq;
        for (int i = 0; i < m; i++) {
            pac[i][0] = atl[i][n-1] = true;
            pq.push({i,0}); aq.push({i,n-1});
        }
        for (int j = 0; j < n; j++) {
            pac[0][j] = atl[m-1][j] = true;
            pq.push({0,j}); aq.push({m-1,j});
        }
        bfs(heights, pq, pac);
        bfs(heights, aq, atl);
        vector<vector<int>> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
        return res;
    }
};
```
