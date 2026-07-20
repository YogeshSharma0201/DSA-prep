# Search in Rotated Sorted Array

**Link:** https://leetcode.com/problems/search-in-rotated-sorted-array/

## Problem
Given an integer array sorted in ascending order and then rotated at an unknown pivot, search for a target value. Return its index or `-1` if not found. Must run in O(log n).

## Solution
Two passes of the left-search template (see [00-binary-search-template.md](00-binary-search-template.md)):

**Pass 1 — Find rotation offset `k`:** The minimum element is the start of the "lower half" after rotation. All elements in the "upper half" (before the pivot) satisfy `nums[mid] > nums[n-1]`. Find the first index where this is false — that index is `k`, the minimum.

**Pass 2 — Binary search on the virtually unrotated array:** Use `(mid + k) % n` to access elements as if the array were sorted from index `k`. This lets a standard left-search work without physically rotating.

## Code
```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n - 1;

        // Pass 1: find k = index of the minimum element (start of rotation)
        // Condition: nums[mid] > nums[n-1] means mid is in the upper half (before pivot)
        // Find first index where nums[mid] <= nums[n-1] → that's the minimum
        while (l < r) {
            int mid = (l + r) >> 1;
            if (nums[mid] > nums[n - 1]) l = mid + 1;  // min is to the right
            else                          r = mid;        // mid could be the min
        }

        int k = l;  // rotation offset: index of the smallest element
        l = 0; r = n - 1;

        // Pass 2: binary search treating the array as virtually unrotated
        // Access index (mid + k) % n to map logical position to actual index
        while (l < r) {
            int mid = (l + r) >> 1;
            if (nums[(mid + k) % n] < target) l = mid + 1;
            else                               r = mid;
        }

        if (nums[(l + k) % n] != target) return -1;
        return (l + k) % n;
    }
};
```
