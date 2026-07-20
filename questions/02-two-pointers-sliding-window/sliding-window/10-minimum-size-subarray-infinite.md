# Minimum Size Subarray in Infinite Array

**Link:** https://leetcode.com/problems/minimum-size-subarray-in-infinite-array/

## Problem
Given a 0-indexed array nums and an integer target, you have an infinite array infinite_nums formed by repeating nums. Find the minimum length subarray of infinite_nums whose sum equals target. Return -1 if no such subarray exists.

## Solution
First compute sumA (total sum of nums). Use target %= sumA to find the remainder after taking k full copies. The answer is k * n + (minimum window in doubled array with sum equal to the remainder). Use a sliding window over the doubled array (2*n elements) with a prefix sum map to find the shortest subarray summing to the remainder. If target becomes 0, return k * n directly.

## Code
```cpp
int minSizeSubarray(vector<int>& A, int target) {
    long sumA = accumulate(A.begin(), A.end(), 0L);
    int n = A.size(), su = 0;
    target %= sumA;
    int k = target / sumA, res = n;
    if (target == 0)
        return k * n;
    unordered_map<long, int> dp{{0L, -1}};
    for (int i = 0; i < 2 * n; ++i) {
        su += A[i % n];
        if (dp.count(su - target))
            res = min(res, i - dp[su - target]);
        dp[su] = i;
    }
    return res < n ? res + k * n : -1;
}
```
