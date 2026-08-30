# Islands and Treasure (Walls and Gates)

**Links:**
- [Islands and Treasure - NeetCode](https://neetcode.io/problems/islands-and-treasure)
- [Walls and Gates - LeetCode 286](https://leetcode.com/problems/walls-and-gates/)

## Problem
You are given an $m \times n$ 2D grid initialized with three possible values:
- `-1`: Water cell / obstacle (wall) that cannot be traversed.
- `0`: Treasure chest / gate.
- `2147483647` (`INF`): Empty land cell.

Fill each empty land cell with the distance to its nearest treasure chest. If an empty cell cannot reach any treasure chest, it should remain `INF`.

---

## Solution (Multi-Source BFS)

Instead of running BFS from every empty cell (which would be inefficient), we use a **Multi-Source BFS** starting from all treasure chests simultaneously:

1. **Initialization:** Scan the entire grid and push the coordinates of all treasure chests (`grid[i][j] == 0`) into a queue.
2. **BFS Traversal:** Dequeue cells one by one. For each cell at `(x, y)` with distance `d = grid[x][y]`:
   - Explore all 4 orthogonal directions `(dx, dy)`.
   - If `(dx, dy)` is out of bounds or `grid[dx][dy] != INF` (already visited or obstacle), skip it.
   - Otherwise, update `grid[dx][dy] = d + 1` and push `(dx, dy)` into the queue.
3. Because BFS explores nodes in increasing order of distance, the first time an empty cell is reached, it is guaranteed to be via the shortest path from any treasure chest.

---

## Complexity Analysis

- **Time Complexity:** O(m * n) — Each cell is added and removed from the queue at most once.
- **Space Complexity:** O(m * n) — In the worst case, the queue may hold up to O(m * n) elements.

---

## Code

```cpp
class Solution {
public:
    int dir[4][2] = {{0,1},{1,0},{-1,0},{0,-1}};
    int inf = INT_MAX;

    void islandsAndTreasure(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();

        queue<pair<int,int>> q;

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(grid[i][j] == 0) {
                    q.push({i, j});
                }
            }
        }

        while(!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            int d = grid[x][y];

            for(auto di : dir) {
                int dx = x + di[0];
                int dy = y + di[1];

                if(dx < 0 || dx >= m || dy < 0 || dy >= n 
                        || grid[dx][dy] != inf)
                            continue;
                
                grid[dx][dy] = d + 1;
                q.push({dx, dy});
            }
        }
    }
};
```
