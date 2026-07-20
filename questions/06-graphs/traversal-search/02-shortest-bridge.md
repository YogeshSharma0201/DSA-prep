# Shortest Bridge

**Link:** https://leetcode.com/problems/shortest-bridge

## Problem
Given an n x n binary matrix containing exactly two islands (groups of connected 1s), return the minimum number of 0s you must flip to connect the two islands. You may flip 0s to 1s to bridge the gap.

## Solution
First, find a cell belonging to the first island and use DFS to mark all its cells with -1. Then use a priority queue (min heap on distance) starting from the boundary of island 1. Expand BFS outward, tracking distance. When a cell of island 2 (value 1) is reached, return the distance minus one.

## Code
```cpp
class Solution {
public:
    int dir[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};

    int shortestBridge(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();

        int x = -1, y = -1;
        for(int i=0; i<n; i++) {
            for(int j=0; j<m; j++) {
                if(grid[i][j] == 1) {
                    x = i, y = j;
                    grid[i][j] = -1;
                }
                else {
                    grid[i][j] = -1*(INT_MAX>>1);
                }
            }
        }

        priority_queue<pair<int,pair<int,int>>> q;
        q.push({-1, {x,y}});
        vector<vector<int>> isVis(n, vector<int>(m, false));

        isVis[x][y] = true;
        while(!q.empty()) {
            pair<int,pair<int,int>> v = q.top();
            q.pop();

            int val = v.first;
            x = v.second.first;
            y = v.second.second;

            for(int i=0; i<4; i++) {
                int dx = x + dir[i][0];
                int dy = y + dir[i][1];

                if(dx < 0 || dx >= n || dy < 0 || dy >= m) continue;

                if(!isVis[dx][dy]) {
                    isVis[dx][dy] = true;
                    grid[dx][dy] = max(grid[dx][dy], val-1);
                    if(val!=-1 && grid[dx][dy]==-1) return -1*val-1;
                    q.push({grid[dx][dy], {dx, dy}});
                }
            }
        }

        return 0;
    }
};
```
