# Surrounded Regions

**Link:** https://leetcode.com/problems/surrounded-regions

## Problem
Given an m x n matrix board containing 'X' and 'O', capture all regions surrounded by 'X'. A region is surrounded if it is not connected (4-directionally) to any 'O' on the border. Flip all surrounded 'O' cells to 'X' in place.

## Solution
Any 'O' connected to the border cannot be flipped. Run DFS from every 'O' on the four borders, marking reachable 'O' cells as '#'. Then do a final pass: flip remaining 'O' to 'X' (they are truly surrounded) and '#' back to 'O'.

## Code
```cpp
class Solution {
public:
    void dfs(vector<vector<char>>& board, int i, int j) {
        int m = board.size(), n = board[0].size();
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
        board[i][j] = '#';
        dfs(board, i+1, j); dfs(board, i-1, j);
        dfs(board, i, j+1); dfs(board, i, j-1);
    }

    void solve(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size();
        // Mark all border-connected O's
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][n-1] == 'O') dfs(board, i, n-1);
        }
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[m-1][j] == 'O') dfs(board, m-1, j);
        }
        // Flip surrounded O's to X, restore border-connected # to O
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
            }
    }
};
```
