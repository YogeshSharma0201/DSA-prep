# Number of Ways to Reconstruct a Tree

**Link:** https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree/

## Problem
You are given an array `pairs` where `pairs[i] = [xi, yi]` denotes that there exists an ancestor-descendant relationship between `xi` and `yi`. Reconstruct the tree such that:
1. Every node in the pairs exists in the tree.
2. If `xi` is an ancestor of `yi`, then `[xi, yi]` must be in `pairs`.
3. If `xi` is a descendant of `yi`, then `[xi, yi]` must be in `pairs`.
4. If there exists a pair `[xi, yi]` in `pairs`, then either `xi` is an ancestor of `yi` or `yi` is an ancestor of `xi`.

Return:
- `0` if no tree can be reconstructed.
- `1` if exactly one tree can be reconstructed.
- `2` if multiple trees can be reconstructed.

## Solution
1. **Graph Construction**: Since ancestor-descendant relations are symmetric in the input, represent the relations using an adjacency list `adj` and a 2D boolean array `connected` to keep track of connectivity between any two nodes.
2. **Sort by Degree**: Sort the nodes in ascending order of their degree. In any valid tree:
   - A descendant's degree must be less than or equal to its ancestor's degree.
   - For any node `u`, its parent must be the first node `v` appearing after `u` in the sorted order (since it has a larger or equal degree) that is connected to `u`.
3. **Parent Validation**:
   - If no parent is found for `u`, then `u` must be the root of the tree, and its degree must be \(N - 1\). If it is not, return `0`.
   - If a parent is found, check if every neighbor of `u` is also connected to `parent`. If there is any neighbor of `u` not connected to `parent`, then the tree structure is invalid, so return `0`.
   - If the degree of `u` is equal to the degree of `parent`, they are symmetric and can be swapped. This implies there are multiple valid ways to reconstruct the tree (set `result` to `2`).

This approach runs in \(O(N^2 + E)\) time complexity where \(N\) is the number of unique nodes (up to 500) and \(E\) is the number of pairs.

## Code
```cpp
class Solution {
public:
    int checkWays(vector<vector<int>>& pairs) {
        vector<int> adj[501];
        bool connected[501][501] = {false};
        vector<int> nodes;
        for (const auto& p : pairs) {
            int x = p[0], y = p[1];
            adj[x].push_back(y);
            adj[y].push_back(x);
            connected[x][y] = true;
            connected[y][x] = true;
        }
        for (int i = 1; i <= 500; ++i) {
            if (!adj[i].empty()) {
                nodes.push_back(i);
                connected[i][i] = true;
            }
        }
        sort(nodes.begin(), nodes.end(), [&](int a, int b) {
            return adj[a].size() < adj[b].size();
        });
        int n = nodes.size();
        int result = 1;
        for (int i = 0; i < n; ++i) {
            int u = nodes[i];
            int parent = -1;
            for (int j = i + 1; j < n; ++j) {
                int v = nodes[j];
                if (connected[u][v]) {
                    parent = v;
                    break;
                }
            }
            if (parent == -1) {
                if (adj[u].size() != n - 1) return 0;
            } else {
                for (int neighbor : adj[u]) {
                    if (!connected[parent][neighbor]) return 0;
                }
                if (adj[u].size() == adj[parent].size()) {
                    result = 2;
                }
            }
        }
        return result;
    }
};
```
