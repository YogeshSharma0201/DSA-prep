# Unique Binary Search Trees

**Link:** https://leetcode.com/problems/unique-binary-search-trees/

## Problem
Given an integer `n`, return the number of structurally unique BSTs which have exactly `n` nodes with values from 1 to `n`. The result is the nth Catalan number.

## Solution
Define `G(n)` as the number of unique BSTs with `n` nodes. For each possible root `i` from 1 to n, the left subtree has `i-1` nodes and the right subtree has `n-i` nodes. So `G(n) = sum of G(i-1) * G(n-i)` for i=1..n. Base cases: `G(0) = G(1) = 1`. Fill bottom-up in O(n^2).

## Code
```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> G(n + 1, 0);
        G[0] = 1;
        G[1] = 1;

        for(int nodes = 2; nodes <= n; nodes++) {
            for(int root = 1; root <= nodes; root++) {
                G[nodes] += G[root - 1] * G[nodes - root];
            }
        }

        return G[n];
    }
};
```
