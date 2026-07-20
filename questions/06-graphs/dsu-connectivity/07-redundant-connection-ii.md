# Redundant Connection II

**Link:** https://leetcode.com/problems/redundant-connection-ii/

## Problem
Given a directed graph that started as a rooted tree with one extra directed edge added, find the redundant edge. The extra edge can create either a node with two parents, a cycle, or both. Return the edge that if removed makes the graph a valid rooted tree.

## Solution
Handle three cases using Union-Find. First scan for a node with two parents (candA = first edge, candB = second edge causing the double parent). Then run Union-Find on all edges (skipping candB if it exists) to detect a cycle. If a cycle is found and no double-parent exists, the cycle edge is redundant. If both exist, candA is redundant. If only double-parent exists, candB is redundant.

## Code
```cpp
class Solution {
public:
    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n+1, 0), candA, candB;
        // step 1, check whether there is a node with two parents
        for (auto &edge : edges) {
            if (parent[edge[1]] == 0)
                parent[edge[1]] = edge[0];
            else {
                candA = {parent[edge[1]], edge[1]};
                candB = edge;
                edge[1] = 0;
            }
        }
        // step 2, union find
        for (int i = 1; i <= n; i++) parent[i] = i;
        for (auto &edge : edges) {
            if (edge[1] == 0) continue;
            int u = edge[0], v = edge[1], pu = root(parent, u);
            // Now every node only has 1 parent, so root of v is implicitly v
            if (pu == v) {
                if (candA.empty()) return edge;
                return candA;
            }
            parent[v] = pu;
        }
        return candB;
    }
private:
    int root(vector<int>& parent, int k) {
        if (parent[k] != k)
            parent[k] = root(parent, parent[k]);
        return parent[k];
    }
};
```
