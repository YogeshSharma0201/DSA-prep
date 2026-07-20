# Find Right Interval

**Link:** https://leetcode.com/problems/find-right-interval?envType=study-plan-v2&envId=binary-search

## Problem
Given an array of intervals, for each interval find the index of the minimum-start interval whose start point is >= the end point of the current interval. Return -1 if no such interval exists.

## Solution
Store each interval's start point and original index in a `map<int,int>`. Since `map` is sorted by key, use `lower_bound(iv[1])` to binary search for the smallest start >= end of the current interval in O(log n).

## Code
```cpp
vector<int> findRightInterval(vector<vector<int>>& intervals) {
    map<int, int> startMap;
    for (int i = 0; i < intervals.size(); i++)
        startMap[intervals[i][0]] = i;

    vector<int> res;
    for (auto& iv : intervals) {
        auto it = startMap.lower_bound(iv[1]);
        res.push_back(it == startMap.end() ? -1 : it->second);
    }
    return res;
}
```
