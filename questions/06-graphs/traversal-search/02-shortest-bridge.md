# Shortest Bridge

**Link:** https://leetcode.com/problems/shortest-bridge

## Problem
Given an n x n binary matrix containing exactly two islands (groups of connected 1s), return the minimum number of 0s you must flip to connect the two islands. You may flip 0s to 1s to bridge the gap.

## Solution
First, find a cell belonging to the first island and use DFS to mark all its cells with -1. Then use a priority queue (min heap on distance) starting from the boundary of island 1. Expand BFS outward, tracking distance. When a cell of island 2 (value 1) is reached, return the distance minus one.

## Code
```cpp
class Solution {
    int dir[4][2] = {{0,1},{1,0},{-1,0},{0,-1}};
public:
    int shortestBridge(vector<vector<int>>& grid) {
        int x, y;
        int n = grid.size();
        
        for(int i=0; i<n; i++) {
            for(int j=0; j<n; j++) {
                if(grid[i][j] == 1) {
                    x = i, y = j;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = INT_MAX>>1;
                }
            }
        }

        priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>, greater<>> pq;
        vector<vector<bool>> isVis(n, vector<bool>(n, false));
        pq.push({0, {x,y}});
        isVis[x][y] = true;

        while(!pq.empty()) {
            auto [d, p] = pq.top(); pq.pop();

            for(auto& di : dir) {
                int dx = p.first+di[0];
                int dy = p.second+di[1];

                if(dx >= 0 && dx < n && dy >= 0 && dy < n && !isVis[dx][dy]) {
                    if(grid[dx][dy] == 0 && grid[p.first][p.second]!=0) 
                        return d;

                    isVis[dx][dy] = true;
                    pq.push({min(grid[dx][dy], d+1), {dx, dy}});
                }
            }
        }

        return -1;
    }
};
```
