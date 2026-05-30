# Rotate Image

**Link:** https://leetcode.com/problems/rotate-image/

## Problem
Given an n x n 2D matrix representing an image, rotate the image 90 degrees clockwise in-place. You must modify the input matrix directly without using another matrix.

## Solution
Two steps: first add 1000 to all values to distinguish originals. Then read column by column from bottom to top to fill the rotated matrix row by row. Finally subtract 1000 back. Alternatively: transpose (swap matrix[i][j] with matrix[j][i]), then reverse each row.

## Code
```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) {
            matrix[i][j] += 1000;
        }
    }

    int l = 0, r = 0;
    for(int i=0; i<n; i++) {
        for(int j=n-1; j>=0; j--) {
            int tem = matrix[j][i] % 2000;
            matrix[l][r++] += 2000 * (tem);
            if(r == n) {
                l++;
                r = 0;
            }
        }
    }

    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) {
            matrix[i][j] = (matrix[i][j] / 2000) - 1000;
        }
    }

    return;
}
```
