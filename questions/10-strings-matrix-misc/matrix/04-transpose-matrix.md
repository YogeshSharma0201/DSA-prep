# Transpose Matrix

**Link:** https://leetcode.com/problems/transpose-matrix

## Problem
Given a 2D integer array `matrix`, return the transpose of the matrix. The transpose of a matrix is a new matrix where rows and columns are swapped: the element at row i, column j becomes the element at row j, column i.

## Solution
Create a new matrix of size n x m (swapping dimensions). For each element (i, j) in the original matrix, place it at position (j, i) in the result. This is straightforward with a nested loop.

> [!NOTE]
> An **in-place** transpose (using `std::swap` to swap elements across the main diagonal) is only possible if the matrix is **square** ($N = M$). For rectangular matrices ($N \neq M$), transposing requires changing the dimensions of the grid structure, so allocating a new matrix is necessary.

## Code
```cpp
vector<vector<int>> transpose(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> result(n, vector<int>(m));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            result[j][i] = matrix[i][j];
    return result;
}
```
