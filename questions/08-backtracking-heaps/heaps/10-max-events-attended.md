# Maximum Number of Events That Can Be Attended

**Link:** https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/

## Problem
Given a list of events where `events[i] = [startDay, endDay]`, you can attend one event per day. An event can be attended on any day between its start and end day (inclusive). Return the maximum number of events you can attend.

## Solution
Sort events by start day. Simulate day by day using a min-heap of end days. On each day, add all events that start today to the heap, then remove all expired events (end day < today), then greedily attend the event with the earliest end day (pop the heap minimum). This greedy choice maximizes future options.

## Code
```cpp
class Solution {
public:
    int maxEvents(vector<vector<int>>& events) {
        sort(events.begin(), events.end());
        priority_queue<int, vector<int>, greater<int>> minHeap;
        int i = 0, n = events.size(), attended = 0;

        for (int day = 1; day <= 100000; day++) {
            // Add all events starting today
            while (i < n && events[i][0] == day)
                minHeap.push(events[i++][1]);
            // Remove expired events
            while (!minHeap.empty() && minHeap.top() < day)
                minHeap.pop();
            // Attend earliest-ending event
            if (!minHeap.empty()) {
                minHeap.pop();
                attended++;
            }
            if (i == n && minHeap.empty()) break;
        }
        return attended;
    }
};
```
