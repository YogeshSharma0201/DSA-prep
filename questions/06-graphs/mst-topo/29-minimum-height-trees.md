# Minimum Height Trees

**Link:** [Minimum Height Trees - LeetCode](https://leetcode.com/problems/minimum-height-trees/)

## Problem

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labeled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [a_i, b_i]` indicates that there is an undirected edge between the two nodes `a_i` and `b_i`, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`) are called **minimum height trees (MHTs)**.

Return a list of all MHTs' root labels. You can return the answer in **any order**.

---

## Solution (Topological Leaf Trimming / Centroid Finding)

The roots of Minimum Height Trees are the **centroid(s)** of the tree. Any tree has at most **1 or 2 centroids**.

### Key Intuition:
- Nodes with degree `1` are **leaves**. Leaves can never be the root of an MHT (unless $n \le 2$) because picking a leaf as root maximizes path length to the rest of the tree.
- By trimming the leaves layer-by-layer (similar to peeling an onion using Topological Sort BFS), we move inward towards the center.
- The remaining $1$ or $2$ nodes in the final level of leaf trimming are the centroids that minimize tree height.

### Algorithm Steps:
1. Handle base cases: if `n == 0` return `{}`; if `n == 1` return `{0}`.
2. Build an adjacency list and count degrees (`indegree`) for all nodes.
3. Enqueue all leaf nodes (`indegree == 1`).
4. Process level-by-level using BFS:
   - For each level, clear `ret` and record all current leaves.
   - Pop each leaf `t`, decrement degrees of its neighbors `a`.
   - If a neighbor's degree becomes `1`, it is now a leaf of the trimmed tree $\implies$ push `a` to the queue.
5. When the loop terminates, `ret` will contain the last remaining $1$ or $2$ centroid nodes.

---

## Complexity Analysis

- **Time Complexity:** O(V + E) = O(n) — Every node and edge is processed at most once during leaf trimming.
- **Space Complexity:** O(V + E) = O(n) — For the adjacency list, degree array, and queue.

---

## Code

```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);

        if(n == 0) return {};
        if(n == 1) return {0};

        for(auto edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
            indegree[edge[0]]++;
            indegree[edge[1]]++;
        }

        queue<int> q;
        for(int i = 0; i < adj.size(); i++) {
            if(indegree[i] == 1) {
                q.push(i);
            }
        }

        vector<int> ret;
        while(!q.empty()) {
            ret.clear();

            // Level-by-level BFS with topological leaf trimming
            int size = q.size();

            for(int i = 0; i < size; i++) {
                int t = q.front(); q.pop();
                ret.push_back(t);
                for(int a : adj[t]) {
                    indegree[a]--;
                    
                    if(indegree[a] == 1)
                        q.push(a);
                }
            }
        }

        return ret;
    }
};
```
