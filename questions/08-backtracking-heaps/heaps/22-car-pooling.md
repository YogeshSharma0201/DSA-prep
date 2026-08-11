# Car Pooling

**Link:** https://leetcode.com/problems/car-pooling/

## Problem
There is a car with `capacity` empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer `capacity` and an array `trips` where `trips[i] = [numPassengers_i, from_i, to_i]` indicates that the `i`-th trip has `numPassengers_i` passengers and the locations to pick them up and drop them off are `from_i` and `to_i` respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return `true` if it is possible to pick up and drop off all passengers for all the given trips, or `false` otherwise.

---

> [!IMPORTANT]
> **Key Takeaway**: When a problem does not explicitly state that the input is sorted, and the logic relies on chronological/sequential processing (like start times or pickup locations), **always remember to sort the input first!**

---

## Solution
1. **Sort Trips**: Sort `trips` by their pickup location `from_i` ascending.
2. **Min-Heap for Drop-offs**: Use a min-heap storing `{dropoffLocation, numPassengers}` ordered by `dropoffLocation`.
3. **Simulate Pickup & Drop-offs**:
   - Before picking up passengers for current trip `i`, pop all trips from the min-heap whose `dropoffLocation <= currentTrip.from_i` and restore the freed capacity.
   - Check if current capacity is sufficient for `currentTrip.numPassengers`. If not, return `false`.
   - Deduct passengers from `capacity` and push the current trip's drop-off details into the min-heap.

---

## Code
```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        // Sort trips primarily by starting/pickup location ('from')
        sort(trips.begin(), trips.end(), [](const vector<int>& a, const vector<int>& b) {
            if (a[1] == b[1]) return a[2] < b[2];
            return a[1] < b[1];
        });

        // Min-heap storing pair: {dropoffLocation, numPassengers}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

        for (int i = 0; i < trips.size(); i++) {
            // Drop off passengers whose destination is <= current trip's pickup location
            while (!pq.empty() && pq.top().first <= trips[i][1]) {
                capacity += pq.top().second;
                pq.pop();
            }

            // Check if current trip's passengers can fit
            if (capacity - trips[i][0] < 0) return false;
            
            capacity -= trips[i][0];
            pq.push({trips[i][2], trips[i][0]});
        }

        return true;
    }
};
```

---

## Complexity
- **Time Complexity:** $\mathcal{O}(N \log N)$ where $N$ is the number of trips (due to sorting and heap operations).
- **Space Complexity:** $\mathcal{O}(N)$ to store ongoing trips in the priority queue.
