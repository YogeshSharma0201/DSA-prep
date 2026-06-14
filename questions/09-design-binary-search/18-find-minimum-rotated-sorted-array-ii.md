# Find Minimum in Rotated Sorted Array II

**Link:** https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/

## Problem
Given a rotated sorted array that **may contain duplicates**, find the minimum element. Must run in O(log n) on average.

## Solution
Same as the no-duplicates version (left-search for first index where `nums[mid] <= nums[n-1]`), but duplicates at the front can equal `nums[n-1]`, making the condition `nums[mid] > nums[n-1]` ambiguous — those elements could be in the "upper half" before the pivot, or they could be repeated copies of the last element wrapping around. Skip them linearly first so the binary search starts from an unambiguous position.

## Code
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n - 1;

        // The binary search below uses nums[mid] > nums[n-1] to detect "upper half"
        // (elements before the pivot that are larger than the last element).
        // With duplicates, if nums[l] == nums[n-1], the condition is ambiguous:
        // we cannot tell whether l is in the upper half or is a repeated copy of
        // the last element sitting at the front. Skip these to get an unambiguous start.
        // l != n-1 ensures we never skip past the last valid position — if all
        // elements are equal, we stop at index n-1 (the minimum itself).
        while (l < n && l != n - 1 && nums[l] == nums[n - 1])
            l++;

        // Standard left-search for rotation point: first index where nums[mid] <= nums[n-1]
        while (l < r) {
            int mid = (l + r) >> 1;
            if (nums[mid] > nums[n - 1]) l = mid + 1;  // mid is in upper half; min is to the right
            else                          r = mid;        // mid could be the min; keep
        }

        return nums[l];
    }
};
```
