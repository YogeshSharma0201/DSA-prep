# H-Index II

**Link:** https://leetcode.com/problems/h-index-ii/?envType=study-plan-v2&envId=binary-search

## Problem
Given a sorted array of citation counts, find the largest h such that the researcher has at least h papers with >= h citations.

## Solution
Binary search on the answer h in range `[0, n]`. For a candidate `mid`, use `lower_bound` to count papers with citations >= mid (`n - idx`). If that count >= mid, h is achievable so search higher; otherwise search lower. Answer is `l - 1`.

## Code
```cpp
int hIndex(vector<int>& citations) {
    int n = citations.size();
    int l = 0, r = n + 1; // upper_bound search: right = max+1

    while (l < r) {
        int mid = (l + r) >> 1;
        int idx = lower_bound(citations.begin(), citations.end(), mid) - citations.begin();
        if (n - idx >= mid) l = mid + 1;
        else r = mid;
    }

    return max(0, l - 1);
}
```
