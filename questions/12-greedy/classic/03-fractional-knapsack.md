# Fractional Knapsack

**Link:** https://www.geeksforgeeks.org/fractional-knapsack-problem/

## Problem
Given weights and values of N items and a knapsack capacity W, find the maximum value achievable. Unlike 0/1 knapsack, you can take fractions of items.

## Solution
Greedy: compute value-to-weight ratio for each item. Sort items in descending order of ratio. Take as much of each item as possible (starting from the highest ratio). If the item fits entirely, take it; otherwise take the fraction that fills the remaining capacity.

## Code
```cpp
double fractionalKnapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b) {
        return (double)val[a]/wt[a] > (double)val[b]/wt[b];
    });

    double totalValue = 0;
    int remaining = W;
    for (int i : idx) {
        if (remaining <= 0) break;
        int take = min(remaining, wt[i]);
        totalValue += (double)take * val[i] / wt[i];
        remaining -= take;
    }
    return totalValue;
}
```
