# Number of Operations to Make Network Connected

**Link:** https://leetcode.com/problems/number-of-operations-to-make-network-connected

## Problem
Given n computers (0 to n-1) and a list of connections (cables), find the minimum number of cable moves needed to make all computers connected. If there are not enough cables, return -1.

## Solution
Count the number of connected components using Union-Find or DFS, and count the number of redundant (extra) edges. To connect k components you need k-1 operations. If the number of extra edges is less than (components-1), return -1. Otherwise return (components-1).

## Code
```cpp
class Solution {
    vector<int> parent, rnk;

    int find(int x) {
        if(parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if(px == py) return false;
        if(rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if(rnk[px] == rnk[py]) rnk[px]++;
        return true;
    }

public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        if((int)connections.size() < n-1) return -1;

        parent.resize(n);
        rnk.resize(n, 0);
        for(int i=0; i<n; i++) parent[i] = i;

        int components = n;
        for(auto& c : connections) {
            if(unite(c[0], c[1]))
                components--;
        }

        return components - 1;
    }
};
```
