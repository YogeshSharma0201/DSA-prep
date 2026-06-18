# Set Matrix Zeroes

**Link:** https://leetcode.com/problems/set-matrix-zeroes

## Problem
Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. Do it in-place. You must use O(1) extra space (not counting the matrix itself).

## Solution
Use the first row and first column as markers. First check if the first row/column themselves contain zeros. Then iterate the rest of the matrix, marking the first row and column. Finally zero out rows and columns based on markers, and handle the first row/column last.

## Code
```cpp
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRowZero = true;
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstColZero = true;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
    if (firstRowZero) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero) for (int i = 0; i < m; i++) matrix[i][0] = 0;
}
```
