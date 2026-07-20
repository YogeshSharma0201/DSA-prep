# Find Row with Maximum 1s

**Link:** https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1

## Problem
Given a boolean 2D matrix where each row is sorted in ascending order (0s before 1s), find the row that contains the maximum number of 1s. Return the 0-indexed row number.

## Solution
Start from the top-right corner. If the cell is 1, move left (since all cells in this row to the right are also 1) and update the answer row. If it's 0, move down. This traverses at most m+n cells, giving O(m+n) time.

## Code
```cpp
int rowWithMax1s(vector<vector<int>>& arr) {
    int m = arr.size(), n = arr[0].size();
    int row = -1, j = n - 1;
    for (int i = 0; i < m; i++) {
        while (j >= 0 && arr[i][j] == 1) { row = i; j--; }
    }
    return row;
}
```
