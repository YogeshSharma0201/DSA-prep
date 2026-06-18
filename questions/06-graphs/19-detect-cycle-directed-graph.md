# Detect Cycle in a Directed Graph

**Link:** https://www.geeksforgeeks.org/detect-cycle-in-a-graph/

## Problem
Given a directed graph with V vertices and E edges, detect if there is a cycle in the graph.

## Solution
DFS with two visited arrays: `visited[]` (globally visited) and `recStack[]` (currently in the DFS recursion stack). A back edge — reaching a node already in the recursion stack — indicates a cycle. After finishing a DFS from a node, remove it from the recursion stack.

## Code
```cpp
class Solution {
    bool dfs(int u, vector<vector<int>>& adj,
             vector<bool>& visited, vector<bool>& recStack) {
        visited[u] = recStack[u] = true;
        for (int v : adj[u]) {
            if (!visited[v] && dfs(v, adj, visited, recStack)) return true;
            if (recStack[v]) return true;
        }
        recStack[u] = false;
        return false;
    }
public:
    bool isCyclic(int V, vector<vector<int>>& adj) {
        vector<bool> visited(V, false), recStack(V, false);
        for (int i = 0; i < V; i++)
            if (!visited[i] && dfs(i, adj, visited, recStack)) return true;
        return false;
    }
};
```
