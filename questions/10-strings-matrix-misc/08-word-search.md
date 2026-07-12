# Word Search

**Link:** https://leetcode.com/problems/word-search/

## Problem
Given an m x n grid of characters and a string word, return true if the word exists in the grid. The word can be constructed from sequentially adjacent cells (horizontally or vertically), and each cell may be used at most once.

## Solution
Try a DFS from every cell that matches the first character. Mark the current cell as visited by replacing it with '#', then recursively try all 4 directions for the next character. Backtrack by restoring the original character after each recursive call.

## Code
```cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, string& word, int i, int j, int idx) {
        if (idx == (int)word.size()) return true;
        if (i < 0 || i >= (int)board.size() || j < 0 || j >= (int)board[0].size()) return false;
        if (board[i][j] != word[idx]) return false;

        char tmp = board[i][j];
        board[i][j] = '#';
        bool found = dfs(board, word, i+1, j, idx+1) ||
                     dfs(board, word, i-1, j, idx+1) ||
                     dfs(board, word, i, j+1, idx+1) ||
                     dfs(board, word, i, j-1, idx+1);
        board[i][j] = tmp;
        return found;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};
```
