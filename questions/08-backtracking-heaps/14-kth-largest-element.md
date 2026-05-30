# Kth Largest Element in an Array

**Link:** https://leetcode.com/problems/kth-largest-element-in-an-array/

## Problem
Given an integer array and an integer k, return the k-th largest element in the array. Note that it is the k-th largest in sorted order, not the k-th distinct element. Aim for better than O(n log n) time complexity.

## Solution
Use QuickSelect (average O(n)). Partition the array around a random pivot so elements greater than the pivot are on the left. If the pivot lands at index `k-1` (0-indexed), it is the answer. If the pivot index is greater than `k-1`, recurse only on the left half; otherwise recurse only on the right half.

## Code
```cpp
class Solution {
public:
    int partition(vector<int>& nums, int lo, int hi) {
        int pivot = nums[hi], p = lo;
        for (int i = lo; i < hi; i++)
            if (nums[i] >= pivot) swap(nums[i], nums[p++]);
        swap(nums[p], nums[hi]);
        return p;
    }

    int quickSelect(vector<int>& nums, int lo, int hi, int k) {
        int p = partition(nums, lo, hi);
        if (p == k) return nums[p];
        return p > k ? quickSelect(nums, lo, p-1, k)
                     : quickSelect(nums, p+1, hi, k);
    }

    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, 0, nums.size()-1, k-1);
    }
};
```
