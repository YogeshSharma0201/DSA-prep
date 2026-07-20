# N-Queens II

**Link:** https://leetcode.com/problems/n-queens-ii/

## Problem
Given an integer `n`, return the number of distinct solutions to the n-queens puzzle — placing `n` queens on an `n x n` chessboard so that no two queens attack each other (no shared row, column, or diagonal).

## Solution
Backtrack row by row, placing exactly one queen per row (so row conflicts are impossible by construction). For each row `x`, try every column `j` and validate with `gridCheck`:
- **Column check**: scan column `y` across all rows for an existing queen.
- **Diagonal checks**: walk both the upper-left (`i--, j--`) and upper-right (`i--, j++`) diagonals from `(x, y)` upward, since only rows above the current one can already have queens placed.

If placement is valid, mark it, recurse into row `x+1`, then backtrack (unmark) to try the next column. When `x == n`, all queens are placed — count this as one valid solution.

## Code
```cpp
class Solution {
public:
    bool gridCheck(vector<vector<int>>& grid, int x, int y) {
        int n = grid.size();

        // row check if not needed and it is a new row always

        // column check
        for(int j=0; j<n; j++) {
            if(grid[j][y] == 1) {
                return false;
            }
        }

        // check upper left diagonal
        for(int i=x,j=y; i>=0 && j>=0; i--,j--) {
            if(grid[i][j] == 1) {
                return false;
            }
        }

        // check upper right diagonal
        for(int i=x,j=y; i>=0 && j<n; i--,j++) {
            if(grid[i][j] == 1) {
                return false;
            }
        }

        return true;
    }

    int dfs(vector<vector<int>>& grid, int idx, int x, int y) {
        int n = grid.size();
        
        // End of row will be reached when N queens will be placed
        if(x == n) return 1;

        int count = 0;
        for(int j = 0; j<n; j++) {
            if(gridCheck(grid, x, j)) {
                grid[x][j] = 1;
                count += dfs(grid, idx+1, x+1, j);
                grid[x][j] = 0;
            }
        }

        return count;
    }

    int totalNQueens(int n) {
        vector<vector<int>> grid(n, vector<int>(n,0));
        
        return dfs(grid, 0, 0, 0);
    }
};
```
