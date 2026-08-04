# Car Fleet

**Link:** https://leetcode.com/problems/car-fleet/

## Problem
There are `n` cars at given miles away from the starting mile 0, traveling to `target` miles. You are given two integer arrays `position` and `speed`, both of length `n`, where `position[i]` is the starting position of the `i`th car and `speed[i]` is the speed of the `i`th car (in miles per hour).

A car cannot pass another car ahead of it, but it can catch up to it and drive at the same speed. The distance between these two cars is ignored (they are assumed to have the same position). A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to another car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.

## Solution
Sort the cars by their starting position in ascending order. Since a faster car cannot pass a slower car ahead of it, if a car behind reaches the target in less or equal time compared to a car in front of it, they will merge into the same fleet.

We can calculate the time each car takes to reach the target: `(target - position) / speed`.
Using a stack, we iterate through the sorted cars from left to right (from behind to front). If the current car (which is ahead of the cars in the stack) takes more or equal time to reach the target than a car in the stack (which is behind), the car in the stack will catch up to it and merge. We pop these faster cars from the stack since they join the current car's fleet. Finally, we push the current car onto the stack. The size of the stack at the end represents the total number of fleets.

## Code
```cpp
class Solution {
public:
    stack<pair<int,int>> st;

    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();

        vector<pair<int,int>> ps(n);
        for(int i=0; i<n; i++) {
            ps[i] = {position[i], speed[i]};
        }
        sort(ps.begin(), ps.end());

        // A fast car cannot pass a slow car
        // But a slow car might reach the target first
        // So calculate the time to reach target
        for(int i=0; i<n; i++) {

            while(!st.empty() && 
                (target-st.top().first)*1.0/st.top().second 
                    <= (target-ps[i].first)*1.0/ps[i].second) {
                st.pop();
            }
            
            st.push({ps[i].first, ps[i].second});
        }

        return st.size();
    }
};
```
