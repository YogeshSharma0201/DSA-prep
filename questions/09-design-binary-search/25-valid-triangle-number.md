# Valid Triangle Number

**Link:** https://leetcode.com/problems/valid-triangle-number/?envType=study-plan-v2&envId=binary-search

## Problem
Given an integer array `nums`, return the number of triplets chosen from the array that can make triangles (i.e., satisfy the triangle inequality: sum of any two sides > third side).

## Solution
Sort the array. Fix the largest side `nums[i]` and use two pointers `left=0`, `right=i-1`. If `nums[left] + nums[right] > nums[i]`, all pairs from `left` to `right-1` with `right` are valid (count += `right - left`), then decrement `right`. Otherwise increment `left`. Only need to check one inequality since the array is sorted.

## Code
```cpp
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        int count = 0;

        for (int i = n - 1; i >= 2; i--) {
            int left = 0, right = i - 1;
            while (left < right) {
                if (nums[left] + nums[right] > nums[i]) {
                    count += right - left;
                    right--;
                } else {
                    left++;
                }
            }
        }
        return count;
    }
};
```
