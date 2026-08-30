# Find in Mountain Array

**Link:** https://leetcode.com/problems/find-in-mountain-array/

## Problem
An array `arr` is a mountain array if it strictly increases to a peak element and then strictly decreases.

Given a mountain array `mountainArr` and a `target`, return the minimum index such that `mountainArr.get(index) == target`. If the target is not in the array, return `-1`.

You cannot access the mountain array directly. You may only access the array using a `MountainArray` interface:
- `MountainArray.get(k)` returns the element of the array at index `k` (0-indexed).
- `MountainArray.length()` returns the length of the array.

Submissions making more than 100 calls to `MountainArray.get` will be judged *Wrong Answer*.

## Solution
We can find the target in O(log N) time and O(1) space using three binary searches:
1. **Find Peak Element ($k$):**
   - Perform binary search to find the peak index.
   - At each `mid`, check if `mountainArr.get(mid) < mountainArr.get(mid+1)`. If true, the peak is in the right half (`l = mid + 1`). Otherwise, the peak is at `mid` or in the left half (`r = mid`).
   - The search converges when `l == r`, which gives the peak index `k`.
2. **Search in Left (Increasing) Half:**
   - Search the target in the range `[0, k]`.
   - Since the array is strictly increasing here, use standard binary search.
   - If the target is found, return its index immediately (since we want the *minimum* index).
3. **Search in Right (Decreasing) Half:**
   - If the target was not found in the left half, search the range `[k+1, n-1]`.
   - Since the array is strictly decreasing here, use standard binary search with inverted comparison logic.
   - If the target is found, return its index.
   - Otherwise, return `-1`.

## Code
```cpp
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */

class Solution {
public:
    int findInMountainArray(int target, MountainArray &mountainArr) {
        int n = mountainArr.length();
        int l = 0, r = n-1;

        while(l < r) {
            int mid = (l+r)>>1;

            if(mid < n-1 && mountainArr.get(mid) < mountainArr.get(mid+1)) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }

        int k = l;
        // search from 0 to l and then from l+1 to n-1 in reverse
        l = 0, r = k;
        while(l<r) {
            int mid = (l+r) >> 1;

            if(mountainArr.get(mid) < target) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }
        if(mountainArr.get(l) == target) return l;

        l = k+1, r = n-1;
        while(l<r) {
            int mid = (l+r) >> 1;

            if(mountainArr.get(mid) > target) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }

        if(mountainArr.get(l) == target) return l;
        return -1;
    }
};
```
