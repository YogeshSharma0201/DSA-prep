# Spiral Matrix

**Link:** https://leetcode.com/problems/spiral-matrix/

## Problem
Given an m x n matrix, return all elements of the matrix in spiral order. Traversal starts from the top-left, goes right across the top row, down the right column, left across the bottom row, and up the left column, then repeats inward.

## Solution
Walk the matrix cell by cell, always moving in the current direction. When the next cell is out-of-bounds or already visited, turn clockwise using a direction map before moving.

**Direction cycle:** right → down → left → up → right → ...
Encoded as `(dx, dy)` pairs: `(0,1) → (1,0) → (0,-1) → (-1,0) → (0,1)`

## Code
```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        map<pair<int,int>, pair<int,int>> dir = {
            {{0,1},  {1,0}},
            {{1,0},  {0,-1}},
            {{0,-1}, {-1,0}},
            {{-1,0}, {0,1}},
        };

        vector<vector<bool>> visited(m, vector<bool>(n, false));
        vector<int> res;

        int ci = 0, cj = 0, dx = 0, dy = 1;

        while (true) {
            res.push_back(matrix[ci][cj]);
            visited[ci][cj] = true;

            if ((int)res.size() == m * n) break;

            int x = ci + dx;
            int y = cj + dy;

            if (x < 0 || x >= m || y < 0 || y >= n || visited[x][y]) {
                tie(dx, dy) = dir[{dx, dy}];
                x = ci + dx;
                y = cj + dy;
            }

            ci = x;
            cj = y;
        }

        return res;
    }
};
```
