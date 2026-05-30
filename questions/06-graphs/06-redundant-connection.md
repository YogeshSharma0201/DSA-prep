# Redundant Connection

**Link:** https://leetcode.com/problems/redundant-connection/

## Problem
Given a tree with n nodes that has one extra edge added (making it contain exactly one cycle), find and return that redundant edge. If multiple answers exist, return the one that appears last in the input.

## Solution
Use Union-Find. Process edges one by one. For each edge, check if both endpoints already belong to the same connected component (same root). If they do, this edge creates a cycle and is the redundant connection. Otherwise, union the two components and continue.

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
