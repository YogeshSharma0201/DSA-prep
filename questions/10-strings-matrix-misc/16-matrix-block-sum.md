# Matrix Block Sum

**Link:** https://leetcode.com/problems/matrix-block-sum

## Problem
Given an m x n matrix `mat` and an integer `k`, return a matrix `answer` where `answer[i][j]` is the sum of all elements `mat[r][c]` where i-k <= r <= i+k and j-k <= c <= j+k.

## Solution
Build a 2D prefix sum array. Then for each cell (i,j), use the prefix sum to compute the block sum in O(1) by querying the rectangle bounded by (max(0, i-k), max(0, j-k)) to (min(m-1, i+k), min(n-1, j+k)).

## Code
```cpp
vector<vector<int>> matrixBlockSum(vector<vector<int>>& mat, int k) {
    int m = mat.size(), n = mat[0].size();
    vector<vector<int>> prefix(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            prefix[i][j] = mat[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
    vector<vector<int>> ans(m, vector<int>(n));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            int r1 = max(0, i-k)+1, c1 = max(0, j-k)+1;
            int r2 = min(m-1, i+k)+1, c2 = min(n-1, j+k)+1;
            ans[i][j] = prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1];
        }
    }
    return ans;
}
```
