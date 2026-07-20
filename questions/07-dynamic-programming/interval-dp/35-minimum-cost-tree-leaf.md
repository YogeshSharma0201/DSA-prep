# Minimum Cost Tree From Leaf Values

**Link:** https://leetcode.com/problems/minimum-cost-tree-from-leaf-values

## Problem
Given an array arr of positive integers, consider all binary trees with arr.size() leaves in order. Each non-leaf node's value is the product of the maximum leaf values in its left and right subtrees. Find the minimum sum of all non-leaf node values across all possible such trees.

## Solution
The image shows an O(n^3) DP approach: precompute maxV[i][r] = max leaf value in range, then minS[j][j+i] = min over all split points k of (minS[j][k] + minS[k+1][j+i] + maxV[j][k] * maxV[k+1][j+i]). Alternatively, a monotonic stack greedy works in O(n): maintain a decreasing stack; when arr[i] >= stack top, pop top and pay min(top, arr[i]) * top, choosing the smaller neighbor to minimize cost.

## Code
```cpp
int mctFromLeafValues(vector<int>& arr) {
    int sum = 0;

    int n = arr.size();
    vector<vector<int>> maxV(n, vector<int>(n, 0));

    for(int j=0; j<n; j++) {
        for(int i=0; i<n; i++) {
            int r = i+j;
            if(r >= n) break;

            if(i == r) {
                maxV[i][r] = arr[i];
            }
            else {
                maxV[i][r] = max(maxV[i+1][r], maxV[i][r-1]);
            }
        }
    }

    vector<vector<int>> minS(n, vector<int>(n, INT_MAX));

    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) {
            if(i==0) minS[j][j] = 0;
            else {
                for(int k=j; k<j+i && j+i<n; k++) {
                    minS[j][j+i] = min(minS[j][j+i], minS[j][k]+minS[k+1][j+i]+maxV[j][k]*maxV[k+1][j+i]);
                }
            }
        }
    }

    return minS[0][n-1];
}
```
