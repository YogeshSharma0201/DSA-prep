# Minimum Number of Refueling Stops

**Link:** https://leetcode.com/problems/minimum-number-of-refueling-stops/

## Problem
A car travels from a starting position to a destination which is `target` miles east of the starting position. There are gas stations along the way. The car starts with `startFuel` units of gasoline. Each station `i` is at `stations[i][0]` miles east of the starting position and has `stations[i][1]` liters of fuel. The car consumes 1 liter of fuel per mile. Find the minimum number of refueling stops the car must make to reach the destination. If it cannot reach the destination, return `-1`.

## Solution
Use a max-heap (priority queue) to greedily pick the station with the most fuel among all reachable stations. Iterate through stations, pushing reachable ones onto the heap. When stuck, pop the station with the most fuel from the heap, refuel, and continue. This ensures the minimum number of stops since we always take the best available fuel when needed.

## Code
```cpp
class Solution {
public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        if(startFuel >= target) return 0;
        int n = stations.size();
        vector<bool> isVis(n, false);
        priority_queue<pair<int, int>> pq;

        for(int i=0; i<n; i++) {
            if(stations[i][0] <= startFuel) {
                pq.push({stations[i][1], i});
                isVis[i] = true;
            }
            else break;
        }

        int cnt = 0, totalfuel = startFuel;
        while(!pq.empty()) {
            auto p = pq.top();
            pq.pop();
            cnt++;
            totalfuel += p.first;

            if(totalfuel >= target) return cnt;

            for(int i=p.second+1; i<n; i++) {
                if(stations[i][0] > totalfuel) break;

                if(!isVis[i]) {
                    pq.push({stations[i][1], i});
                    isVis[i] = true;
                }
            }
        }

        return -1;
    }
};
```
