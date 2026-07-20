# Possible Bipartition

**Link:** https://leetcode.com/problems/possible-bipartition/

## Problem
Given n people and a list of dislikes pairs, determine if it is possible to split everyone into two groups such that no two people in the same group dislike each other. This is equivalent to asking if the dislike graph is bipartite.

## Solution
Build an undirected adjacency list from the dislikes pairs. Then perform DFS graph coloring with two colors (1 and -1). If two adjacent nodes end up with the same color, return false. Process all unvisited nodes to handle disconnected components.

## Code
```cpp
bool dfs(int node, int c, vector<vector<int>>& adj, vector<int>& color) {
    if(color[node] != 0 && color[node] != c) return false;
    if(color[node] == c) return true;

    color[node] = c;
    for(int i=0; i<adj[node].size(); i++) {
        if(!dfs(adj[node][i], -c, adj, color)) return false;
    }
    return true;
}

bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
    vector<vector<int>> adj(n, vector<int>());

    for(int i=0; i<dislikes.size(); i++) {
        adj[dislikes[i][0]-1].push_back(dislikes[i][1]-1);
        adj[dislikes[i][1]-1].push_back(dislikes[i][0]-1);
    }

    vector<int> color(n, 0);

    for(int i=0; i<n; i++) {
        if(color[i] == 0) {
            if(!dfs(i, 1, adj, color)) return false;
        }
    }

    return true;
}
```
