# Peak Index in a Mountain Array

**Link:** https://leetcode.com/problems/peak-index-in-a-mountain-array/description

## Problem
An array `arr` is a mountain if it strictly increases then strictly decreases. Given such an array, return the index of the peak element.

## Solution
Binary search on the slope direction. At each `mid`:
- If `arr[mid] < arr[mid+1]`: still climbing — the peak is to the right → `l = mid + 1`
- Otherwise: we're at or past the peak (on the descending slope, or `mid` is the last index) → `r = mid`

The `mid < n-1` guard keeps `arr[mid+1]` in bounds. The loop converges when `l == r`, which lands on the peak.

## Code
```cpp
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int n = arr.size();
        int l = 0, r = n-1;

        while(l < r) {
            int mid = (l+r) >> 1;

            if(mid < n-1 && arr[mid] < arr[mid+1]) {
               l = mid+1; 
            }
            else {
                r = mid;
            }
        }

        return l;
    }
};
```
