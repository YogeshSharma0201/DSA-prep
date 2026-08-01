# Minimum Size Subarray Sum

**Link:** https://leetcode.com/problems/minimum-size-subarray-sum/

## Problem
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. If no such subarray exists, return `0`.

## Solution
Use a sliding window. Iterate through the array with a right pointer `i`, adding `nums[i]` to the running sum `csum`. While `csum` is greater than or equal to `target`, update the minimum length `minl` with the current window size `i - l + 1`, subtract `nums[l]` from `csum`, and increment the left pointer `l`.

## Code
```cpp
int minSubArrayLen(int target, vector<int>& nums) {
    int l = 0, minl = INT_MAX, csum = 0;

    for (int i = 0; i < nums.size(); i++) {
        csum += nums[i];

        while (csum >= target) {
            minl = min(minl, i - l + 1);
            csum -= nums[l++];
        }
    }

    return minl == INT_MAX ? 0 : minl;
}
```

