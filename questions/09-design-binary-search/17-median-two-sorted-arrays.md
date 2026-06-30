# Median of Two Sorted Arrays

**Link:** https://leetcode.com/problems/median-of-two-sorted-arrays

## Problem
Given two sorted arrays of sizes m and n, find the median of the combined sorted array in O(log(m+n)) time. The overall run time complexity should be O(log(min(m,n))).

## Solution
Binary search on the partition index of the smaller array. For a given partition `i` in A and `j = (m+n+1)/2 - i` in B, check if `A[i-1] <= B[j]` and `B[j-1] <= A[i]`. If not, adjust the binary search bounds. Once the correct partition is found, compute the median from the max of left halves and min of right halves.

**Note:** `partB = (m+n+1)/2 - partA` uses `+1` (ceiling division) so the left half absorbs the middle element on odd-length arrays, making `max(left)` always the correct median for the odd case without extra logic. For even totals `+1` has no effect.

**Note:** `nums1` must be the smaller array. `partB` is derived from `partA`, so if `m > n`, small values of `partA` can push `partB` beyond `n`, causing an out-of-bounds access. Swapping ensures `partB` stays in `[0, n]` for all valid `partA` in `[0, m]`, and also keeps the binary search at `O(log(min(m,n))))`.

## Code
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();

        if(m > n) return findMedianSortedArrays(nums2, nums1);

        int left = 0, right = m;

        while(left <= right) {
            int partA = (left+right) >> 1;
            int partB = ((m+n+1) >> 1) - partA;

            int maxleftA = partA == 0 ? INT_MIN : nums1[partA-1];
            int maxleftB = partB == 0 ? INT_MIN : nums2[partB-1];

            int minrightA = partA == m ? INT_MAX : nums1[partA];
            int minrightB = partB == n ? INT_MAX : nums2[partB];

            if(maxleftA <= minrightB && maxleftB <= minrightA) {
                if((m+n)&1) {
                    return max(maxleftA, maxleftB);
                }
                else {
                    return 1.0*(max(maxleftA, maxleftB) + min(minrightA, minrightB)) / 2;
                }
            }
            else if(maxleftA > minrightB) {
                right = partA-1;
            } 
            else {
                left = partA+1;
            }
        }
        return -1;
    }
};
```
