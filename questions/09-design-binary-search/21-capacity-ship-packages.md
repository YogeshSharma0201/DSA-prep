# Capacity to Ship Packages Within D Days

**Link:** https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

## Problem
Given an array `weights` and integer `days`, find the minimum ship capacity such that all packages can be shipped within `days` days. Packages must be shipped in order, and each day's load cannot exceed the capacity.

## Solution
Binary search on the answer (capacity). The feasibility check simulates the loading greedily: accumulate weights until adding the next would exceed capacity, then start a new day. The minimum possible capacity is `max(weights)` (must fit any single package) and the maximum is `sum(weights)` (ship everything in one day) — but since we use `lo = 1` and let the check handle invalid values, we set `hi = 1e9 + 1` as a safe exclusive upper bound.

## Code
```cpp
class Solution {
    bool check(vector<int>& weights, int cap, int maxD) {
        int days = 0, currW = 0;
        for(int w : weights) {
            if(w > cap) return false; // single package exceeds capacity
            currW += w;
            if(currW > cap) { days++; currW = w; }
        }
        if(currW != 0) days++;
        return days <= maxD;
    }

public:
    int shipWithinDays(vector<int>& weights, int days) {
        int lo = 1, hi = (int)1e9+1;
        while(lo < hi) {
            int mid = (lo+hi) >> 1;
            if(check(weights, mid, days)) hi = mid;
            else lo = mid+1;
        }
        return lo;
    }
};
```
