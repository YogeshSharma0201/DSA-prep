# Search a 2D Matrix

**Link:** https://leetcode.com/problems/search-a-2d-matrix/

## Problem
You are given an `m x n` integer matrix where each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the previous row. Given an integer `target`, return `true` if `target` is in the matrix, or `false` otherwise.

## Solution
Treat the matrix as a flattened sorted array of `m*n` elements and run standard binary search. For a mid index, convert back to 2D coordinates: `row = mid / n`, `col = mid % n`. This gives O(log(m*n)) time.

## Code
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& input, int target) {
        int m = input.size(), n = input[0].size();

        int l = 0, r = m*n - 1;

        while (l <= r) {
            int mid = (l + r) >> 1;

            int x = mid / n; // note: use n (not m) for both divide and modulo
            int y = mid % n;

            if (input[x][y] < target) {
                l = mid + 1;
            } else if (input[x][y] > target) {
                r = mid - 1;
            } else {
                return true;
            }
        }

        return false;
    }
};
```
