# Non-overlapping Intervals

**Link:** https://leetcode.com/problems/non-overlapping-intervals/

## Problem
Given an array of intervals, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping. Two intervals that only touch at a point are considered non-overlapping.

## Solution
Sort intervals by end time. Greedily keep intervals with the earliest end time (they leave most room for future intervals). For each interval, if its start is before the previous kept interval's end, it overlaps and must be removed (increment count). Otherwise update the tracked end.

## Code
```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int res = 0;

        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });
        int prev_end = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            if (prev_end > intervals[i][0]) {
                res++;
            } else {
                prev_end = intervals[i][1];
            }
        }

        return res;
    }
};
```
