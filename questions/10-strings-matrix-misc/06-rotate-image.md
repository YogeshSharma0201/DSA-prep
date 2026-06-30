# Rotate Image

**Link:** https://leetcode.com/problems/rotate-image/

## Problem
Given an n x n 2D matrix representing an image, rotate the image 90 degrees clockwise in-place. You must modify the input matrix directly without using another matrix.

## Solution
Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]` for `j > i`), then reverse each row. Together these produce a 90° clockwise rotation in-place.

## Code
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int row = matrix.size();
        int col = matrix[0].size();

        for (int i = 0; i < row; i++)
            for (int j = i+1; j < col; j++)
                swap(matrix[i][j], matrix[j][i]);

        for (int k = 0; k < row; k++)
            reverse(matrix[k].begin(), matrix[k].end());
    }
};
```
