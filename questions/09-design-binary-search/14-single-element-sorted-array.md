# Single Element in a Sorted Array

**Link:** https://leetcode.com/problems/single-element-in-a-sorted-array/

## Problem
Given a sorted array where every element appears exactly twice except for one element, find that single element in O(log n) time.

## Solution
Binary search using the parity of `mid`. In a valid "all pairs" prefix, pairs occupy even-odd index positions (e.g. `[0,1], [2,3]`). So if `mid` is even, its pair should be at `mid+1`, and if `mid` is odd, its pair should be at `mid-1`. If the pair is in the expected position, the single element is to the right (`l = mid+1`); otherwise it's at or to the left (`r = mid`).

## Code
```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n-1;

        while(l < r) {
            int mid = (l+r) >> 1;

            if(((mid % 2) == 0 && mid < n-1 && nums[mid] == nums[mid+1]) || ((mid % 2) && nums[mid] == nums[mid-1])) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }

        return nums[l];
    }
};
```
