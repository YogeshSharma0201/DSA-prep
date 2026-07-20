# Critical Connections in a Network

**Link:** https://leetcode.com/problems/critical-connections-in-a-network

## Problem
Given a network of n servers and a list of connections (undirected edges), find all critical connections — edges whose removal disconnects at least one server from the network. These are also called bridges.

## Solution
Use Tarjan's bridge-finding algorithm. Perform DFS tracking each node's discovery time (disc) and lowest reachable time (low). For each tree edge (u -> v), after DFS on v, update low[u] = min(low[u], low[v]). If low[v] > disc[u], the edge (u, v) is a bridge since v cannot reach u or any ancestor without passing through this edge.

## Code
```cpp
class Solution {
    int timer = 0;
    vector<int> disc, low;
    vector<bool> visited;
    vector<vector<int>> result;

    void dfs(int u, int parent, vector<vector<int>>& graph) {
        visited[u] = true;
        disc[u] = low[u] = timer++;

        for(int v : graph[u]) {
            if(!visited[v]) {
                dfs(v, u, graph);
                low[u] = min(low[u], low[v]);
                if(low[v] > disc[u])
                    result.push_back({u, v});
            } else if(v != parent) {
                low[u] = min(low[u], disc[v]);
            }
        }
    }

public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        disc.assign(n, 0);
        low.assign(n, 0);
        visited.assign(n, false);

        vector<vector<int>> graph(n);
        for(auto& c : connections) {
            graph[c[0]].push_back(c[1]);
            graph[c[1]].push_back(c[0]);
        }

        for(int i=0; i<n; i++)
            if(!visited[i])
                dfs(i, -1, graph);

        return result;
    }
};
```
