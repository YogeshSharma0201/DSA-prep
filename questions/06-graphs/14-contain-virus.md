# Contain Virus

**Link:** https://leetcode.com/problems/contain-virus

## Problem
Given a 2D grid where 1s represent virus and 0s represent uninfected cells, each day you can build walls around one virus region to quarantine it (the one that would infect the most new cells). All other virus regions then spread. Return the total number of walls used.

## Solution
Simulate day by day using BFS. Each day: find all distinct virus regions via BFS/DFS, for each region compute the set of threatened uninfected neighbors and the walls needed. Quarantine the most threatening region (build walls around it, freeze it). Then spread all other virus regions to their neighbors. Repeat until no more spreading is possible.

## Code
```cpp
class Solution {
    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

    // Returns walls needed and fills threatened set; marks region cells as -id
    int bfsRegion(vector<vector<int>>& grid, int si, int sj,
                  set<pair<int,int>>& threatened, int m, int n, int id) {
        int walls = 0;
        queue<pair<int,int>> q;
        q.push({si, sj});
        grid[si][sj] = -id;
        while(!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for(auto& d : dirs) {
                int nr = r+d[0], nc = c+d[1];
                if(nr<0||nr>=m||nc<0||nc>=n) continue;
                if(grid[nr][nc] == 1) { grid[nr][nc] = -id; q.push({nr,nc}); }
                else if(grid[nr][nc] == 0) { threatened.insert({nr,nc}); walls++; }
            }
        }
        return walls;
    }

public:
    int containVirus(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), totalWalls = 0;

        while(true) {
            for(auto& row : grid)
                for(auto& cell : row)
                    if(cell < 0) cell = 1;

            vector<set<pair<int,int>>> regions;
            vector<int> wallCounts;
            int maxIdx = 0, id = 1;

            for(int i=0; i<m; i++)
                for(int j=0; j<n; j++)
                    if(grid[i][j] == 1) {
                        set<pair<int,int>> threatened;
                        wallCounts.push_back(bfsRegion(grid, i, j, threatened, m, n, ++id));
                        regions.push_back(move(threatened));
                        if(regions.back().size() > regions[maxIdx].size()) maxIdx = regions.size()-1;
                    }

            if(regions.empty()) break;

            totalWalls += wallCounts[maxIdx];

            // Quarantine most threatening region (set to 2), restore others to 1
            // Region k gets id k+2, so its cells are marked -(k+2)
            for(auto& row : grid)
                for(auto& cell : row)
                    if(cell < 0) cell = (cell == -(maxIdx+2)) ? 2 : 1;

            // Spread non-quarantined viruses using already-computed threatened sets
            bool spread = false;
            for(int i=0; i<(int)regions.size(); i++)
                if(i != maxIdx)
                    for(auto& [r,c] : regions[i]) { grid[r][c] = 1; spread = true; }
            if(!spread) break;
        }
        return totalWalls;
    }
};
```
