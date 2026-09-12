# Minimum Weight Cycle

**Link:** [Minimum Weight Cycle - GeeksforGeeks](https://www.geeksforgeeks.org/problems/minimum-weight-cycle/1)

## Problem Description

Given a weighted graph with `V` vertices and `edges`, find the weight of the **minimum weight cycle** in the graph.

---

## Solution: Edge Removal + Dijkstra's Shortest Path

### Key Intuition
A cycle containing an edge $u \to v$ with weight $w$ consists of that edge plus the shortest path from $u$ to $v$ in the graph **without using that specific direct edge $u \to v$**.

1. Iterate over every edge $(u, v, w)$ in the graph.
2. Run Dijkstra's algorithm starting from source node $u$ to destination node $v$, ignoring the direct edge $(u, v)$ during relaxation (`if (u != src || v != dest)`).
3. If a valid path of weight $d$ is found from $u$ to $v$, the cycle weight using this edge is $w + d$.
4. The answer is the minimum cycle weight found across all edges.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(E \cdot (E \log V))$ where $E$ is the number of edges and $V$ is the number of vertices.
- **Space Complexity:** $\mathcal{O}(V + E)$ for the adjacency list and distance array.

---

## Code (C++)

```cpp
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
  public:
    int dfs(int src, int dest, int V, vector<vector<pair<int,int>>>& adj) {
        vector<int> dist(V, INT_MAX >> 1);
        
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        
        pq.push({0, src});
        dist[src] = 0;
        
        while(!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            
            if(dist[u] < d) continue;
            
            for(auto [v, w] : adj[u]) {
                if((u != src || v != dest) && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        return dist[dest];
    }
    
    // remove edge and shortest path
    int findMinCycle(int V, vector<vector<int>>& edges) {
        vector<vector<pair<int,int>>> adj(V);
        
        for(int i = 0; i < edges.size(); i++) {
            adj[edges[i][0]].push_back({edges[i][1], edges[i][2]});
        }
        
        int minCost = INT_MAX >> 1;
        for(int i = 0; i < edges.size(); i++) {
            int d = dfs(edges[i][0], edges[i][1], V, adj);
            
            minCost = min(minCost, edges[i][2] + d);
        }
        
        return minCost;
    }
};
```
