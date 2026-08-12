# N-Queens & N-Queens II

**Links:**
- **N-Queens:** https://leetcode.com/problems/n-queens/ (LeetCode 51)
- **N-Queens II:** https://leetcode.com/problems/n-queens-ii/ (LeetCode 52)

---

## Problem Overview
The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other (no two queens share the same row, column, or diagonal).

- **N-Queens (LeetCode 51):** Return all distinct solutions to the puzzle in the form of a board configuration (`vector<vector<string>>`), where `'Q'` and `'.'` indicate a queen and an empty space respectively.
- **N-Queens II (LeetCode 52):** Return the total number of distinct solutions.

---

## Solution (Backtracking Row by Row)

### Common Logic
Backtrack row by row, placing exactly one queen per row (so row conflicts are impossible by construction). For each row `x`, try every column `j` and validate with `gridCheck`:
- **Column check**: Scan column `y` across all rows above `x` for an existing queen.
- **Diagonal checks**: Walk both the upper-left (`i--, j--`) and upper-right (`i--, j++`) diagonals from `(x, y)` upward, since only rows above the current one can already have queens placed.

If placement is valid:
1. Mark the queen at `grid[x][j] = 1`.
2. Recurse into row `x + 1`.
3. Backtrack (unmark) `grid[x][j] = 0` to try the next column.

---

## Changes for N-Queens (LeetCode 51) vs N-Queens II (LeetCode 52)

1. **Return Type & State Passing**:
   - **N-Queens II:** DFS returns `int` (counting valid placements) and sums counts across branches.
   - **N-Queens I:** DFS returns `void` and accepts `vector<vector<string>>& res` by reference to collect solutions.
2. **Base Case (`x == n`)**:
   - **N-Queens II:** Returns `1` when `x == n`.
   - **N-Queens I:** Converts the `grid` into a `vector<string>` (mapping `1 -> "Q"` and `0 -> "."`), pushes it to `res`, and returns.

---

## Code: N-Queens I (LeetCode 51)

```cpp
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    bool gridCheck(vector<vector<int>>& grid, int x, int y) {
        int n = grid.size();

        // Column check
        for (int j = 0; j < n; j++) {
            if (grid[j][y] == 1) {
                return false;
            }
        }

        // Check upper-left diagonal
        for (int i = x, j = y; i >= 0 && j >= 0; i--, j--) {
            if (grid[i][j] == 1) {
                return false;
            }
        }

        // Check upper-right diagonal
        for (int i = x, j = y; i >= 0 && j < n; i--, j++) {
            if (grid[i][j] == 1) {
                return false;
            }
        }

        return true;
    }

    void dfs(vector<vector<int>>& grid, int idx, int x, int y, vector<vector<string>>& res) {
        int n = grid.size();
        
        // End of row reached -> all N queens placed successfully
        if (x == n) {
            vector<string> out;
            for (auto& row : grid) {
                string s = "";
                for (auto& col : row) {
                    if (col == 1) s += "Q";
                    else s += ".";
                }
                out.push_back(s);
            }
            res.push_back(out);
            return;
        }

        for (int j = 0; j < n; j++) {
            if (gridCheck(grid, x, j)) {
                grid[x][j] = 1;
                dfs(grid, idx + 1, x + 1, j, res);
                grid[x][j] = 0; // Backtrack
            }
        }
    }

    vector<vector<string>> solveNQueens(int n) {
        vector<vector<int>> grid(n, vector<int>(n, 0));
        vector<vector<string>> res;
        
        dfs(grid, 0, 0, 0, res);

        return res;
    }
};
```

---

## Code: N-Queens II (LeetCode 52)

```cpp
#include <vector>

using namespace std;

class Solution {
public:
    bool gridCheck(vector<vector<int>>& grid, int x, int y) {
        int n = grid.size();

        // Column check
        for (int j = 0; j < n; j++) {
            if (grid[j][y] == 1) {
                return false;
            }
        }

        // Check upper-left diagonal
        for (int i = x, j = y; i >= 0 && j >= 0; i--, j--) {
            if (grid[i][j] == 1) {
                return false;
            }
        }

        // Check upper-right diagonal
        for (int i = x, j = y; i >= 0 && j < n; i--, j++) {
            if (grid[i][j] == 1) {
                return false;
            }
        }

        return true;
    }

    int dfs(vector<vector<int>>& grid, int idx, int x, int y) {
        int n = grid.size();
        
        // End of row reached -> found 1 valid solution
        if (x == n) return 1;

        int count = 0;
        for (int j = 0; j < n; j++) {
            if (gridCheck(grid, x, j)) {
                grid[x][j] = 1;
                count += dfs(grid, idx + 1, x + 1, j);
                grid[x][j] = 0; // Backtrack
            }
        }

        return count;
    }

    int totalNQueens(int n) {
        vector<vector<int>> grid(n, vector<int>(n, 0));
        
        return dfs(grid, 0, 0, 0);
    }
};
```
