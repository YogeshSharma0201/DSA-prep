# H-Index II

**Link:** https://leetcode.com/problems/h-index-ii/?envType=study-plan-v2&envId=binary-search

## Problem
Given a sorted array of citation counts, find the largest h such that the researcher has at least h papers with >= h citations.

## Solution
Binary search directly on the index. For a candidate `mid`, compute `h = n - mid` (papers from mid onward). If `citations[mid] < h`, the papers at mid don't meet the h requirement, so move right. Otherwise converge left. After the loop, check if `citations[l] >= n - l`; if not, no valid h exists so return 0.

## Code
```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        int l = 0, r = n-1;

        while(l < r) {
            int mid = (l+r) >> 1;

            int h = n - mid;

            if(citations[mid] < h) {
                l = mid+1;
            } 
            else {
                r = mid;
            }
        }

        return citations[l] < n-l ? 0 : n-l;
    }
};
```
