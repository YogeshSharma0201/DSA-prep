# Swim in Rising Water

**Link:** https://leetcode.com/problems/swim-in-rising-water/

## Problem
You are given an `n x n` integer matrix `grid` where each cell `grid[i][j]` represents the elevation at that point `(i, j)`.

The rain starts to fall. At time `t`, the depth of the water everywhere is `t`. You can swim from a cell to another 4-directionally adjacent cell if and only if the elevation of both cells is at most `t`. You can swim infinite distance in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return *the minimum time `t` such that you can reach the bottom-right cell `(n - 1, n - 1)` starting from the top-left cell `(0, 0)`*.

## Solution
This problem can be modeled as finding a path from `(0, 0)` to `(m-1, n-1)` that minimizes the maximum cell elevation encountered along the path. This is a classic variation of **Dijkstra's Algorithm**:

1. **Min-Priority Queue**: Store state as `{time, {row, col}}`, prioritized by minimum time/elevation.
2. **Time Matrix (`time`)**: Maintain a 2D array initialized to `INF` to keep track of the minimum required time to reach each cell.
3. **Traversal**:
   - Pop the cell `(r, c)` with the minimum time `t`.
   - If `time[r][c] <= t`, skip as we've already reached `(r, c)` via a smaller or equal maximum elevation path.
   - Set `time[r][c] = t`.
   - Explore all 4 adjacent neighbors `(dx, dy)`. The time to reach `(dx, dy)` is `nextM = max(t, grid[dx][dy])`.
   - If `time[dx][dy] > nextM`, push `{nextM, {dx, dy}}` into the priority queue.
4. **Result**: `time[m-1][n-1]` stores the minimum time needed to reach the destination.

### Complexity
- **Time Complexity:** O(V log V + E log V) = O(m * n log(m * n)) where $m \times n$ is the grid size.
- **Space Complexity:** O(m * n) for storing the `time` matrix and priority queue elements.

## Code
```cpp
class Solution {
    int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
public:
    int swimInWater(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int inf = INT_MAX>>1;

        vector<vector<int>> time(m, vector<int>(n, inf));
        priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>, greater<>> pq;

        pq.push({grid[0][0], {0,0}});

        while(!pq.empty()) {
            auto [t, p] = pq.top(); pq.pop();
            if(time[p.first][p.second] <= t) continue;
            time[p.first][p.second] = t;

            for(auto di : dir) {
                int dx = p.first + di[0];
                int dy = p.second + di[1];

                if(dx < 0 || dx >= m || dy < 0 || dy >= n)
                    continue;
                
                int nextM = max(t, grid[dx][dy]);

                if(time[dx][dy] > nextM) {
                    pq.push({nextM, {dx, dy}});
                }
            }
        }

        return time[m-1][n-1];
    }
};
```
