# Making A Large Island

**Link:** https://leetcode.com/problems/making-a-large-island/

## Problem
Given an `n x n` binary grid, you may change at most one `0` to a `1`. Return the size of the largest island possible after doing so.

## Solution
Two passes over the grid:
1. **Label islands.** For every unvisited `1`, DFS-flood-fill it with a unique id (starting at `2`, since `0` and `1` are taken), counting its size along the way. Store `id -> size` in a map and track the max island size seen so far.
2. **Try each `0`.** For every `0` cell, look at its (up to 4) neighbors, collect the *distinct* island ids touching it (a `set` avoids double-counting when two neighbors belong to the same island), and sum `1` (for the flipped cell itself) plus each distinct neighboring island's size. Update the running max.

If the grid is all `1`s, the first pass alone already captures the answer since the second loop never executes.

## Code
```cpp
class Solution {
public:
    int dir[4][2] = {{0,1}, {1,0}, {-1,0}, {0,-1}};

    void dfs(vector<vector<int>>& grid, int x, int y, int& id, int& count) {
        int n = grid.size(), m = grid[0].size();

        if(x < 0 || x >= n || y < 0 || y >= m || grid[x][y] == 0 || grid[x][y] == id) return;

        grid[x][y] = id;
        count++;

        for(auto& d : dir) {
            int xi = x + d[0];
            int yi = y + d[1];

            dfs(grid, xi, yi, id, count);
        }
    }

    int largestIsland(vector<vector<int>>& grid) {
        unordered_map<int,int> umap;
        int id = 2;

        int n = grid.size(), m = grid[0].size();

        int maxA = 0;
        for(int i=0; i<n; i++) {
            for(int j=0; j<m; j++) {
                if(grid[i][j] == 1) {
                    int cnt = 0;
                    dfs(grid, i, j, id, cnt);
                    umap[id++] = cnt;
                    maxA = max(maxA, cnt);
                }
            }
        }

        for(int i=0; i<n; i++) {
            for(int j=0; j<m; j++) {
                int currA = 1;
                set<int> ids;
                if(grid[i][j] == 0) {
                    for(auto& d : dir) {
                        int xi = i + d[0];
                        int yi = j + d[1];

                        if(xi < 0 || xi >= n || yi < 0 || yi >= m || grid[xi][yi] == 0) {
                            continue;
                        }

                        ids.insert(grid[xi][yi]);
                    }
                }
                for(auto& idi: ids) {
                    currA += umap[idi];
                }
                maxA = max(maxA, currA);
            }
        }

        return maxA;
    }
};
```
