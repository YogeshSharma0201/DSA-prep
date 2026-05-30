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

    // Returns walls needed and fills threatened set; marks region cells
    int bfsRegion(vector<vector<int>>& grid, int si, int sj,
                  set<pair<int,int>>& threatened, int m, int n, int id) {
        int walls = 0;
        queue<pair<int,int>> q;
        q.push({si, sj});
        grid[si][sj] = -id; // mark visited with negative id
        while(!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for(auto& d : dirs) {
                int nr = r+d[0], nc = c+d[1];
                if(nr<0||nr>=m||nc<0||nc>=n) continue;
                if(grid[nr][nc] == 1 && grid[nr][nc] != -id) {
                    grid[nr][nc] = -id;
                    q.push({nr,nc});
                } else if(grid[nr][nc] == 0) {
                    threatened.insert({nr,nc});
                    walls++;
                }
            }
        }
        return walls;
    }

public:
    int containVirus(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int totalWalls = 0;

        while(true) {
            // Reset region marks to 1
            for(auto& row : grid)
                for(auto& cell : row)
                    if(cell < 0) cell = 1;

            vector<set<pair<int,int>>> regions;
            vector<int> wallCounts;
            vector<pair<int,int>> starts;
            int id = 1;

            for(int i=0; i<m; i++) {
                for(int j=0; j<n; j++) {
                    if(grid[i][j] == 1) {
                        set<pair<int,int>> threatened;
                        int w = bfsRegion(grid, i, j, threatened, m, n, ++id);
                        regions.push_back(threatened);
                        wallCounts.push_back(w);
                        starts.push_back({i,j});
                    }
                }
            }

            if(regions.empty()) break;

            // Find most threatening region
            int maxIdx = 0;
            for(int i=1; i<(int)regions.size(); i++)
                if(regions[i].size() > regions[maxIdx].size())
                    maxIdx = i;

            totalWalls += wallCounts[maxIdx];

            // Quarantine: freeze that region (set to 2)
            for(int i=0; i<m; i++)
                for(int j=0; j<n; j++)
                    if(grid[i][j] == -(maxIdx+2)) grid[i][j] = 2;

            // Restore other regions and spread
            for(int i=0; i<m; i++)
                for(int j=0; j<n; j++)
                    if(grid[i][j] < 0) grid[i][j] = 1;

            // Spread non-quarantined viruses
            bool spread = false;
            vector<pair<int,int>> toInfect;
            for(int i=0; i<m; i++)
                for(int j=0; j<n; j++)
                    if(grid[i][j] == 1)
                        for(auto& d : dirs) {
                            int ni = i+d[0], nj = j+d[1];
                            if(ni>=0&&ni<m&&nj>=0&&nj<n&&grid[ni][nj]==0) {
                                toInfect.push_back({ni,nj});
                                spread = true;
                            }
                        }
            for(auto& [r,c] : toInfect) grid[r][c] = 1;
            if(!spread) break;
        }
        return totalWalls;
    }
};
```
