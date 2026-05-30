# Permutations

**Link:** https://leetcode.com/problems/permutations/

## Problem
Given an array of distinct integers, return all possible permutations. Each permutation must use all elements exactly once, and the output can be in any order.

## Solution
Use backtracking by swapping elements in-place. At each index `idx`, swap `nums[idx]` with every element from `idx` to `n-1`, recurse for `idx+1`, then swap back to restore state. When `idx == n`, all positions are fixed and the current array is a complete permutation.

## Code
```cpp
class Solution {
public:
    void solve(int idx, int n, vector<int>& nums, vector<vector<int>>& result) {
        if(idx == n) {
            result.push_back(nums);
            return;
        }

        for(int i=idx; i<n; i++) {
            swap(nums[i], nums[idx]);
            solve(idx+1, n, nums, result);
            swap(nums[i], nums[idx]);
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> ret;
        solve(0, nums.size(), nums, ret);

        return ret;
    }
};
```
