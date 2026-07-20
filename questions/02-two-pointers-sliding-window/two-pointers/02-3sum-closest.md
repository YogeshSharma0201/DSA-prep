# 3Sum Closest

**Link:** https://leetcode.com/problems/3sum-closest/

## Problem
Given an integer array nums and a target integer, find three integers in nums such that their sum is closest to target. Return the sum of the three integers. Exactly one such triplet is guaranteed to exist.

## Solution
Sort the array first. Fix one element with an outer loop, then use two pointers (left = i+1, right = n-1) for the remaining two. Track the closest sum seen so far. Move the right pointer left if current sum exceeds target, move left pointer right if it falls short, and break immediately if an exact match is found.

## Code
```cpp
int threeSumClosest(vector<int>& nums, int target) {
    int closest_sum = INT_MAX >> 1;
    int n = nums.size();
    sort(nums.begin(), nums.end());
    for (int i = 0; i < n; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int current_sum = nums[i] + nums[left] + nums[right];
            if (abs(target - current_sum) < abs(target - closest_sum)) {
                closest_sum = current_sum;
            }

            if (target - current_sum < 0) {
                right--;
            } else if (target - current_sum > 0) {
                left++;
            } else {
                break;
            }
        }
    }
    return closest_sum;
}
```
