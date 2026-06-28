# H-Index

**Link:** https://leetcode.com/problems/h-index/

## Problem
Given an array of citation counts (unsorted), find the largest h such that the researcher has at least h papers with >= h citations.

## Solution
Use a counting/bucket sort approach. Create an array `arr` of size `n+1` where `arr[i]` = number of papers with exactly i citations (capped at n). Then scan from n down to 0, accumulating suffix sums. The first index where `arr[i] >= i` is the answer.

**Alternate solution:** Sort the array, then apply the same binary search as [H-Index II](24-h-index-ii.md) directly.

## Code
```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        vector<int> arr(n+1, 0);

        for(int i=0; i<n; i++) {
            arr[min(n, citations[i])]++;
        }

        for(int i=n; i>=0; i--) {
            if(i<n) arr[i] += arr[i+1];
            if(arr[i] >= i) return i;
        }
        return 0;
    }
};
```
