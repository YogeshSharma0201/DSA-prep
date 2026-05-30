# Shortest Path to Get All Keys

**Link:** https://leetcode.com/problems/shortest-path-to-get-all-keys

## Problem
Given a grid containing keys (lowercase letters), locks (uppercase letters), walls ('#'), and a starting position '@', find the minimum number of moves to collect all keys. You can only pass through a lock if you have the corresponding key.

## Solution
Use BFS where each state is (row, col, keysBitmask). The bitmask encodes which keys have been collected so far. When landing on a key cell, OR the bitmask with that key's bit. When landing on a lock, only proceed if the corresponding key bit is set. The goal state is when all keys are collected (bitmask = allKeys).

## Code
```cpp
class Solution {
public:
    int shortestPathAllKeys(vector<string>& grid) {
        int m = grid.size(), n = grid[0].size();
        int allKeys = 0, sr = 0, sc = 0;

        for(int i=0; i<m; i++)
            for(int j=0; j<n; j++) {
                if(grid[i][j] == '@') { sr = i; sc = j; }
                if(islower(grid[i][j]))
                    allKeys |= (1 << (grid[i][j] - 'a'));
            }

        // state: (row, col, keys)
        map<tuple<int,int,int>, bool> visited;
        queue<tuple<int,int,int,int>> q; // row, col, keys, steps
        q.push({sr, sc, 0, 0});
        visited[{sr, sc, 0}] = true;

        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

        while(!q.empty()) {
            auto [r, c, keys, steps] = q.front();
            q.pop();

            for(auto& d : dirs) {
                int nr = r+d[0], nc = c+d[1];
                if(nr<0 || nr>=m || nc<0 || nc>=n) continue;
                char ch = grid[nr][nc];
                if(ch == '#') continue;
                // Lock check
                if(isupper(ch) && !(keys & (1 << (ch - 'A')))) continue;

                int newKeys = keys;
                if(islower(ch)) newKeys |= (1 << (ch - 'a'));

                if(newKeys == allKeys) return steps + 1;

                if(!visited[{nr, nc, newKeys}]) {
                    visited[{nr, nc, newKeys}] = true;
                    q.push({nr, nc, newKeys, steps+1});
                }
            }
        }
        return -1;
    }
};
```
