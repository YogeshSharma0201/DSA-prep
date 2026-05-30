# Minimum Absolute Difference

**Link:** https://leetcode.com/problems/minimum-absolute-difference/

## Problem
Given an array of distinct integers `arr`, find all pairs of elements with the minimum absolute difference. Return a list of pairs `[a, b]` such that `a < b` and `b - a` equals the minimum absolute difference, sorted in ascending order by the first element.

## Solution
Sort the array so that the minimum difference always occurs between consecutive elements. In one pass, find the global minimum difference. In a second pass, collect all consecutive pairs whose difference equals that minimum. Sorting costs O(n log n) and the two passes are O(n).

## Code
```cpp
vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
    sort(arr.begin(), arr.end());

    int minDiff = INT_MAX;
    for (int i = 1; i < arr.size(); i++) {
        minDiff = min(minDiff, arr[i] - arr[i-1]);
    }

    vector<vector<int>> ret;
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] - arr[i-1] == minDiff) {
            ret.push_back({arr[i-1], arr[i]});
        }
    }
    return ret;
}
```
