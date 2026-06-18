# Activity Selection Problem

**Link:** https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/

## Problem
Given N activities with their start and end times, select the maximum number of activities that can be performed by a single person, assuming a person can only work on one activity at a time.

## Solution
Greedy: sort activities by their finish time. Always pick the activity that finishes earliest (greedy choice). After selecting an activity, skip all activities that start before the previous one finishes. This maximizes the number of activities selected.

## Code
```cpp
int activitySelection(vector<int>& start, vector<int>& end, int n) {
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b) {
        return end[a] < end[b];
    });

    int count = 1;
    int lastEnd = end[idx[0]];
    for (int i = 1; i < n; i++) {
        if (start[idx[i]] >= lastEnd) {
            count++;
            lastEnd = end[idx[i]];
        }
    }
    return count;
}
```
