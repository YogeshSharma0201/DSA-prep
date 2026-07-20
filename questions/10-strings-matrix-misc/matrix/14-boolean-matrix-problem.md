# Boolean Matrix Problem

**Link:** https://www.geeksforgeeks.org/problems/boolean-matrix-problem-1587115620/1

## Problem
Given a boolean matrix of size r x c, if a cell contains 1, set all cells in that row and column to 1. Modify the matrix in-place without using any extra matrix.

## Solution
First scan the matrix recording which rows and columns contain at least one 1. Then do a second pass: set each cell to 1 if its row or column was marked. Use two boolean arrays of size r and c to track which rows/columns have a 1.

## Code
```cpp
void booleanMatrix(vector<vector<int>>& matrix) {
    int r = matrix.size(), c = matrix[0].size();
    vector<bool> rowHas1(r, false), colHas1(c, false);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (matrix[i][j]) { rowHas1[i] = true; colHas1[j] = true; }
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (rowHas1[i] || colHas1[j]) matrix[i][j] = 1;
}
```
