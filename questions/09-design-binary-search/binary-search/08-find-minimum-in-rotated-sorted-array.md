# Find Minimum in Rotated Sorted Array

**Link:** https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

## Problem
Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.

Must run in $O(\log n)$ time.

## Solution
We can use binary search to find the minimum element (the rotation point/pivot):
1. Since the array contains unique elements, any element in the "upper half" (before rotation pivot) is strictly greater than the last element of the array `nums[n-1]`.
2. Any element in the "lower half" (after rotation pivot, including the minimum itself) is less than or equal to `nums[n-1]`.
3. We perform a binary search using this condition:
   - If `nums[mid] > nums[n-1]`, the minimum must be strictly to the right of `mid`, so we set `l = mid + 1`.
   - Otherwise, `mid` could be the minimum itself or to the right of the minimum, so we set `r = mid`.
4. When the search space reduces to a single element (`l == r`), `nums[l]` will be the minimum element.

## Code
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n - 1;

        while (l < r) {
            int mid = (l + r) >> 1;
            if (nums[mid] > nums[n - 1]) {
                l = mid + 1; // Minimum must be in the right half
            } else {
                r = mid;     // mid could be the minimum
            }
        }

        return nums[l];
    }
};
```
