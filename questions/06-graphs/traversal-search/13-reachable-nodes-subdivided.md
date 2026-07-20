# Reachable Nodes in Subdivided Graph

**Link:** https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/

## Problem
Given an undirected graph where each edge (u, v, cnt) has cnt subdivided nodes inserted between u and v, and you start at node 0 with maxMoves steps, return the total number of nodes (original + subdivided) reachable within maxMoves steps.

## Solution
Run Dijkstra's algorithm on the original n nodes to compute the maximum remaining moves when reaching each node from node 0. For each edge, the subdivided nodes reachable from each endpoint is min(movesLeft, cnt). The total reachable subdivided nodes on an edge is min(cnt, fromU + fromV) where fromU and fromV are moves left at each endpoint.

## Code
```cpp
int reachableNodes(vector<vector<int>>& edges, int maxMoves, int n) {
    vector<unordered_map<int,int>> adj(n, unordered_map<int,int>());

    for(int i=0; i<edges.size(); i++) {
        adj[edges[i][0]][edges[i][1]] = edges[i][2];
        adj[edges[i][1]][edges[i][0]] = edges[i][2];
    }

    vector<bool> isVisited(n, false);
    priority_queue<pair<int,int>> queue;

    queue.push({maxMoves, 0});
    int count = 0;

    while(!queue.empty()) {
        pair<int,int> p = queue.top();
        queue.pop();

        if(isVisited[p.second]) continue;
        count++;
        isVisited[p.second] = true;

        for(auto it : adj[p.second]) {
            int tc = min(p.first, it.second);
            count += tc;
            adj[p.second][it.first] -= tc;
            adj[it.first][p.second] -= tc;

            if(!isVisited[it.first]) {
                if(p.first-1-tc >= 0)
                    queue.push({ p.first-1-tc, it.first });
            }
        }
    }

    return count;
}
```
