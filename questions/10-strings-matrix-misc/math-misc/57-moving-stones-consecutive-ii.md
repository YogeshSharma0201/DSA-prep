# Moving Stones Until Consecutive II

**Link:** https://leetcode.com/problems/moving-stones-until-consecutive-ii/

## Problem
There are n stones placed on a number line. A move consists of taking an endpoint stone and placing it at any unoccupied position between the two other endpoints. Return [minimum_moves, maximum_moves] to make all n stones occupy n consecutive positions.

## Solution
Sort the stones. Maximum moves: the first move must use an endpoint, so max is max(stones[n-1]-stones[1]-n+2, stones[n-2]-stones[0]-n+2). Minimum moves: use a sliding window of size n; count stones within any window [stones[i], stones[i+n-1]] where the span <= n. Moves = n - stones in window (with a special case when only one gap of 1 remains).

## Code
```cpp
class Solution {
public:
    vector<int> numMovesStonesII(vector<int>& A) {
        sort(A.begin(), A.end());
        int n = A.size(), low = n;
        for (int i = 0, j = 0; j < n; ++j) {
            while (A[j]-A[i]+1 > n) ++i;
            int already_store = (j-i+1);
            if (already_store == n - 1 && A[j] - A[i] + 1 == n-1) {
                low = min(low, 2);
            } else {
                low = min(low, n - already_store);
            }
        }
        return {low, max(A[n-1]-A[1]-n+2, A[n-2]-A[0]-n+2)};
    }
};
```
