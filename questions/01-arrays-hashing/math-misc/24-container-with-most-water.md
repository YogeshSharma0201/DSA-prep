# Container With Most Water

**Link:** https://leetcode.com/problems/container-with-most-water

## Problem
Given an array `height` of n integers, find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water the container can store.

## Solution
Two-pointer approach starting from both ends. At each step compute area = min(height[l], height[r]) * (r - l), update max, then move the pointer with the smaller height inward since moving the taller one can only decrease the width without guaranteed height gain.

## Code
```cpp
int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, maxWater = 0;
    while (l < r) {
        maxWater = max(maxWater, min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxWater;
}
```
