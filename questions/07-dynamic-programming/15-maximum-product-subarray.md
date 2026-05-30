# Maximum Product Subarray

**Link:** https://leetcode.com/problems/maximum-product-subarray

## Problem
Given an integer array, find the contiguous subarray that has the largest product and return that product. The array may contain negative numbers and zeros, which makes this more complex than the maximum sum subarray problem.

## Solution
Track both currMax and currMin at each position because a large negative times another negative becomes a large positive. At each element, compute tempMax = currMax * nums[i] and tempMin = currMin * nums[i], then update currMax = max(tempMax, tempMin, nums[i]) and currMin = min(same). Update the global result with currMax each iteration. Initialize res to the maximum element to handle all-negative arrays.

## Code
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = INT_MIN>>1;
        int n = nums.size();
        for(int i=0; i<n; i++) {
            res = max(nums[i], res);
        }

        int currMax = 1, currMin = 1;
        for(int i=0; i<n; i++) {
            int tempMax = currMax * nums[i];
            int tempMin = currMin * nums[i];
            currMax = max(tempMax, max(tempMin, nums[i]));
            currMin = min(tempMax, min(tempMin, nums[i]));

            res = max(res, currMax);
        }
        return res;
    }
};
```
