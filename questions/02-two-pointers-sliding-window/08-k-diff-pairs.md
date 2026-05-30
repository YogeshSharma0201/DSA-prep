# K-diff Pairs in an Array

**Link:** https://leetcode.com/problems/k-diff-pairs-in-an-array/

## Problem
Given an array of integers nums and an integer k, return the number of unique k-diff pairs in the array. A k-diff pair is a pair (nums[i], nums[j]) where i != j and abs(nums[i] - nums[j]) == k. Pairs are considered unique by their values, not indices.

## Solution
Sort the array, then use two pointers. The k=0 case requires counting duplicate elements (pairs where both values are equal). For k>0, advance left and right pointers without overlap: skip duplicates on the left, move right if the difference is too small, move left if too large, and count when difference equals k.

## Code
```cpp
int findPairs(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end());
    int l = 0, r = 1, count = 0;

    while (r < nums.size()) {
        if (l == r || nums[r] - nums[l] < k) {
            r++;
        } else if (nums[r] - nums[l] > k) {
            l++;
        } else {
            count++;
            l++;
            while (l < nums.size() && nums[l] == nums[l - 1]) l++;
        }
    }

    return count;
}
```
