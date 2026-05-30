# Combination Sum II

**Link:** https://leetcode.com/problems/combination-sum-ii/

## Problem
Given a collection of candidate numbers (which may contain duplicates) and a target, find all unique combinations where the chosen numbers sum to the target. Each number may only be used once, and the solution set must not contain duplicate combinations.

## Solution
Sort the array first to group duplicates together. Use backtracking starting from index `start`, trying each candidate once. To avoid duplicate combinations at the same recursion level, skip an element if `i > start && nums[i] == nums[i-1]`. Stop early if `nums[i] > remaining`.

## Code
```cpp
class Solution {
public:
    void backtrack(vector<int>& nums, int start, int remaining,
                   vector<int>& current, vector<vector<int>>& result) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i-1]) continue;
            if (nums[i] > remaining) break;
            current.push_back(nums[i]);
            backtrack(nums, i + 1, remaining - nums[i], current, result);
            current.pop_back();
        }
    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> result;
        vector<int> current;
        backtrack(candidates, 0, target, current, result);
        return result;
    }
};
```
