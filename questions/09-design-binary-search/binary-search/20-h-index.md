# H-Index

**Link:** https://leetcode.com/problems/h-index/

## Problem
Given an array of citation counts (unsorted), find the largest h such that the researcher has at least h papers with >= h citations.

## Solution

### Approach 1: Bucket Sort / Suffix Sums (O(n) time, O(n) space)
Create an array `arr` of size `n+1` where `arr[i]` = number of papers with exactly `i` citations (capped at `n`). Then scan from `n` down to 0, accumulating suffix sums. The first index where `arr[i] >= i` is the answer.

### Approach 2: Sorting + Greedy (O(n log n) time, O(1) space)
Sort the citations in descending order. The `i`-th paper (0-indexed) has `citations[i]` citations. We can have an H-index of `i+1` if `citations[i] >= i+1`. If `citations[i] < i+1`, the maximum H-index we can achieve is `i`.

**Alternate solution:** Sort the array, then apply the same binary search as [H-Index II](21-h-index-ii.md) directly.

## Code

### Approach 1: Bucket Sort / Suffix Sums

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

### Approach 2: Sorting + Greedy

```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        sort(citations.begin(), citations.end(), greater<int>());

        if(citations[0] == 0) return 0;

        for(int i=0; i<citations.size(); i++) {
            if(citations[i] < i+1) return i;
        }

        return citations.size();
    }
};
```
