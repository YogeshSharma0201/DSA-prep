# Matrix Diagonal Sum

**Link:** https://leetcode.com/problems/matrix-diagonal-sum

## Problem
Given a square matrix `mat`, return the sum of the matrix diagonals. Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.

## Solution
Iterate through each row i. Add mat[i][i] (primary diagonal) and mat[i][n-1-i] (secondary diagonal). If the matrix size is odd, the center element is counted twice, so subtract it once at the end.

## Code
```cpp
int diagonalSum(vector<vector<int>>& mat) {
    int n = mat.size(), sum = 0;
    for (int i = 0; i < n; i++) {
        sum += mat[i][i] + mat[i][n-1-i];
    }
    if (n % 2 == 1) sum -= mat[n/2][n/2];
    return sum;
}
```
