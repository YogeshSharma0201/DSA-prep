# Valid Sudoku

**Link:** https://leetcode.com/problems/valid-sudoku/

## Problem

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

## Solution

### Core Idea

To validate the Sudoku board in a single pass:
1. We define three 2D boolean grids of size `9 x 9` representing:
   - `rows[i][num]`: whether digit `num` has been seen in row `i`.
   - `cols[j][num]`: whether digit `num` has been seen in column `j`.
   - `boxes[boxIndex][num]`: whether digit `num` has been seen in sub-box `boxIndex`.
2. We map sub-boxes to a single index from `0` to `8` using the formula:
   $$\text{boxIndex} = \left(\frac{i}{3}\right) \times 3 + \frac{j}{3}$$
3. We traverse each cell of the `9 x 9` board:
   - If the cell is empty (`'.'`), we skip it.
   - If the cell contains a digit, we convert the character to a 0-indexed integer `num = board[i][j] - '1'`.
   - We check if `num` has already been marked `true` in `rows[i]`, `cols[j]`, or `boxes[boxIndex]`.
     - If yes, the board is invalid, so we return `false`.
     - If no, we mark it `true` in all three tracking arrays.
4. If the traversal completes without any rule violations, we return `true`.

**Time Complexity:** O(1) — The board is of fixed size $9 \times 9$, so the execution time is constant.  
**Space Complexity:** O(1) — The grids for tracking rows, columns, and sub-boxes are also of fixed size $9 \times 9$.

## Code

### Approach 1: Boolean Matrices for Tracking — O(1) time, O(1) space

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<vector<bool>> rows(9, vector<bool>(9,false));
        vector<vector<bool>> cols(9, vector<bool>(9,false));
        vector<vector<bool>> boxes(9, vector<bool>(9,false));

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    int num = board[i][j] - '1';
                    int boxIndex = (i / 3) * 3 + (j / 3);

                    if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
                        return false;
                    }

                    rows[i][num] = cols[j][num] = boxes[boxIndex][num] = true;
                }
            }
        }
        return true;
    }
};
```
