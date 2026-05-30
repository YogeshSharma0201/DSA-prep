# Spiral Matrix

**Link:** https://leetcode.com/problems/spiral-matrix/

## Problem
Given an m x n matrix, return all elements of the matrix in spiral order. Traversal starts from the top-left, goes right across the top row, down the right column, left across the bottom row, and up the left column, then repeats inward.

## Solution
Track four boundaries: top, bottom, left, right. Traverse right along the top, then down the right side, then left along the bottom, then up the left side, shrinking the corresponding boundary after each pass. Stop when boundaries cross.

## Code
```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();

    int i = 0, j = 0, bsi = 0, bei = n-1, bsj = 0, bej = m-1;
    int ioj = 0, dir = 1, count = 0;

    vector<int> ret;
    ret.push_back(matrix[i][j]);
    int c = 0;
    while(count < 2) {
        if(ioj == 0 && (j + dir < bsj || j + dir > bej)) {
            ioj = 1;
            if(dir == 1) { bsi++; }
            else { bei--; }
            count++;
            continue;
        }
        else if(ioj == 1 && (i + dir < bsi || i + dir > bei)) {
            ioj = 0;
            if(dir == 1) { bej--; }
            else { bsj++; }

            if(dir == 1) { dir = -1; }
            else { dir = 1; }
            count++;
            continue;
        }
        count = 0;

        if(ioj == 0) { j+=dir; ret.push_back(matrix[i][j]); }
        else { i+=dir; ret.push_back(matrix[i][j]);}
    }
}
```
