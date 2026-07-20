# Longest Increasing Subsequence

**Link:** https://leetcode.com/problems/longest-increasing-subsequence

## Problem
Given an integer array, find the length of the longest strictly increasing subsequence. A subsequence is derived by deleting some or no elements without changing the relative order. The O(n^2) DP solution exists but an O(n log n) solution is expected.

## Solution
**O(n²) DP:** `lis[i]` = length of LIS ending at index `i`. For each `i`, look back at all `j < i` where `nums[j] < nums[i]` and take the max of `lis[j] + 1`.

**O(n log n) patience sort:** Maintain a `tails` array where `tails[i]` is the smallest tail of all increasing subsequences of length `i+1`. For each number, if it exceeds the last element append it (LIS grows); otherwise binary search (`lower_bound`) for the first element `>= nums[i]` and replace it. The length of `tails` at the end is the answer.

## Code

**O(n²) DP:**
```cpp
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size(), maxR = 0;
    vector<int> lis(n, 0);
    for(int i=0; i<n; i++) {
        int maxS = 1;
        for(int j=i-1; j>=0; j--)
            if(nums[j] < nums[i]) maxS = max(lis[j]+1, maxS);
        lis[i] = maxS;
        maxR = max(maxR, maxS);
    }
    return maxR;
}
```

**O(n log n) patience sort:**
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
