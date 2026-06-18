# Diagonal Traverse

**Link:** https://leetcode.com/problems/diagonal-traverse

## Problem
Given an m x n matrix `mat`, return an array of all elements of the matrix in diagonal order, traversing diagonals alternately upward-right and downward-left.

## Solution
There are m+n-1 diagonals. For diagonal d, elements have row+col = d. Collect elements on each diagonal, then reverse the collection for every other diagonal (even diagonals go up-right). Concatenate all diagonals.

## Code
```cpp
vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
    int m = mat.size(), n = mat[0].size();
    vector<int> result;
    for (int d = 0; d < m + n - 1; d++) {
        vector<int> diag;
        int rStart = (d < n) ? 0 : d - n + 1;
        int cStart = (d < n) ? d : n - 1;
        for (int r = rStart, c = cStart; r < m && c >= 0; r++, c--)
            diag.push_back(mat[r][c]);
        if (d % 2 == 0) reverse(diag.begin(), diag.end());
        for (int x : diag) result.push_back(x);
    }
    return result;
}
```
