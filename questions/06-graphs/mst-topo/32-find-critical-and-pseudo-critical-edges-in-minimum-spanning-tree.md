# Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

**Link:** [LeetCode 1489 - Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/)

## Problem Description

Given a weighted undirected connected graph with $n$ vertices labeled from $0$ to $n-1$, and an array `edges` where `edges[i] = [from_i, to_i, weight_i]` represents a bidirectional edge between `from_i` and `to_i` with weight `weight_i`.

A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find all the **critical** and **pseudo-critical** edges in the given graph's MST:
- **Critical Edge:** An edge whose deletion increases the MST weight or disconnects the graph.
- **Pseudo-Critical Edge:** An edge that is **not critical**, but can appear in **at least one** MST.

Return a vector of two vectors: `[criticalEdges, pseudoCriticalEdges]`.

---

## Algorithm & Intuition

1. **Sort Edges with Original Indices:**
   Attach the original index `i` to each edge (`edges[i].push_back(i)`), then sort `edges` in ascending order by weight.
   
2. **Compute Baseline MST Weight ($W_{mst}$):**
   Run Kruskal's algorithm on the sorted edges to find the standard MST total weight.

3. **Classify Each Edge $i$:**
   - **Check for Critical Edge:**
     Exclude edge $i$ and run Kruskal's (`mst(n, ignoreEdge = i, includeEdge = -1)`).
     If the resulting weight $> W_{mst}$ (or graph is disconnected), edge $i$ is **Critical**.
   - **Check for Pseudo-Critical Edge:**
     If edge $i$ is not critical, force-include it first, then run Kruskal's (`mst(n, ignoreEdge = -1, includeEdge = i)`).
     If the resulting weight $== W_{mst}$, edge $i$ is **Pseudo-Critical**.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(E \log E + E^2 \cdot \alpha(V))$
  - Sorting $E$ edges takes $\mathcal{O}(E \log E)$.
  - We call `mst()` $2E + 1$ times. Each `mst()` call runs Kruskal's over $E$ edges in $\mathcal{O}(E \cdot \alpha(V))$ time using Disjoint Set Union (DSU).
  - Overall time complexity is $\mathcal{O}(E^2 \cdot \alpha(V))$. Given $E \le 200$, this executes in a few milliseconds.
- **Space Complexity:** $\mathcal{O}(V + E)$
  - $\mathcal{O}(V)$ for DSU `parent` and `rank` arrays.
  - $\mathcal{O}(E)$ to store original indices and output vectors.

---

## Code (C++)

```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    vector<int> parent, rank;

public:
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x);
        int py = find(y);

        if (px == py) return false;

        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;

        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }

    int mst(int n, int ignoreedge, int includeedge, const vector<vector<int>>& edges) {
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        int totw = 0;

        // Force include edge if specified
        if (includeedge != -1) {
            totw += edges[includeedge][2];
            unite(edges[includeedge][0], edges[includeedge][1]);
        }

        // Run Kruskal's algorithm on pre-sorted edges
        for (int idx = 0; idx < edges.size(); idx++) {
            if (ignoreedge == idx || includeedge == idx) continue;

            int u = edges[idx][0];
            int v = edges[idx][1];
            int w = edges[idx][2];

            if (unite(u, v)) {
                totw += w;
            }
        }

        // Check if all nodes are connected
        for (int i = 1; i < n; i++) {
            if (find(i) != find(0))
                return INT_MAX >> 1;
        }

        return totw;
    }

    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        parent.resize(n);
        rank.resize(n);

        // Track original indices before sorting
        for (int i = 0; i < edges.size(); i++) {
            edges[i].push_back(i);
        }

        // Sort edges by weight
        sort(edges.begin(), edges.end(), [](const auto& a, const auto& b) {
            return a[2] < b[2];
        });

        // Step 1: Base MST weight
        int mstw = mst(n, -1, -1, edges);

        vector<int> criticalEdges;
        vector<int> psuedocritical;

        // Step 2: Test each edge
        for (int i = 0; i < edges.size(); i++) {
            // Check if critical (ignoring increases MST weight or disconnects graph)
            if (mst(n, i, -1, edges) > mstw) {
                criticalEdges.push_back(edges[i][3]);
            }
            // Check if pseudo-critical (force-including yields base MST weight)
            else if (mst(n, -1, i, edges) == mstw) {
                psuedocritical.push_back(edges[i][3]);
            }
        }

        return {criticalEdges, psuedocritical};
    }
};
```
