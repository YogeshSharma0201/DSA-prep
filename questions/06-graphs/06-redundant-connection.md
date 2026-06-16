# Redundant Connection

**Link:** https://leetcode.com/problems/redundant-connection/

## Problem
Given a tree with n nodes that has one extra edge added (making it contain exactly one cycle), find and return that redundant edge. If multiple answers exist, return the one that appears last in the input.

## Solution
Use Union-Find. Process edges one by one. For each edge, check if both endpoints already belong to the same connected component (same root). If they do, this edge creates a cycle and is the redundant connection. Otherwise, union the two components and continue.

## Union-Find internals

Union-Find (also called Disjoint Set Union) tracks which elements belong to the same group and supports two core operations: **union** (merge two groups) and **find** (which group does this element belong to?). Two optimizations bring both operations down to nearly O(1).

**Union by rank** — when merging two trees, which one becomes the root matters. Attaching the shorter tree under the taller one keeps height bounded at O(log n). `rank` is an upper bound on height; it only increments when two equal-rank trees merge, which is the only case where height actually grows.

```
Initial:  rank 0    rank 0       After union:  rank 1
              1         2                          1
                                                  |
                                                  2       ← shorter tree attached under taller
```

```
Equal rank:   rank 1    rank 1   After union:  rank 2
                 1          3                     1
                 |                               / \
                 2                              2   3     ← rank increments only here
```

**Path compression** — every `find(x)` traverses from x up to the root. On the way back out of the recursion, every visited node is pointed directly at the root. This costs nothing extra (you're already walking that path) but flattens future lookups to O(1).

```
Before find(4):              After find(4):
        1                           1
        |                         / | \
        2                        2  3  4    ← all nodes now point straight to root
        |
        3
        |
        4
```

**Together**: path compression flattens the tree aggressively; union by rank prevents it from getting tall in the first place. The combined amortized cost is **O(α(n))** per operation — the inverse Ackermann function, which is ≤ 4 for any n you'll encounter in practice. Effectively constant time.

**When to reach for this**: connected components, Kruskal's MST, detecting cycles in undirected graphs, problems asking "are these two things in the same group?"

## Code
```cpp
class Solution {
    vector<int> parent, rank_;

    int find(int x) {
        if(parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if(px == py) return false;
        if(rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if(rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }

public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n+1);
        rank_.resize(n+1, 0);
        for(int i=0; i<=n; i++) parent[i] = i;

        for(auto& edge : edges) {
            if(!unite(edge[0], edge[1]))
                return edge;
        }
        return {};
    }
};
```
