# Combinations

**Link:** https://leetcode.com/problems/combinations/

## Problem
Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n]. The order of elements within a combination does not matter, and each number can be used at most once.

## Solution
Use backtracking with two indices: `idx` for the current candidate number (1 to n) and `kidx` for how many numbers have been picked so far. At each step, either skip the current number or include it. When `kidx == k`, a valid combination is found and added to results.

## Code
```cpp
class Solution {
public:
    void solve(int idx, int kidx, int n, int k, vector<int>& arr, vector<vector<int>>& result) {
        if(kidx == k) {
            result.push_back(arr);
            return;
        }
        if(idx == n) {
            return;
        }

        solve(idx+1, kidx, n, k, arr, result);
        arr[kidx] = idx+1;
        solve(idx+1, kidx+1, n, k, arr, result);
    }
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> ret;
        vector<int> arr(k);
        solve(0, 0, n, k, arr, ret);
        return ret;
    }
};
```
