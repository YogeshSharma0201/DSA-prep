# Count Square Submatrices with All Ones

**Link:** https://leetcode.com/problems/count-square-submatrices-with-all-ones

## Problem
Given a binary matrix, return the number of square submatrices that have all ones. A square submatrix of size k means all k*k cells in it are 1.

## Solution
DP where dp[i][j] = size of the largest square with bottom-right corner at (i,j). dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if matrix[i][j] == 1. The value of dp[i][j] counts squares of all sizes up to dp[i][j], so sum all dp values for the answer.

## Code
```cpp
int countSquares(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size(), total = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] && i > 0 && j > 0)
                matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
            total += matrix[i][j];
        }
    }
    return total;
}
```
