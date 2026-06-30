# Restore the Array from Adjacent Pairs

**Link:** https://leetcode.com/problems/restore-the-array-from-adjacent-pairs

## Problem
There is an integer array of unique elements that has been hidden from you. You are given a 2D array `adjacentPairs` where each pair represents two adjacent elements in the original array. Reconstruct and return the original array.

## Solution
Build an adjacency map where each number maps to its neighbors. Endpoint elements appear in only one pair (they have exactly one neighbor). Find one endpoint to start, then traverse the chain: at each step move to the neighbor that is not the previous element. This reconstructs the unique ordering.

## Code
```cpp
vector<int> restoreArray(vector<vector<int>>& adj) {
    unordered_map<int,vector<int>> map;
    int n = adj.size();
    for(int i=0; i<n; i++) {
        map[adj[i][0]].push_back(adj[i][1]);
        map[adj[i][1]].push_back(adj[i][0]);
    }

    vector<int> res(n+1, 0);
    for(auto [num, adj]: map) {
        if(adj.size() == 1) {
            res[0] = num;
            break;
        }
    }

    res[1] = map[res[0]][0];
    for(int i=1; i<n; i++) {
        int prev = res[i];
        if(map[prev][0] == res[i-1]) res[i+1] = map[prev][1];
        else res[i+1] = map[prev][0];
    }

    return res;
}
```
