# Maximum Subarray

**Link:** https://leetcode.com/problems/maximum-subarray

## Problem
Given an integer array `nums`, find the contiguous subarray which has the largest sum and return its sum. A subarray must contain at least one element.

## Solution
Kadane's algorithm: maintain a `currSum` that resets to the current element whenever it drops below that element. Track `maxSum` as the global maximum. This runs in O(n) time.

## Code
```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currSum = max(nums[i], currSum + nums[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}
```
