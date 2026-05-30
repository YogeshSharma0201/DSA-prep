# Maximal Square

**Link:** https://leetcode.com/problems/maximal-square

## Problem
Given an m x n binary matrix filled with '0's and '1's, find the largest square containing only '1's and return its area. The area is the side length squared. This requires an efficient approach beyond brute force.

## Solution
DP where dp[i+1][j+1] = side length of the largest square whose bottom-right corner is at matrix[i][j]. If matrix[i][j] == '1', then dp[i+1][j+1] = min(dp[i][j+1], dp[i+1][j], dp[i][j]) + 1 (limited by the smallest square in the three adjacent directions). Track the global maximum side length and return maxS * maxS.

## Code
```cpp
int maximalSquare(vector<vector<char>>& mat) {
    int n = mat.size(), m = mat[0].size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));

    int maxS = 0;

    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) {
            if(mat[i][j] == '1')
                dp[i+1][j+1] = min(dp[i+1][j], min(dp[i][j+1], dp[i][j])) + 1;

            maxS = max(maxS, dp[i+1][j+1]);
        }
    }

    return maxS * maxS;
}
```
