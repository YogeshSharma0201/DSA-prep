# Merge Sorted Arrays without Extra Space

**Link:** https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1

## Problem
Given two sorted arrays arr1[] and arr2[] of sizes m and n, merge them in sorted order without using extra space. After merging, arr1[] should contain the first m smallest elements and arr2[] should contain the last n elements.

## Solution
Use the gap method (Shell sort approach). Start with gap = ceil((m+n)/2), compare elements gap apart across the combined virtual array, swapping if out of order. Halve the gap each iteration until gap becomes 0.

## Code
```cpp
void merge(vector<long long>& arr1, vector<long long>& arr2, int n, int m) {
    int gap = (n + m + 1) / 2;
    while (gap > 0) {
        int i = 0, j = gap;
        while (j < n + m) {
            long long& a = (i < n) ? arr1[i] : arr2[i - n];
            long long& b = (j < n) ? arr1[j] : arr2[j - n];
            if (a > b) swap(a, b);
            i++; j++;
        }
        gap = (gap == 1) ? 0 : (gap + 1) / 2;
    }
}
```
