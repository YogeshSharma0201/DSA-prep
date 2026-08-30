# Min Cost to Connect All Points

**Link:** [Min Cost to Connect All Points - LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)

## Problem

You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the **Manhattan distance** between them: `|xi - xj| + |yi - yj|`.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

---

## Solution

This problem is equivalent to finding the **Minimum Spanning Tree (MST)** of a complete graph where vertices are points and edge weights are Manhattan distances between them.

### Approach 1: Prim's Algorithm (Priority Queue / Min-Heap)
- **Concept:** Node-by-node construction. Mark nodes as visited when popped from the priority queue (greedy selection of the lowest weight edge connecting an unvisited node to the MST).
- **Steps:**
  1. Maintain an `isVis` vector to track visited nodes.
  2. Push starting pair `{0, 0}` (weight 0, node 0) into a min-heap `pq`.
  3. Pop `(w, u)` from `pq`. If node `u` is already visited, skip.
  4. Otherwise, mark `u` as visited and add `w` to `totalW`.
  5. For all other unvisited nodes `i`, calculate Manhattan distance from `u` to `i` and push `(dist, i)` into `pq`.
  6. Repeat until `pq` is empty.

### Approach 2: Kruskal's Algorithm (DSU)
- Generate all O(N^2) edges `(distance, u, v)`.
- Sort all edges by weight in ascending order.
- Use Disjoint Set Union (DSU) with path compression and rank to greedily unite edges that do not form a cycle until $N - 1$ edges are added.

---

## Complexity Analysis

- **Time Complexity:** O(N^2 log N) using Priority Queue based Prim's algorithm (or O(N^2) using array-based Prim's for dense graphs).
- **Space Complexity:** O(N^2) in worst case for priority queue storing edges to unvisited nodes.

---

## Code

### Prim's Algorithm (C++)

```cpp
class Solution {
public:
    int getDist(int x, int y, vector<vector<int>>& points) {
        return abs(points[x][0]-points[y][0]) + abs(points[x][1]-points[y][1]);
    }

    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;

        vector<int> isVis(n, false);
        pq.push({0,0});

        int totalW = 0;
        while(!pq.empty()) {
            auto [w, u] = pq.top(); pq.pop();
            if(isVis[u]) continue;
            isVis[u] = true;
            totalW += w;

            for(int i=0; i<n; i++) {
                if(i == u) continue;
                if(!isVis[i]) {
                    pq.push({getDist(u, i, points), i});
                }
            }
        }

        return totalW;
    }
};

// kruskal
// prims = node by node, mark visited when on the node, the edge with lowest weight
```
