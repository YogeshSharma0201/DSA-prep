# Number of Islands

**Link:** https://leetcode.com/problems/number-of-islands/

## Problem
Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is a group of adjacent '1's connected horizontally or vertically. The grid is surrounded by water on all sides.

## Solution
Iterate through every cell. When an unvisited '1' is found, increment the island count and launch a BFS/DFS to mark all connected land cells as visited. The total number of BFS/DFS launches equals the number of islands.

## Code
```cpp
class Solution {
public:
    void bfs(vector<vector<char>>& grid, vector<vector<bool>>& isVisited, int r, int c) {
        int n = grid.size(), m = grid[0].size();

        queue<pair<int,int>> q;
        q.push({r,c});
        isVisited[r][c] = true;

        int dir[4][2] = {
            {-1,0}, {1,0}, {0,-1}, {0,1}
        };

        while(q.size()) {
            pair<int,int> p = q.front();
            q.pop();

            for(int i=0; i<4; i++) {
                int nextx = p.first+dir[i][0];
                int nexty = p.second+dir[i][1];

                if(nextx >= 0 && nextx < n && nexty >= 0 && nexty < m && grid[nextx][nexty] == '1' && !isVisited[nextx][nexty]) {
                    isVisited[nextx][nexty] = true;
                    q.push({nextx, nexty});
                }
            }
        }
    }

    int numIslands(vector<vector<char>>& grid) {
        vector<vector<bool>> isVisited(grid.size(), vector<bool>(grid[0].size(), false));

        int ret = 0;

        for(int i=0; i<grid.size(); i++) {
            for(int j=0; j<grid[0].size(); j++) {
                if(grid[i][j] == '1' && !isVisited[i][j]) {
                    ret++;
                    bfs(grid, isVisited, i, j);
                }
            }
        }

        return ret;
    }
};
```
