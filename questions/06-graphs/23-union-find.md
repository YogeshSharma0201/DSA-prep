# Union-Find (Disjoint Set Union)

**Link:** https://www.geeksforgeeks.org/union-find/

## Problem
Implement the Union-Find data structure that supports two operations efficiently: Union (merge two sets) and Find (determine which set an element belongs to). Use it to detect cycles in an undirected graph.

## Solution
Maintain a `parent[]` and `rank[]` array. Find uses path compression (set every node's parent to root during traversal). Union uses union by rank (attach smaller-rank tree under larger-rank root). Both operations run in near O(1) amortized with these optimizations.

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
        if (px == py) return false; // cycle detected
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }
};

bool hasCycle(int V, vector<pair<int,int>>& edges) {
    DSU dsu(V);
    for (auto& [u, v] : edges)
        if (!dsu.unite(u, v)) return true;
    return false;
}
```
