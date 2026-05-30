# Gas Station

**Link:** https://leetcode.com/problems/gas-station/

## Problem
There are n gas stations arranged in a circle. At station i, you can pick up gas[i] liters of gas and it costs cost[i] liters to travel to the next station. Starting with an empty tank, find the starting station index from which you can complete the circuit, or return -1 if impossible.

## Solution
First verify a solution exists: if total gas >= total cost, exactly one solution is guaranteed. Then track a running currentGas sum; if it drops below zero, the current candidate start and everything before it cannot be the answer, so reset and start from the next station.

## Code
```cpp
int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int totalGas = 0, totalCost = 0;
    for (int i = 0; i < gas.size(); i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }

    if (totalGas < totalCost) {
        return -1;
    }

    int currentGas = 0;
    int start = 0;

    // Because the solution is guaranteed, we just go from 0 to gas.size() once
    for (int i = 0; i < gas.size(); i++) {
        currentGas += gas[i] - cost[i];
        if (currentGas < 0) {
            currentGas = 0;
            start = i + 1;
        }
    }

    return start;
}
```
