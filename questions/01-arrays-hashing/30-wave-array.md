# Wave Array

**Link:** https://www.geeksforgeeks.org/problems/wave-array-1587115621/1

## Problem
Given a sorted array, rearrange it in a wave-like fashion such that arr[0] >= arr[1] <= arr[2] >= arr[3] <= arr[4]... Return the rearranged array.

## Solution
Since the array is sorted, simply swap adjacent pairs: swap arr[0] with arr[1], arr[2] with arr[3], etc. Because the array is sorted, each even-indexed element will be greater than or equal to its neighbors after swapping.

## Code
```cpp
void convertToWave(int n, vector<int>& arr) {
    for (int i = 0; i + 1 < n; i += 2) {
        swap(arr[i], arr[i + 1]);
    }
}
```
