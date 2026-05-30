# Find All Duplicates in an Array

**Link:** https://leetcode.com/problems/find-all-duplicates-in-an-array/

## Problem
Given an integer array `nums` of length `n` where all integers are in the range `[1, n]` and each integer appears once or twice, return an array of all integers that appear twice. The solution must run in O(n) time and use only O(1) extra space (not counting the output).

## Solution
Use the array as a sign-based visited marker. For each element, compute `idx = abs(nums[i]) - 1` and negate `nums[idx]`. If we arrive at an index that is already negative, it means we have visited it before, so `idx + 1` is a duplicate — add it to the result. This works in-place in O(n) time.

## Code
```cpp
vector<int> findDuplicates(vector<int>& nums) {
    vector<int> ret;
    for (int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;
        if (nums[idx] < 0) {
            ret.push_back(idx + 1);
        } else {
            nums[idx] = -nums[idx];
        }
    }
    return ret;
}
```
