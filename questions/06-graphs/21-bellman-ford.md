# Bellman-Ford Algorithm

**Link:** https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/

## Problem
Given a weighted directed graph with V vertices and E edges (may have negative weights), find the shortest distances from a source vertex to all other vertices. Also detect if a negative weight cycle exists.

## Solution
Relax all edges V-1 times. On each pass, for every edge (u, v, w), if dist[u] + w < dist[v], update dist[v]. After V-1 passes, do one more pass — if any distance still decreases, a negative cycle exists.

## Code
```cpp
vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
    // edges[i] = {u, v, w}
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto& e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    // Check for negative cycle
    for (auto& e : edges) {
        int u = e[0], v = e[1], w = e[2];
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            return {-1}; // negative cycle
    }
    return dist;
}
```
