# Evaluate Division

**Link:** https://leetcode.com/problems/evaluate-division/

## Problem
You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Each `Ai` or `Bi` is a string that represents a single variable.

You are also given some `queries`, where `queries[j] = [Cj, Dj]` represents the `j-th` query where you must find the value of `Cj / Dj`.

Return the answers to all queries. If a single answer cannot be determined, return `-1.0`.

## Solution
We can model the variables and equations as a directed, weighted graph:
- Each variable is a node in the graph.
- For each equation `A / B = val`, we create a directed edge from `A` to `B` with weight `val`, and a directed edge from `B` to `A` with weight `1 / val`.
- To answer a query `C / D`, we find a path from `C` to `D` using Depth-First Search (DFS). The product of the edge weights along the path gives the value of `C / D`.
- If either variable is not present in the graph, or if there is no path between them, the result is `-1.0`.

## Code
```cpp
class Solution {
public:
    // This is similar to union find
    // Finding the parent
    // Assign 1 to parent and then calculate values of the child nodes
    double dfs(string src, string dest, unordered_map<string,vector<pair<string,double>>>& adj, set<string>& visited) {
        if(adj.find(src) == adj.end() || adj.find(dest) == adj.end())
        return -1.0;
        if(src == dest) {
            return 1.0;
        }
        visited.insert(src);
        for(auto& neigh: adj[src]) {
            if(!visited.count(neigh.first)) {
                double val = dfs(neigh.first,dest,adj,visited);
                if(val != -1.0)
                return neigh.second * val;
            }
        }
        return -1.0;
    }
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string,vector<pair<string,double>>> adj;
        int n = equations.size();
        for(int i = 0; i < n; i++) {
            adj[equations[i][0]].push_back({equations[i][1],values[i]});
            adj[equations[i][1]].push_back({equations[i][0],1/values[i]});
        }
        set<string> visited;
        vector<double> res;
        for(auto& query : queries) {
            double x = dfs(query[0],query[1],adj,visited);
            visited.clear();
            res.push_back(x);
        }
        return res;
    }
};
```
