# Network Delay Time

**Link:** https://leetcode.com/problems/network-delay-time

## Problem
You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

## Solution
This is solved by Dijkstra's shortest path algorithm. We find the shortest path from the starting node `k` to all other nodes. The total time for the signal to reach all nodes will be the maximum of the shortest path distances to all nodes. If any node is unreachable (distance remains infinity), we return `-1`.

## Code
```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int,int>>> adj(n);

        for(auto time : times) {
            adj[time[0]-1].push_back({time[1]-1, time[2]});
        }

        priority_queue<pair<int,int>> pq;
        pq.push({0, k-1});
        vector<int> dist(n, INT_MAX>>1);
        dist[k-1] = 0;

        while(!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if(-d > dist[u]) continue;

            for(auto &[v, w] : adj[u]) {
                if(dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    pq.push({-dist[v], v});
                }
            }
        }

        int maxt = 0;
        for(int i=0; i<n; i++) {
            if(dist[i] >= (INT_MAX>>1)) return -1;
            maxt = max(maxt, dist[i]);
        }
        return maxt;
    }
};
```
