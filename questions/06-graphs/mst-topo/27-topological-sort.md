# Topological Sort & Cycle Detection

**Link:** [Topological Sorting - GeeksforGeeks](https://www.geeksforgeeks.org/topological-sorting/)

## Problem Description

Given a Directed Graph with $V$ vertices and $E$ edges:
- If the graph is a **Directed Acyclic Graph (DAG)**, return a **topological ordering** of its vertices — a linear ordering such that for every directed edge $u \to v$, vertex $u$ comes before $v$.
- If the graph contains a **cycle**, topological sorting is **impossible**, so return an empty array `{}`.

---

## Solution 1: DFS-based (3-State Array / Recursion Stack)

### Core Concept & Cycle Detection
Standard DFS with a simple boolean `visited` array **cannot detect cycles** (it will treat back-edges as already visited and silently return an invalid order).

To detect cycles, we use a **3-state array** (`0 = Unvisited`, `1 = Visiting`, `2 = Visited`):
- `0 (Unvisited)`: Node has not been visited yet.
- `1 (Visiting)`: Node is currently in the active recursion call stack.
- `2 (Visited)`: Node and all its descendants have been fully processed.

If during DFS from node $u$, we encounter a neighbor $v$ with `state[v] == 1`, we have found a **back-edge** to a node currently in our recursion stack $\to$ **a cycle exists!**

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(V + E)$
- **Space Complexity:** $\mathcal{O}(V)$ for the recursion stack, `state` array, and output stack.

### Code (C++)

```cpp
#include <vector>
#include <stack>
using namespace std;

// Returns true if a cycle is detected
bool dfs(int u, vector<vector<int>>& adj, vector<int>& state, stack<int>& st) {
    state[u] = 1; // Mark as Visiting (in active recursion stack)

    for (int v : adj[u]) {
        if (state[v] == 1) {
            return true; // Found back-edge -> Cycle detected!
        }
        if (state[v] == 0) {
            if (dfs(v, adj, state, st)) {
                return true;
            }
        }
    }

    state[u] = 2; // Mark as Visited (fully processed)
    st.push(u);
    return false;
}

vector<int> topoSortDFS(int V, vector<vector<int>>& adj) {
    vector<int> state(V, 0); // 0 = Unvisited, 1 = Visiting, 2 = Visited
    stack<int> st;

    for (int i = 0; i < V; i++) {
        if (state[i] == 0) {
            if (dfs(i, adj, state, st)) {
                return {}; // Cycle detected -> Topological sort impossible
            }
        }
    }

    vector<int> order;
    while (!st.empty()) {
        order.push_back(st.top());
        st.pop();
    }
    return order;
}
```

---

## Solution 2: BFS-based (Kahn's Algorithm)

### Core Concept & Cycle Detection
Kahn's algorithm explicitly tracks the **in-degree** of every node:
1. Calculate in-degrees for all vertices.
2. Enqueue all vertices with `inDegree == 0`.
3. Process nodes: pop $u$, add $u$ to output, and for each neighbor $v$, decrement `inDegree[v]`.
4. Enqueue $v$ when `inDegree[v] == 0`.

### How Kahn's Detects Cycles:
Nodes involved in a cycle will **never reach `inDegree == 0`**, so they will never enter the queue or be added to the output array.
- If `order.size() == V` $\to$ Valid DAG, return `order`.
- If `order.size() < V` $\to$ **Cycle detected!** Return `{}`.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(V + E)$
- **Space Complexity:** $\mathcal{O}(V)$ for the queue and `inDegree` array.

### Code (C++)

```cpp
#include <vector>
#include <queue>
using namespace std;

vector<int> topoSortKahn(int V, vector<vector<int>>& adj) {
    vector<int> inDegree(V, 0);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) {
            inDegree[v]++;
        }
    }

    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }

    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }

    // Cycle check: If processed count < V, a cycle exists
    if (order.size() != V) {
        return {}; // Cycle detected -> Topological sort impossible
    }

    return order;
}
```

---

## Example Trace: Graph with Cycle ($0 \to 1 \to 2 \to 0$)

Consider $V = 3$ with edges $0 \to 1$, $1 \to 2$, $2 \to 0$.

### DFS Behavior:
1. `dfs(0)`: `state[0] = 1 (Visiting)`. Neighbor = `1`.
2. `dfs(1)`: `state[1] = 1 (Visiting)`. Neighbor = `2`.
3. `dfs(2)`: `state[2] = 1 (Visiting)`. Neighbor = `0`.
4. Neighbor `0` has `state[0] == 1` $\to$ **Back-edge detected!** Returns `true`.
5. Function terminates early and returns `{}`.

### Kahn's BFS Behavior:
1. `inDegree[0] = 1`, `inDegree[1] = 1`, `inDegree[2] = 1`.
2. No nodes have `inDegree == 0`. Queue starts **empty**.
3. Loop finishes immediately with `order.size() = 0`.
4. `order.size() (0) != V (3)` $\to$ **Cycle detected!** Returns `{}`.

---

## Algorithm Comparison

| Feature | DFS Post-Order | Kahn's Algorithm (BFS) |
| :--- | :--- | :--- |
| **Mechanism** | Reverse recursion finish order (stack) | In-degree counter + Queue |
| **Cycle Detection** | 3-State array (`0=Unvisited, 1=Visiting, 2=Visited`) | Output size check (`order.size() != V`) |
| **Traversal** | Depth-First | Breadth-First |
| **Time Complexity** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V + E)$ |
| **Space Complexity** | $\mathcal{O}(V)$ | $\mathcal{O}(V)$ |


