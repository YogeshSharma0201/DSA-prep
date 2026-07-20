# Detect Cycle in Undirected Graph

**Link:** https://www.geeksforgeeks.org/detect-cycle-undirected-graph/

## Problem
Given an undirected graph with V vertices and E edges, detect if there is a cycle in the graph.

## Solution
DFS from each unvisited node, passing the parent to avoid treating the edge back to parent as a back edge. If we reach a visited node that is not the parent of the current node, a cycle exists. Alternatively, use Union-Find: for each edge, if both endpoints are in the same component, a cycle exists.

## Code
```cpp
class Solution {
    bool dfs(int u, int parent, vector<vector<int>>& adj, vector<bool>& visited) {
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v]) {
                if (dfs(v, u, adj, visited)) return true;
            } else if (v != parent) {
                return true;
            }
        }
        return false;
    }
public:
    bool isCycle(int V, vector<vector<int>>& adj) {
        vector<bool> visited(V, false);
        for (int i = 0; i < V; i++)
            if (!visited[i] && dfs(i, -1, adj, visited)) return true;
        return false;
    }
};
```
