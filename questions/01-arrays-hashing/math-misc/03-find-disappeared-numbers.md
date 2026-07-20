# Find All Numbers Disappeared in an Array

**Link:** https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array

## Problem
Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all integers in `[1, n]` that do not appear in `nums`. Some numbers may appear more than once, and each missing number should appear exactly once in the result.

## Solution
Use the array itself as a visited marker: for each value `v = abs(nums[i])`, negate `nums[v-1]` to mark index `v-1` as "seen". After one pass, any index `i` where `nums[i]` is still positive means `i+1` was never seen, so collect those indices. This achieves O(n) time and O(1) extra space.

## Code
```cpp
vector<int> findDisappearedNumbers(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;
        if (nums[idx] > 0) nums[idx] = -nums[idx];
    }
    vector<int> ret;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] > 0) ret.push_back(i + 1);
    }
    return ret;
}
```
