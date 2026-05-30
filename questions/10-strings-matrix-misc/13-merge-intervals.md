# Merge Intervals

**Link:** https://leetcode.com/problems/merge-intervals

## Problem
Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Solution
Sort intervals by start time. Maintain a current merged interval (startP, endP). For each subsequent interval, if its start is within the current end, extend the end (take max). Otherwise, push the current interval to results and start a new one.

## Code
```cpp
bool compare(vector<int>& a, vector<int>& b) {
    if(a[0] == b[0]) return a[1] < b[1];
    return a[0] < b[0];
}

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), compare);

        int startP = intervals[0][0], endP = intervals[0][1];
        vector<vector<int>> res;

        for(int i=1; i<intervals.size(); i++) {
            if(intervals[i][0] > endP) {
                res.push_back({startP, endP});
                startP = intervals[i][0];
                endP = intervals[i][1];
            }
            else {
                endP = max(endP, intervals[i][1]);
            }
        }
        res.push_back({startP, endP});
        return res;
    }
};
```
