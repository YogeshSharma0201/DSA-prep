# Maximize Win From Two Segments

**Link:** https://leetcode.com/problems/maximize-win-from-two-segments/

## Problem
There are prizes at positions given by `prizePositions` (sorted). You have two segments each of length k. Place them anywhere on the number line to maximize the total number of prizes covered. Segments may overlap.

## Solution
Use a sliding window of size k (window covers positions from `A[j]` to `A[j] + k`). For each right endpoint `i`, maintain a pointer `j` such that `A[i] - A[j] <= k`. Track `dp[i+1] = max(dp[i], i - j + 1)` as the best single-segment count using only the first i+1 elements. For two segments, the answer at each `i` is `(i - j + 1) + dp[j]`.

## Code
```cpp
class Solution {
public:
    int maximizeWin(vector<int>& A, int k) {
        int res = 0, n = A.size(), j = 0;
        vector<int> dp(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            while (A[j] < A[i] - k)
                ++j;
            dp[i + 1] = max(dp[i], i - j + 1);
            res = max(res, i - j + 1 + dp[j]);
        }
        return res;
    }
};
```
