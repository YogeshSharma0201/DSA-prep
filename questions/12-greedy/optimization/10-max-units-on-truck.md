# Maximum Units on a Truck

**Link:** https://leetcode.com/problems/maximum-units-on-a-truck/

## Problem
You are given boxTypes where boxTypes[i] = [numberOfBoxes, numberOfUnitsPerBox]. You have a truck with truckSize capacity (max number of boxes). Return the maximum total number of units that can be put on the truck.

## Solution
Greedy: sort box types in decreasing order of units per box. Take as many boxes as possible from the highest-unit type first, then move to the next type until the truck is full.

## Code
```cpp
int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {
    sort(boxTypes.begin(), boxTypes.end(), [](auto& a, auto& b) {
        return a[1] > b[1];
    });
    int totalUnits = 0;
    for (auto& box : boxTypes) {
        int take = min(truckSize, box[0]);
        totalUnits += take * box[1];
        truckSize -= take;
        if (truckSize == 0) break;
    }
    return totalUnits;
}
```
