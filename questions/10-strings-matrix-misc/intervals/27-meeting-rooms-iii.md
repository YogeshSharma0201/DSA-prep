# Meeting Rooms III

**Link:** https://leetcode.com/problems/meeting-rooms-iii

## Problem
You are given an integer `n` representing the number of meeting rooms numbered from `0` to `n - 1`, and a 2D integer array `meetings` where `meetings[i] = [start_i, end_i]` indicates that a meeting is scheduled from `start_i` (inclusive) to `end_i` (exclusive).

Meetings are allocated to rooms according to the following rules:
1. **Lowest Room Number:** Each meeting is assigned to the unused room with the lowest index.
2. **Delay Mechanism:** If no rooms are free, the meeting is delayed until a room becomes free. The delayed meeting retains its original duration.
3. **Priority for Earlier Meetings:** When multiple meetings are waiting for a room, the meeting with the earliest original start time is given priority.

Return the **index of the room that held the most meetings**. If there are multiple rooms with the maximum number of meetings, return the room with the **lowest index**.

### Constraints
- $1 \le n \le 100$
- $1 \le \text{meetings.length} \le 10^5$
- $\text{meetings}[i].\text{length} == 2$
- $0 \le \text{start}_i < \text{end}_i \le 5 \times 10^5$
- All the values of $\text{start}_i$ are **unique**.

---

## Solution (Double Min-Heap Simulation)

### Approach
1. **Sort Meetings**: Sort the meetings by their start times to process them chronologically.
2. **Two Min-Heaps**:
   - `free_rooms` (`rpq`): A min-heap containing the indices of all currently available rooms.
   - `busy_rooms` (`mpq`): A min-heap storing pairs of `(end_time, room_index)` for meetings currently in progress, sorted by earliest end time.
3. **Simulation**:
   - For each meeting `[start, end]`:
     - **Free Finished Rooms:** While the earliest-ending busy room has an `end_time <= start`, pop it from `busy_rooms` and push its `room_index` back into `free_rooms`.
     - **Room Allocation:**
       - If there is a free room: Allocate the one with the lowest index (top of `free_rooms`). Push `(end, room_index)` to `busy_rooms`.
       - If no room is free: Delay the meeting. Pop the earliest-ending room from `busy_rooms`. The new start time becomes its `end_time`. Push the new `(earliest_end_time + duration, room_index)` back to `busy_rooms`.
     - **Track Frequency:** Increment the meeting count for the allocated room.
4. **Identify Winner**: Scan the room frequencies and find the room with the maximum count. If there is a tie, return the lowest index.

### Complexity
- **Time Complexity:** O(M log M + M log N) where $M$ is the number of meetings and $N$ is the number of rooms. Sorting takes O(M log M) time, and each meeting performs O(log N) operations on the heaps.
- **Space Complexity:** O(N) to store room states in the priority queues and track room frequencies.

---

## Code

### C++ (Your Original Version)
```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> mpq; // inprogress meeting, min endtime, (endtime, roomIdx)
        priority_queue<int, vector<int>, greater<int>> rpq; // roomIdx

        // add all free rooms
        for(int i=0; i<n; i++) rpq.push(i);

        sort(meetings.begin(), meetings.end());

        int cr = 0;
        vector<int> roomfreq(n, 0);
        for(int i=0; i<meetings.size(); i++) {
            // check ended meetings
            while(!mpq.empty() && mpq.top().first <= meetings[i][0]) {
                // add back freed room
                rpq.push(mpq.top().second);
                mpq.pop();
            }

            if(rpq.empty()) { // no room, delay meeting
                auto m = mpq.top();
                mpq.pop();

                long long delay = m.first*1LL - meetings[i][0];
                roomfreq[m.second]++;
                mpq.push({meetings[i][1] + delay, m.second});
            }
            else {
                int r = rpq.top(); rpq.pop();
                roomfreq[r]++;
                mpq.push({meetings[i][1], r});
            }
        }

        int ansIdx = n-1, maxC = roomfreq[n-1];
        for(int i=n-2; i>=0; i--) {
            if(roomfreq[i] >= maxC) {
                maxC = roomfreq[i];
                ansIdx = i;
            }
        }

        return ansIdx;
    }
};
```

### C++ (Cleaned-Up Alternative)
Below is a refactored version of your logic that uses more descriptive names, simplifies the tie-breaker search, and uses clear variable assignments.

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        // Min-heap to keep track of available room indices: [room_index]
        priority_queue<int, vector<int>, greater<int>> free_rooms;
        for (int i = 0; i < n; i++) {
            free_rooms.push(i);
        }

        // Min-heap for busy rooms: [end_time, room_index]
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> busy_rooms;

        // Sort meetings by original start time
        sort(meetings.begin(), meetings.end());

        vector<int> room_usage(n, 0);

        for (const auto& meeting : meetings) {
            long long start = meeting[0];
            long long end = meeting[1];
            long long duration = end - start;

            // 1. Release rooms that are free by the start of the current meeting
            while (!busy_rooms.empty() && busy_rooms.top().first <= start) {
                free_rooms.push(busy_rooms.top().second);
                busy_rooms.pop();
            }

            // 2. Allocate room
            if (!free_rooms.empty()) {
                // Room is available immediately
                int room = free_rooms.top();
                free_rooms.pop();
                room_usage[room]++;
                busy_rooms.push({end, room});
            } else {
                // All rooms busy: delay the meeting until the earliest one is free
                auto [earliest_end, room] = busy_rooms.top();
                busy_rooms.pop();
                room_usage[room]++;
                // Delayed end time is: earliest_end + original duration
                busy_rooms.push({earliest_end + duration, room});
            }
        }

        // Find the room with the maximum meetings (prefer lowest index on tie)
        int best_room = 0;
        for (int i = 1; i < n; i++) {
            if (room_usage[i] > room_usage[best_room]) {
                best_room = i;
            }
        }

        return best_room;
    }
};
```

---

## Notes & Thoughts
- **Initial Idea / Breakdown:**
  - Sort meetings by start time to process them chronologically.
  - To pick the lowest numbered room when multiple are free, a min-heap (`free_rooms`) is ideal.
  - To handle meeting delays, we need to know which room becomes free earliest. A second min-heap (`busy_rooms`) keyed on meeting `end_time` provides this in O(1) time.
  - If a meeting is delayed, its duration remains constant, meaning `new_end_time = earliest_free_time + (original_end - original_start)`.
