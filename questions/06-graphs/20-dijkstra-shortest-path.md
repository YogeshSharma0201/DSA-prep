# Dijkstra's Shortest Path Algorithm

**Link:** https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/

## Problem
Given a weighted undirected graph with V vertices, find the shortest distances from a source vertex to all other vertices. All edge weights are non-negative.

## Solution
Use a min-heap (priority queue) of (distance, vertex) pairs. Initialize source distance to 0, all others to infinity. Greedily extract the minimum-distance vertex, then relax its neighbors. Skip a vertex if we've already processed it with a shorter distance.

## Code
```cpp
vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int src) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```
