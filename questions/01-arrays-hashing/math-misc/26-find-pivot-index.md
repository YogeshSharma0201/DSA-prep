# Find Pivot Index (Equilibrium Index)

**Link:** https://leetcode.com/problems/find-pivot-index

## Problem
Given an array of integers `nums`, return the leftmost pivot index where the sum of all elements to the left equals the sum of all elements to the right. Return -1 if no such index exists.

## Solution
Compute the total sum first. Iterate through the array maintaining a running left sum. At each index, check if `leftSum == totalSum - leftSum - nums[i]`. If so, return that index. Update leftSum by adding nums[i].

## Code
```cpp
int pivotIndex(vector<int>& nums) {
    int total = 0;
    for (int x : nums) total += x;
    int leftSum = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (leftSum == total - leftSum - nums[i]) return i;
        leftSum += nums[i];
    }
    return -1;
}
```
