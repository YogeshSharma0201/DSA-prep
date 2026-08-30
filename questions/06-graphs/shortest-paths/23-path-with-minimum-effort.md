# Path With Minimum Effort

**Link:** https://leetcode.com/problems/path-with-minimum-effort/

## Problem
You are a hiker preparing for an upcoming hike. You are given a 2D array `heights` of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`. You are situated in the top-left cell `(0, 0)` and wish to travel to the bottom-right cell `(rows-1, columns-1)`. You can move up, down, left, or right, and you wish to find a route that requires the **minimum effort**.

A route's effort is the **maximum absolute difference** in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

## Solution
This problem can be solved using a variation of **Dijkstra's Algorithm**:

1. **State & Priority Queue**: Use a min-priority queue storing `{effort, {row, col}}` to always explore the path with the minimum maximum effort first.
2. **Distance Table**: Maintain a 2D array `dist[r][c]` storing the minimum effort required to reach cell `(r, c)`, initialized to infinity (`INT_MAX >> 1`), except `dist[0][0] = 0`.
3. **Traversal**:
   - Pop cell with minimum effort `d` and location `(r, c)`.
   - If `d >= dist[r][c]`, skip processing as a better path to `(r, c)` was already processed.
   - Set `dist[r][c] = d`.
   - For each of the 4 valid adjacent cells `(dx, dy)`:
     - Compute edge effort: `nextM = max(d, abs(heights[dx][dy] - heights[r][c]))`.
     - If `dist[dx][dy] <= nextM`, skip.
     - Push `{nextM, {dx, dy}}` into the priority queue.
4. **Result**: Return `dist[m-1][n-1]`.

### Complexity
- **Time Complexity:** O(E log V) = O(m * n log(m * n)) where $m \times n$ is the grid dimension.
- **Space Complexity:** O(m * n) for `dist` matrix and priority queue.

## Code
```cpp
class Solution {
    int dir[4][2] = {{0,1},{1,0},{-1,0},{0,-1}};
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        int inf = INT_MAX>>1;

        priority_queue<pair<int, pair<int,int>>, vector<pair<int, pair<int,int>>>, greater<>> pq;
        
        vector<vector<int>> dist(m, vector<int>(n, inf));
        pq.push({0, {0,0}});

        while(!pq.empty()) {
            auto [d, p] = pq.top(); pq.pop();

            if(d >= dist[p.first][p.second]) continue;
            dist[p.first][p.second] = d;


            for(auto di : dir) {
                int dx = p.first + di[0];
                int dy = p.second + di[1];

                if(dx < 0 || dx >= m || dy < 0 || dy >= n)
                    continue;

                int nextM = max(d, abs(heights[dx][dy] - heights[p.first][p.second]));

                if(dist[dx][dy] <= nextM) continue;

                pq.push({nextM, {dx, dy}});
            }
        }

        return dist[m-1][n-1];
    }
};
```
