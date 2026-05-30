# Median of Two Sorted Arrays

**Link:** https://leetcode.com/problems/median-of-two-sorted-arrays

## Problem
Given two sorted arrays of sizes m and n, find the median of the combined sorted array in O(log(m+n)) time. The overall run time complexity should be O(log(min(m,n))).

## Solution
Binary search on the partition index of the smaller array. For a given partition `i` in A and `j = (m+n+1)/2 - i` in B, check if `A[i-1] <= B[j]` and `B[j-1] <= A[i]`. If not, adjust the binary search bounds. Once the correct partition is found, compute the median from the max of left halves and min of right halves.

## Code
```cpp
double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
    int m = A.size(), n = B.size();
    if(m > n) return findMedianSortedArrays(B, A);

    int imin, imax, i, j;
    imin = 0;
    imax = m;

    while(imin <= imax) {
        i = (imin+imax) >> 1;
        j = (m+n+1)/2 - i;

        if(j>0 && i<m && B[j-1] > A[i]) {
            imin = i+1;
        } else if(i>0 && j<n && A[i-1] > B[j]) {
            imax = i-1;
        } else {
            int m1 = 0, m2 = 0;

            if(i==0) {
                m1 = B[j-1];
            } else if(j==0) {
                m1 = A[i-1];
            } else {
                m1 = max(A[i-1], B[j-1]);
            }

            if((m+n)%2 == 1) {
                return 1.0*m1;
            }

            if(i==m) {
                m2 = B[j];
            } else if(j==n) {
                m2 = A[i];
            } else {
                m2 = min(A[i], B[j]);
            }

            return 1.0*(m1+m2)/2.0;
        }
    }
    return -1.0;
}
```
