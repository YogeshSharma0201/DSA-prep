# Rat in a Maze Problem - I

**Link:** https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1

## Problem
Consider a rat placed at `(0, 0)` in a square matrix `maze` of order `n * n`. It has to reach the destination at `(n - 1, n - 1)`. Find all possible paths that the rat can take to reach from source to destination. The directions in which the rat can move are 'U' (up), 'D' (down), 'L' (left), 'R' (right). Value 0 in the matrix blocks the path, and value 1 indicates it is open. 

The paths should be returned in lexicographically sorted order.

## Solution
Use backtracking (DFS) to explore all paths:
1. **DFS State:** Keep track of current coordinate `(x, y)` and the path traversed so far.
2. **Lexicographical Order:** By searching in the direction order `'D'`, `'L'`, `'R'`, `'U'`, the resulting paths are naturally generated in lexicographical order.
3. **Visitation/Backtracking:** Mark the current cell as blocked (`maze[x][y] = 0`) before making recursive calls so the rat does not visit the same cell again. After exploring all directions, restore it back to `1` (backtrack).
4. **Base Cases:**
   - Out of bounds or cell is `0`: Return.
   - Reached `(n-1, m-1)`: Store the current path in results.

## Code
```cpp
class Solution {
  public:
    int dir[4][2] = {{1,0},{0,-1},{0,1},{-1,0}};
    char d[4] = {'D','L','R','U'}; // This order will produce lexicographically sorted
    
    void dfs(int x, int y, vector<vector<int>>& maze, string& path, vector<string>& res) {
        int n = maze.size(), m = maze[0].size();
        
        if(x < 0 || x >= n || y < 0 || y >= m || maze[x][y] == 0) return;
        if(x==n-1 && y==m-1) {
            res.push_back(path);
            return;
        }
        
        maze[x][y] = 0;
        
        for(int i=0; i<4; i++) {
            path.push_back(d[i]);
            
            dfs(x+dir[i][0], y+dir[i][1], maze, path, res);
            
            path.pop_back();
        }
        
        maze[x][y] = 1;
    }
    
    vector<string> ratInMaze(vector<vector<int>>& maze) {
        vector<string> res;
        string path;
        
        dfs(0, 0, maze, path, res);
        
        return res;
    }
};
```
