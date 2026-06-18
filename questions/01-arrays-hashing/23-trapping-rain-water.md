# Trapping Rain Water

**Link:** https://leetcode.com/problems/trapping-rain-water

## Problem
Given an array `height` representing the elevation map, compute how much water it can trap after raining. Water at position `i` is bounded by the minimum of the maximum heights to its left and right.

## Solution
Two-pointer approach: maintain `leftMax` and `rightMax`. Move the pointer with the smaller max inward, adding `min(leftMax, rightMax) - height[pointer]` water at each step. This achieves O(n) time and O(1) space.

## Code
```cpp
int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            leftMax = max(leftMax, height[l]);
            water += leftMax - height[l];
            l++;
        } else {
            rightMax = max(rightMax, height[r]);
            water += rightMax - height[r];
            r--;
        }
    }
    return water;
}
```
