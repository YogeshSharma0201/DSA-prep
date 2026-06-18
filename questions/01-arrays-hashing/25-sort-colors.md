# Sort Colors

**Link:** https://leetcode.com/problems/sort-colors

## Problem
Given an array `nums` with values 0, 1, and 2 representing colors red, white, and blue, sort the array in-place so that elements of the same color are adjacent in the order 0, 1, 2 (Dutch National Flag problem).

## Solution
Dutch National Flag algorithm with three pointers: `low`, `mid`, and `high`. Elements before `low` are 0, between `low` and `mid` are 1, and after `high` are 2. Swap based on the value at `mid` and advance pointers accordingly.

## Code
```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}
```
