# Is Graph Bipartite

**Link:** https://leetcode.com/problems/is-graph-bipartite

## Problem
Given an undirected graph represented as an adjacency list, determine if the graph is bipartite. A graph is bipartite if its nodes can be split into two independent sets A and B such that every edge connects a node in A to a node in B.

## Solution
Use DFS coloring with two colors (0 and 1). Start each unvisited node with color 0 and alternate colors as we recurse into neighbors. If any neighbor already has the same color as the current node, the graph is not bipartite. Repeat for all unvisited nodes to handle disconnected components.

## Code
```cpp
bool dfs(vector<vector<int>>& graph, vector<int>& color, int node, int currColor) {
    color[node] = currColor;
    for(auto neighbor : graph[node]) {
        if(color[neighbor] == color[node]) return false;
        if(color[neighbor] == -1 && !dfs(graph, color, neighbor, 1-currColor)) {
            return false;
        }
    }
    return true;
}

bool isBipartite(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, -1);

    // dfs to return yes if bipartite and no if not

    for(int i=0; i<n; i++) {
        if(color[i] == -1 && !dfs(graph, color, i, 0)) {
            return false;
        }
    }
    return true;
}
```
