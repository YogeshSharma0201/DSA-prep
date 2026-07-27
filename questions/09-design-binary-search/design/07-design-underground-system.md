# Design Underground System

**Link:** https://leetcode.com/problems/design-underground-system/

## Problem
Implement the `UndergroundSystem` class:
- `checkIn(id, stationName, t)`: A customer with ID `id`, checks in at `stationName` at time `t`.
- `checkOut(id, stationName, t)`: A customer with ID `id`, checks out from `stationName` at time `t`.
- `getAverageTime(startStation, endStation)`: Returns the average time it takes to travel from `startStation` to `endStation`.

## Solution
Use two hash maps:
1. `startTime`: Maps passenger ID `id` to their check-in station name and time `(stationName, t)`.
2. `avgTime`: Maps a unique route key (e.g., `startStation + "#" + endStation`) to a pair of `(totalTime, count)` for calculating the average travel time.

On `checkIn`, store the passenger's start station and check-in time.
On `checkOut`, retrieve the check-in info, compute the duration, erase the customer from `startTime` to free space, and update the route's total time and count in `avgTime`.
On `getAverageTime`, return `totalTime / count`.

## Code
```cpp
class UndergroundSystem {
public:
    unordered_map<int, pair<string, int>> startTime;
    unordered_map<string, pair<int, int>> avgTime;

    UndergroundSystem() {
        
    }
    
    void checkIn(int id, string stationName, int t) {
        startTime[id] = {stationName, t};
    }
    
    void checkOut(int id, string stationName, int t) {
        auto [startStationName, st] = startTime[id];
        startTime.erase(id);

        int totalTime = t - st;

        avgTime[startStationName + "#" + stationName].first += totalTime;
        avgTime[startStationName + "#" + stationName].second += 1;
    }
    
    double getAverageTime(string startStation, string endStation) {
        auto &[total, count] = avgTime[startStation + "#" + endStation];

        return (1.0 * total) / count;
    }
};
```
