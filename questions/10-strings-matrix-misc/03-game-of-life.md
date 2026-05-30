# Game of Life

**Link:** https://leetcode.com/problems/game-of-life/

## Problem
Given an m x n board where each cell is 0 (dead) or 1 (alive), apply the Game of Life rules simultaneously to every cell. A live cell with 2-3 live neighbors survives; a dead cell with exactly 3 live neighbors becomes alive. Return the next state in-place.

## Solution
Use in-place encoding to avoid extra space: encode live-to-dead transitions as 2 and dead-to-live transitions as 3. Count live neighbors using `value % 2` (which recovers original state). In a second pass, convert 2 to 0 and 3 to 1.

## Code
```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int live = 0;
                for (auto& d : dirs) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n)
                        live += board[ni][nj] % 2;
                }
                if (board[i][j] == 1 && (live < 2 || live > 3))
                    board[i][j] = 2; // live -> dead
                else if (board[i][j] == 0 && live == 3)
                    board[i][j] = 3; // dead -> live
            }
        }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 2) board[i][j] = 0;
                else if (board[i][j] == 3) board[i][j] = 1;
            }
    }
};
```
