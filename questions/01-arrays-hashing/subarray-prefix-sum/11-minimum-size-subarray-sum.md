# Minimum Size Subarray Sum

**Link:** https://leetcode.com/problems/minimum-size-subarray-sum/

## Problem
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. If no such subarray exists, return `0`.

## Solution
Use a sliding window with left pointer `l` and right pointer `r`. Expand the window by adding `nums[r++]` when the current sum is below target. When the sum meets or exceeds target, record the window length (`r - l`) as a candidate minimum, then shrink from the left by subtracting `nums[l++]`. Continue until either pointer goes out of bounds.

## Code
```cpp
int minSubArrayLen(int target, vector<int>& nums) {
    int l = 0, r = 0;
    int n = nums.size();

    int currS = 0;
    int minl = INT_MAX;
    while (true) {
        if (currS >= target) {
            minl = min(minl, r - l);
            if (l >= n) break;
            currS -= nums[l++];
        }
        else {
            if (r >= n) break;
            currS += nums[r++];
        }
    }

    if (minl == INT_MAX) minl = 0;

    return minl;
}
```
