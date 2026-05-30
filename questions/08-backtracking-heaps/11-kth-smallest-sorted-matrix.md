# Kth Smallest Element in a Sorted Matrix

**Link:** https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix

## Problem
Given an n x n matrix where each row and column is sorted in ascending order, return the k-th smallest element in the matrix. Note that it is the k-th smallest in sorted order, not the k-th distinct element.

## Solution
Use a min-heap initialized with the first element of each row (column 0). Pop the minimum k times; each time an element `(val, row, col)` is popped, push the next element in the same row `(matrix[row][col+1], row, col+1)` if it exists. The k-th popped value is the answer.

## Code
```cpp
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        using T = tuple<int,int,int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        for (int r = 0; r < n; r++)
            pq.push({matrix[r][0], r, 0});

        int val = 0;
        for (int i = 0; i < k; i++) {
            auto [v, r, c] = pq.top(); pq.pop();
            val = v;
            if (c + 1 < n)
                pq.push({matrix[r][c+1], r, c+1});
        }
        return val;
    }
};
```
