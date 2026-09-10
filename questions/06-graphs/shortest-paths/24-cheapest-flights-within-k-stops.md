# Cheapest Flights Within K Stops

**Link:** [Cheapest Flights Within K Stops - LeetCode](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

## Problem Description

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from_i, to_i, price_i]` indicates that there is a flight from city `from_i` to city `to_i` with cost `price_i`.

You are also given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with **at most `k` stops**. If there is no such route, return `-1`.

### Example 1:
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The optimal path with at most 1 stop is 0 -> 1 -> 3 with price 100 + 600 = 700.
The path 0 -> 1 -> 2 -> 3 has 2 stops and costs 400, which is invalid because stops > 1.
```

---

## Solution 1: Bellman-Ford / Array Copying (Recommended & Fastest)

Since each flight represents **1 stop**, finding a path with at most `k` stops is equivalent to finding the shortest path using at most `k + 1` edges.

### Algorithm
1. Maintain a 1D array `dist` of size `n` initialized to infinity (`INT_MAX`), with `dist[src] = 0`.
2. Perform $k + 1$ iterations:
   - Make a copy `temp = dist` before processing flights in the current iteration.
   - For every flight `[u, v, price]`:
     - If `dist[u] != INT_MAX` and `dist[u] + price < temp[v]`:
       - Update `temp[v] = dist[u] + price`.
   - Set `dist = temp`.
3. Return `dist[dst]` if it is not `INT_MAX`, otherwise return `-1`.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(K \cdot E)$ where $E$ is the number of flights.
- **Space Complexity:** $\mathcal{O}(V)$ for the distance arrays (`dist` and `temp`).

### Code (C++)

```cpp
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;

        // At most k + 1 flights (k stops)
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;
            for (const auto& flight : flights) {
                int u = flight[0];
                int v = flight[1];
                int price = flight[2];

                if (dist[u] != INT_MAX && dist[u] + price < temp[v]) {
                    temp[v] = dist[u] + price;
                }
            }
            dist = temp;
        }

        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```

---

## Solution 2: Level-by-Level Queue BFS

We can also process the graph using **Breadth-First Search (BFS)** with a standard `queue`. To strictly enforce the stop count limit, we process the queue **level by level** (using a `size = q.size()` loop for each step). 

> **Important Note on Level Isolation:** 
> We must use a `tempDist` array to record new distances during the current level and update `dist = tempDist` after the level completes. This prevents in-place updates from prematurely pruning nodes that are already in the queue for the current level.

### Algorithm
1. Build an adjacency list `adj` where `adj[u]` contains pairs `{v, price}`.
2. Maintain a 1D array `dist` initialized to `INT_MAX` with `dist[src] = 0`.
3. Push `{src, 0}` into a queue storing `{node, cost}` pairs.
4. While the queue is not empty and `stops <= k`:
   - Create `tempDist = dist` to buffer updates for the next level.
   - Process all nodes at the current level (`sz = q.size()`).
   - For each node `u` with current cost `d`:
     - For each neighbor `{v, price}`:
       - If `d + price < tempDist[v]`:
         - Update `tempDist[v] = d + price`.
         - Push `{v, tempDist[v]}` into the queue for the next level.
   - Update `dist = tempDist` after level completes.
   - Increment `stops`.
5. Return `dist[dst]` if reached, else `-1`.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(K \cdot E)$
- **Space Complexity:** $\mathcal{O}(V + E)$ for the queue and adjacency list.

### Code (C++)

```cpp
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // Lightweight adjacency list: adj[u] = {{v, price}, ...}
        vector<vector<pair<int, int>>> adj(n);
        for (const auto& f : flights) {
            adj[f[0]].push_back({f[1], f[2]});
        }

        vector<int> dist(n, INT_MAX);
        dist[src] = 0;

        // Queue stores {node, current_cost}
        queue<pair<int, int>> q;
        q.push({src, 0});

        int stops = 0;
        while (!q.empty() && stops <= k) {
            int sz = q.size();
            vector<int> tempDist = dist; // Copy distance array for level isolation

            while (sz--) {
                auto [node, d] = q.front();
                q.pop();

                for (auto& [next, price] : adj[node]) {
                    if (d + price < tempDist[next]) {
                        tempDist[next] = d + price;
                        q.push({next, tempDist[next]});
                    }
                }
            }
            dist = tempDist; // Update dist array after level processing finishes
            stops++;
        }

        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```
