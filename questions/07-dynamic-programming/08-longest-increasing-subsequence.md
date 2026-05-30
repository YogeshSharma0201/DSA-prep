# Longest Increasing Subsequence

**Link:** https://leetcode.com/problems/longest-increasing-subsequence

## Problem
Given an integer array, find the length of the longest strictly increasing subsequence. A subsequence is derived by deleting some or no elements without changing the relative order. The O(n^2) DP solution exists but an O(n log n) solution is expected.

## Solution
Maintain a tails array where tails[i] holds the smallest tail element of all increasing subsequences of length i+1. For each number, if it is greater than the last element in tails, append it (length increases). Otherwise use binary search (lower_bound) to find the first element >= current number and replace it. The length of tails at the end is the answer.

## Code
```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> lis;

    lis.push_back(nums[0]);
    for(int i=1; i<nums.size(); i++) {
        if(lis[lis.size()-1] < nums[i]) {
            lis.push_back(nums[i]);
        }
        else {
            int idx = lower_bound(lis.begin(), lis.end(), nums[i]) - lis.begin();
            lis[idx] = nums[i];
        }
    }

    return lis.size();
}
```
