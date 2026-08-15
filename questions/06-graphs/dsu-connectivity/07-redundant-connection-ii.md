# Redundant Connection II

**Link:** https://leetcode.com/problems/redundant-connection-ii/

## Problem
Given a directed graph that started as a rooted tree with one extra directed edge added, find the redundant edge. The extra edge can create either a node with two parents, a cycle, or both. Return the edge that if removed makes the graph a valid rooted tree.

## Solution
Handle three cases using Union-Find. First scan for a node with two parents (candA = first edge, candB = second edge causing the double parent). Then run Union-Find on all edges (skipping candB if it exists) to detect a cycle. If a cycle is found and no double-parent exists, the cycle edge is redundant. If both exist, candA is redundant. If only double-parent exists, candB is redundant.

## Code
```cpp
class Solution {
    vector<int> parent, rank;
public:
    int find(int x) {
        if(parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if(px == py) return false;
        if(rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if(rank[px] == rank[py]) rank[px]++;
        return true;
    }

    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        /*
        Case 1: two parents
            1 -> 2 both 1 and 2 are parent of 3 but no cycle as the graph is directed (remove any)
            1 -> 3
            2 -> 3
        Case 2 : cycle (remove any)
            1 -> 2
            2 -> 3
            3 -> 1
        Case 3: cycle with two parents (need to remove the edge from the cycle only)
            1 -> 2
            2 -> 3
            3 -> 1
            4 -> 2
        */

        int n = edges.size(); // tree with one extra edge so n == number of nodes
        parent.resize(n+1, 0);
        rank.resize(n+1, 0);

        // assign parent and find candidate nodes with two parents if they exist
        vector<int> candA, candB;
        for(auto& edge : edges) {
            if(parent[edge[1]] == 0) {
                parent[edge[1]] = edge[0];
            }
            else {
                candA = {parent[edge[1]], edge[1]};
                candB = edge;
                edge[1] = 0; // set it zero to check if removing this removes the cycle
            }
        }

        // reset parent[i] = i to prevent infinite recursion during dsu
        for(int i=1; i<=n; i++) parent[i] = i;

        for(auto& edge : edges) {
            if(edge[1] == 0) continue;
            if(!unite(edge[0], edge[1])) {
                // there is a cycle
                // since we already removed candB earlier so if candA is set
                // it must be removed
                if(!candA.empty()) return candA;
                return edge;
            }
        }
        return candB;
    }
};
```

