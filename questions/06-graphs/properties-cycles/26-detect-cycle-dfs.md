# Detect Cycle in Graph using DFS

**Link:** https://www.geeksforgeeks.org/detect-cycle-in-a-graph/

## Problem
Given a graph (which may be directed or undirected), detect whether it contains a cycle using depth-first search. This is the generalized DFS-based cycle detection approach.

## Solution
For undirected graphs: track the parent to distinguish back edges from the edge to parent. For directed graphs: use a recursion stack (in-stack array) — a back edge to a node still in the stack signals a cycle. This file covers the BFS-based approach using Kahn's algorithm (topological sort): if not all nodes are processed, a cycle exists in the directed graph.

## Code
```cpp
// Directed graph cycle detection via Kahn's algorithm (BFS topological sort)
bool hasCycleDirected(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int u = 0; u < V; u++)
        for (int v : adj[u]) indegree[v]++;

    queue<int> q;
    for (int i = 0; i < V; i++)
        if (indegree[i] == 0) q.push(i);

    int processed = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        processed++;
        for (int v : adj[u])
            if (--indegree[v] == 0) q.push(v);
    }
    return processed != V; // cycle if not all nodes processed
}
```
