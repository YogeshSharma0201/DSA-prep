# Kruskal's Minimum Spanning Tree

**Link:** https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/

## Problem
Given a connected, undirected, weighted graph with V vertices and E edges, find the Minimum Spanning Tree (MST) using Kruskal's algorithm. Return the total weight of the MST.

## Solution
Sort all edges by weight. Use a DSU (Disjoint Set Union) structure. Iterate through edges in ascending weight order; add an edge to the MST only if its two endpoints are in different components (would not create a cycle). Stop when V-1 edges are added.

## Code
```cpp
struct DSU {
    vector<int> parent, rank_;
    DSU(int n) : parent(n), rank_(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }
};

int kruskalsMST(int V, vector<tuple<int,int,int>>& edges) {
    // edges: {weight, u, v}
    sort(edges.begin(), edges.end());
    DSU dsu(V);
    int totalWeight = 0, edgesUsed = 0;
    for (auto& [w, u, v] : edges) {
        if (dsu.unite(u, v)) {
            totalWeight += w;
            if (++edgesUsed == V - 1) break;
        }
    }
    return totalWeight;
}
```
