# Find Peak Element

**Link:** https://leetcode.com/problems/find-peak-element/

## Problem
A peak element is one strictly greater than its neighbours. Given an array where `nums[-1] = nums[n] = -∞`, find any peak element and return its index. Must run in O(log n).

## Solution
Binary search with three-way branching. At each `mid`:
- If `nums[mid] <= nums[mid-1]`: we're on a downward slope — the peak is strictly to the left → `r = mid - 1`
- If `nums[mid] <= nums[mid+1]`: we're on an upward slope — the peak is strictly to the right → `l = mid + 1`
- Otherwise `nums[mid]` is greater than both neighbours → it is a peak, return immediately

The boundary checks (`mid != 0`, `mid != n-1`) model the `nums[-1] = nums[n] = -∞` guarantee: an edge element only needs to beat its one interior neighbour to be a peak.

## Code
```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size();  // r starts past-the-end; mid stays within [0, n-1]

        while (l < r) {
            int mid = (l + r) >> 1;

            if (mid != 0 && nums[mid] <= nums[mid - 1]) {
                r = mid - 1;             // downward slope; peak is to the left
            } else if (mid != (int)nums.size() - 1 && nums[mid] <= nums[mid + 1]) {
                l = mid + 1;             // upward slope; peak is to the right
            } else {
                return mid;              // nums[mid] > both neighbours → peak found
            }
        }
        return l;
    }
};
```
