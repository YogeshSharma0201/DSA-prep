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
                // Back-edge: v is an already visited ancestor
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

## Deep Dive: `disc` vs `low` & Why `disc[v]` for Back-Edges

### 1. What does `disc` and `low` track?

- **`disc[u]` (Discovery Time / Entry Time):**
  - The timestamp at which node `u` was first visited during DFS.
  - Acts as a fixed, unique identifier of when `u` was discovered relative to other nodes in the DFS tree.
  
- **`low[u]` (Lowest Reachable Discovery Time):**
  - The smallest `disc` reachable from `u` using:
    1. Zero or more **DFS tree edges** downwards (entering the subtree rooted at `u`), followed by
    2. At most **one back-edge** upwards to an ancestor.
  - Represents the highest/earliest ancestor in the DFS tree that the subtree of `u` can reach without using the edge from `u`'s parent.

---

### 2. Why `low[u] = min(low[u], disc[v])` and NOT `low[v]`?

When `v != parent` and `v` is already visited, `(u, v)` is a **back-edge** (an edge pointing back to an already visited ancestor in the current DFS path).

#### Reason 1: Adhering to the definition of `low` (At most ONE back-edge)
By definition, a path can travel down tree edges and use at most **one back-edge** up.
- `disc[v]` is the direct discovery time of ancestor `v` reached by the back-edge `(u, v)`.
- If we used `low[v]`, we would be assuming `u` can take edge `(u, v)` and then take *another* back-edge that `v` took, which counts as traversing **two back-edges**.

#### Reason 2: Crucial for Articulation Points (Cut Vertices)
- While in **Bridges** using `low[v]` happens not to break bridge detection because `low[v] <= disc[v] < disc[u]`, using `low[v]` is **strictly WRONG for Articulation Points**.
- In Articulation Points, the condition is `low[child] >= disc[u]`.
- If `child` has a back-edge to an ancestor `v`, and `v` has a back-edge to an even earlier ancestor `w`, using `low[v]` would artificially lower `low[child]` below `disc[u]`, causing the algorithm to **miss articulation points (false negatives)**.
- Therefore, standardizing on `low[u] = min(low[u], disc[v])` keeps the definition theoretically sound and consistent across all Tarjan variants.

---

### 3. Comparison Across Different Use Cases

| Use Case | Graph Type | Condition | Purpose of `low` & `disc` |
| :--- | :--- | :--- | :--- |
| **Bridges (Critical Connections)** | Undirected | `low[v] > disc[u]` | Edge `(u, v)` is a bridge because the subtree at `v` cannot reach `u` or any ancestor of `u` via any back-edge. |
| **Articulation Points (Cut Vertices)** | Undirected | `low[v] >= disc[u]` *(for non-root)* or root with $\ge 2$ DFS children | Node `u` is a cut vertex because the subtree at `v` has no back-edge reaching strictly above `u`. |
| **Strongly Connected Components (Tarjan's SCC)** | Directed | `low[u] == disc[u]` | Node `u` is the root of an SCC. Nodes currently on the stack with `disc >= disc[u]` form the SCC component. |

