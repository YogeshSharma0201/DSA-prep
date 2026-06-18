# Maximum Sum Circular Subarray

**Link:** https://leetcode.com/problems/maximum-sum-circular-subarray

## Problem
Given a circular integer array `nums`, return the maximum possible sum of a non-empty subarray. In a circular array, the last element connects back to the first element.

## Solution
The answer is either a normal max subarray (use Kadane's) or a circular subarray. A circular subarray's sum equals total sum minus the minimum subarray sum (also from Kadane's on negated values). Return max of both cases, but if all numbers are negative return just the max element.

## Code
```cpp
int maxSubarraySumCircular(vector<int>& nums) {
    int maxSum = nums[0], minSum = nums[0];
    int currMax = 0, currMin = 0, total = 0;
    for (int x : nums) {
        currMax = max(currMax + x, x);
        maxSum = max(maxSum, currMax);
        currMin = min(currMin + x, x);
        minSum = min(minSum, currMin);
        total += x;
    }
    return maxSum > 0 ? max(maxSum, total - minSum) : maxSum;
}
```
