# Max Sum of Rectangle No Larger Than K

**Link:** https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/

## Problem
Given an m x n matrix and an integer k, return the max sum of a rectangle in the matrix such that its sum is no larger than k. It is guaranteed that there will be a rectangle with a sum no larger than k.

## Solution
Fix two column boundaries (l, r) to reduce to a 1D problem. Build prefix row sums between those columns. Then find the maximum subarray sum <= k using a sorted set: for each prefix sum curSum, binary-search for the smallest stored prefix sum >= (curSum - k); if found, update the answer.

## Code
```cpp
int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
    if (matrix.empty()) return 0;
    int row = matrix.size(), col = matrix[0].size(), res = INT_MIN;
    for (int l = 0; l < col; ++l) {
        vector<int> sums(row, 0);
        for (int r = l; r < col; ++r) {
            for (int i = 0; i < row; ++i) {
                sums[i] += matrix[i][r];
            }

            // Find the max subarray no more than K
            set<int> accuSet;
            accuSet.insert(0);
            int curSum = 0, curMax = INT_MIN;
            for (int sum : sums) {
                curSum += sum;
                set<int>::iterator it = accuSet.lower_bound(curSum - k);
                if (it != accuSet.end()) curMax = std::max(curMax, curSum - *it);
                accuSet.insert(curSum);
            }
            res = std::max(res, curMax);
        }
    }
    return res;
}
```
