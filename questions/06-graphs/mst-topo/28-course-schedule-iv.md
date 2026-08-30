# Course Schedule IV

**Link:** [Course Schedule IV - LeetCode](https://leetcode.com/problems/course-schedule-iv/description/)

## Problem

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `a_i` before course `b_i`.

Prerequisites can also be **indirect**. For example, if course `a` is a prerequisite of course `b`, and course `b` is a prerequisite of course `c`, then course `a` is a prerequisite of course `c`.

You are also given an array `queries` where `queries[j] = [u_j, v_j]`. For the $j$-th query, return `true` if course `u_j` is a prerequisite of course `v_j`, and `false` otherwise.

---

---

## Initial Approach (Topological Level Order Indexing — Flawed)

### Idea
Perform Kahn's algorithm (Topological Sort BFS) and assign a level/depth index `orderMap[p] = g` to each course node as it gets processed. Then for each query `[u, v]`, check if `orderMap[u] < orderMap[v]`.

### Code
```cpp
class Solution {
public:
    vector<bool> checkIfPrerequisite(int n, vector<vector<int>>& pre, vector<vector<int>>& queries) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);

        for(int i = 0; i < pre.size(); i++) {
            adj[pre[i][0]].push_back(pre[i][1]);
            indegree[pre[i][1]]++;
        }

        unordered_map<int, int> orderMap;
        queue<pair<int, int>> q;

        for(int i = 0; i < n; i++) {
            if(indegree[i] == 0)
                q.push({0, i});
        }

        while(!q.empty()) {
            auto [g, p] = q.front(); q.pop();
            orderMap[p] = g;

            for(int a : adj[p]) {
                indegree[a]--;
                if(!indegree[a])
                    q.push({g + 1, a});
            }
        }

        vector<bool> ret;
        for(int i = 0; i < queries.size(); i++) {
            ret.push_back(orderMap[queries[i][0]] < orderMap[queries[i][1]]);
        }

        return ret;
    }
};
```

### Why It Fails
Comparing topological level indices (`orderMap[u] < orderMap[v]`) is **incorrect** because topological ordering only provides a total ordering consistent with a partial order. 

1. `orderMap[u] < orderMap[v]` is a **necessary** condition for reachability, but **NOT a sufficient** condition.
2. Two nodes `u` and `v` in completely disconnected components or parallel branches may have `orderMap[u] < orderMap[v]` even when no path exists between them.

**Counterexample:**
- Prerequisites: `0 -> 1` and `2 -> 3` (two disconnected branches).
- Level assignments: `orderMap[0] = 0`, `orderMap[2] = 0`, `orderMap[1] = 1`, `orderMap[3] = 1`.
- Query `[0, 3]`: `orderMap[0] < orderMap[3]` yields `0 < 1` $\rightarrow$ `true`, but `0` is **not** a prerequisite of `3`.

---

## Solution Approaches

### Approach 1: Floyd-Warshall (Transitive Closure) — Optimal & Cleanest for $n \le 100$

Since $n \le 100$, an $n \times n$ boolean matrix can record transitive reachability using the Floyd-Warshall algorithm in O(n^3) time ($10^6$ operations).

```cpp
class Solution {
public:
    vector<bool> checkIfPrerequisite(int n, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        vector<vector<bool>> isPre(n, vector<bool>(n, false));

        for (auto& p : prerequisites) {
            isPre[p[0]][p[1]] = true;
        }

        // Transitive closure (Floyd-Warshall)
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (isPre[i][k] && isPre[k][j]) {
                        isPre[i][j] = true;
                    }
                }
            }
        }

        vector<bool> ans;
        for (auto& q : queries) {
            ans.push_back(isPre[q[0]][q[1]]);
        }
        return ans;
    }
};
```

---

### Approach 2: Topological Sort + Set / Bitset Propagation (Kahn's Algorithm)

Propagate the set of prerequisites along the DAG during Kahn's Topological Sort algorithm.

```cpp
class Solution {
public:
    vector<bool> checkIfPrerequisite(int n, vector<vector<int>>& pre, vector<vector<int>>& queries) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);
        vector<unordered_set<int>> isPre(n);

        for (auto& p : pre) {
            adj[p[0]].push_back(p[1]);
            indegree[p[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) q.push(i);
        }

        while (!q.empty()) {
            int curr = q.front(); q.pop();

            for (int neighbor : adj[curr]) {
                // Add direct prerequisite
                isPre[neighbor].insert(curr);
                // Add all indirect prerequisites of curr
                for (int p : isPre[curr]) {
                    isPre[neighbor].insert(p);
                }

                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        vector<bool> ret;
        for (auto& qry : queries) {
            ret.push_back(isPre[qry[1]].count(qry[0]));
        }

        return ret;
    }
};
```

---

## Complexity Analysis

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| **Approach 1 (Floyd-Warshall)** | O(n^3 + Q) | O(n^2) |
| **Approach 2 (Kahn's + Set Propagation)** | O(V^2 + E + Q) | O(V^2) |
