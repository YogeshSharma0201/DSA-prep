# Snakes and Ladders

**Link:** https://leetcode.com/problems/snakes-and-ladders

## Problem
Given an n x n board numbered 1 to n*n in Boustrophedon style (alternating left-to-right and right-to-left from the bottom), each cell may contain a snake/ladder destination (-1 if none). Starting at cell 1, rolling a die gives 1-6 steps. Return the minimum number of dice rolls to reach cell n*n, or -1 if impossible.

## Solution
Use BFS from cell 1. For each current cell, try all 6 die rolls. Convert the target cell number to board (row, col) accounting for the alternating row direction. If that cell has a snake or ladder (value != -1), jump to that destination. Track visited cells and count rolls (BFS levels).

## Code
```cpp
int snakesAndLadders(vector<vector<int>>& board) {
    int n = board.size();
    vector<int> min_rolls(n * n + 1, -1);
    queue<int> q;
    min_rolls[1] = 0;
    q.push(1);
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        for (int i = 1; i <= 6 && x + i <= n * n; i++) {
            int t = x + i, row = (t - 1) / n, col = (t - 1) % n;
            int v = board[n - 1 - row][row % 2 ? n - 1 - col : col];
            int y = v > 0 ? v : t; // follow ladder / snake if present
            if (y == n * n)
                return min_rolls[x] + 1;
            if (min_rolls[y] == -1) {
                min_rolls[y] = min_rolls[x] + 1;
                q.push(y);
            }
        }
    }
    return -1;
}
```
