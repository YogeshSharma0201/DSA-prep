# Attend All Meetings II

**Link:** https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1

## Problem
Given a list of intervals representing the start and end times of meetings, find the minimum number of rooms required to schedule all meetings. A person can attend a new meeting if its start time is greater than or equal to the end time of the previous meeting.

## Solution
1. **Two-Pointer / Chronological Sorting**:
   Sort start times and end times independently. Keep a pointer for start times and a pointer for end times. Iterate through the start times. If the next meeting starts before the earliest ending meeting (`start[i] < end[endPtr]`), a new room is needed (increment room count). Otherwise, we can reuse a room, so we advance the end pointer.
2. **Min-Heap (Priority Queue)**:
   Sort the intervals by their start times. Iterate through them, using a min-heap to keep track of the end times of meetings in progress. If the top of the heap (earliest ending meeting) finishes before the current meeting starts, we pop it (reuse that room). Then we push the current meeting's end time. The maximum size of the heap is the minimum number of rooms needed.

> [!NOTE]
> This problem is mathematically equivalent to [Minimum Number of Platforms](file:///d:/Projects/DSA/questions/12-greedy/classic/04-minimum-platforms.md), with the key difference being the boundary condition: in Meeting Rooms II, we can reuse a room if a meeting starts exactly when another ends (`start[i] >= end[endPtr]`), whereas in Minimum Platforms, a train arriving at the same time another departs requires a separate platform (`arr[i] <= dep[j]`).

## Code

### C++ (with `vector<vector<int>> &intervals`)
```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>> &intervals) {
        if (intervals.empty()) return 0;
        
        vector<int> start, end;
        for (const auto& val : intervals) {
            start.push_back(val[0]);
            end.push_back(val[1]);
        }
        
        sort(start.begin(), start.end());
        sort(end.begin(), end.end());
        
        int rooms = 0;
        int endPtr = 0;
        
        for (int i = 0; i < start.size(); i++) {
            if (start[i] < end[endPtr]) {
                rooms++; // This is equivalent to starting a meeting
            } else {
                endPtr++; // Remember - Incrementing the endPtr is equivalent to freeing up a room
                // Notice for each increment in i we only free up one room
            }
        }
        
        return rooms;
    }
};
```

### C++ (with `vector<int> &start, vector<int> &end` using High-Water Mark)
```cpp
class Solution {
public:
    int minMeetingRooms(vector<int> &start, vector<int> &end) {
        sort(start.begin(), start.end());
        sort(end.begin(), end.end());
        
        int rooms = 0;
        int endPtr = 0;
        
        for (int i = 0; i < start.size(); i++) {
            if (start[i] < end[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
        }
        
        return rooms;
    }
};
```

### C++ (with `vector<int> &start, vector<int> &end` using Explicit Simulation)
```cpp
class Solution {
public:
    int minMeetingRooms(vector<int> &start, vector<int> &end) {
        sort(start.begin(), start.end());
        sort(end.begin(), end.end());
        
        int rooms = 0, maxRooms = 0;
        int startPtr = 0, endPtr = 0;
        int n = start.size();
        
        while (startPtr < n && endPtr < n) {
            if (start[startPtr] < end[endPtr]) {
                startPtr++;
                rooms++;
            }
            else {
                endPtr++;
                rooms--;
            }
            maxRooms = max(maxRooms, rooms);
        }
        return maxRooms;
    }
};
```
