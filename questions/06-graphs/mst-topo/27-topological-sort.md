# Topological Sort

**Link:** https://www.geeksforgeeks.org/topological-sorting/

## Problem
Given a Directed Acyclic Graph (DAG) with V vertices and E edges, return a topological ordering of its vertices — a linear ordering such that for every directed edge u→v, vertex u comes before v in the ordering.

## Solution
DFS-based: perform DFS from each unvisited vertex. After fully exploring a vertex (all its descendants processed), push it onto a stack. The topological order is the reverse of the DFS finish order (stack top to bottom). Alternatively, use Kahn's algorithm: repeatedly remove vertices with in-degree 0 and reduce neighbors' in-degrees.

## Code
```cpp
// DFS-based topological sort
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v, adj, visited, st);
    st.push(u);
}

vector<int> topoSort(int V, vector<vector<int>>& adj) {
    vector<bool> visited(V, false);
    stack<int> st;
    for (int i = 0; i < V; i++)
        if (!visited[i]) dfs(i, adj, visited, st);
    vector<int> order;
    while (!st.empty()) { order.push_back(st.top()); st.pop(); }
    return order;
}
```
