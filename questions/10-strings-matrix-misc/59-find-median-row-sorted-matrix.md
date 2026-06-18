# Find Median in Row-wise Sorted Matrix

**Link:** https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1

## Problem
Given an r x c matrix where each row is sorted, find the median of all the r*c elements. The total number of elements is always odd.

## Solution
Binary search on the answer. For a given mid value, count how many elements in the matrix are <= mid (using upper_bound on each row). The median is the smallest value where this count > (r*c)/2.

## Code
```cpp
int median(vector<vector<int>>& matrix, int r, int c) {
    int lo = 1, hi = 1e9, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int count = 0;
        for (int i = 0; i < r; i++)
            count += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();
        if (count > (r * c) / 2) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    return ans;
}
```
