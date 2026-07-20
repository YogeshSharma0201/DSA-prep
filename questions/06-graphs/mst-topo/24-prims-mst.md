# Prim's Minimum Spanning Tree

**Link:** https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/

## Problem
Given a connected, undirected, weighted graph with V vertices, find the Minimum Spanning Tree (MST) using Prim's algorithm. Return the total weight of the MST.

## Solution
Start from vertex 0. Use a min-heap of (weight, vertex) pairs. Maintain an `inMST[]` array. Greedily pick the minimum weight edge that connects a vertex in the MST to one outside. Add it to the MST and push its neighbors into the heap. Repeat until all vertices are included.

## Code
```cpp
int primsMST(int V, vector<vector<pair<int,int>>>& adj) {
    vector<bool> inMST(V, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int totalWeight = 0;
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += w;
        for (auto& [v, weight] : adj[u]) {
            if (!inMST[v]) pq.push({weight, v});
        }
    }
    return totalWeight;
}
```
