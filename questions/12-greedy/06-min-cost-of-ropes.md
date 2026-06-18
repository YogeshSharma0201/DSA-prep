# Minimum Cost of Ropes

**Link:** https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/

## Problem
Given N ropes of different lengths, connect all ropes into one. The cost to connect two ropes is equal to the sum of their lengths. Find the minimum total cost to connect all ropes.

## Solution
Greedy: always connect the two shortest ropes first (minimum cost at each step). Use a min-heap. Repeatedly extract the two smallest, add their sum as cost, and push the combined rope back. This is the same as building a Huffman tree.

## Code
```cpp
long long minCostOfRopes(vector<int>& ropes) {
    priority_queue<long long, vector<long long>, greater<long long>> pq(
        ropes.begin(), ropes.end());
    long long cost = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        cost += a + b;
        pq.push(a + b);
    }
    return cost;
}
```
