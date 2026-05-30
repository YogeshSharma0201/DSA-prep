# Squares of a Sorted Array

**Link:** https://leetcode.com/problems/squares-of-a-sorted-array/

## Problem
Given an integer array `nums` sorted in non-decreasing order (which may contain negative numbers), return an array of the squares of each number sorted in non-decreasing order. Squaring can change the relative order of negative numbers, so a naive square-and-sort approach works but is not optimal.

## Solution
Use two pointers starting at both ends of the array. The largest square must come from either the leftmost or rightmost element (whichever has the greater absolute value). Fill the result array from right to left, always placing the larger square and advancing the corresponding pointer inward. This runs in O(n) time.

## Code
```cpp
vector<int> sortedSquares(vector<int>& nums) {
    int n = nums.size();
    vector<int> ret(n);

    int l = 0, r = n - 1, idx = n - 1;

    while (l <= r) {
        int left = nums[l] * nums[l];
        int right = nums[r] * nums[r];

        if (left > right) {
            ret[idx--] = left;
            l++;
        }
        else {
            ret[idx--] = right;
            r--;
        }
    }

    return ret;
}
```
