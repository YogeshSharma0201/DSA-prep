# Course Schedule

**Link:** https://leetcode.com/problems/course-schedule/

## Problem
There are numCourses courses labeled 0 to numCourses-1. Given a list of prerequisite pairs [a, b] meaning you must take course b before course a, determine if it is possible to finish all courses (i.e., no cycle in the dependency graph).

## Solution
Build a directed graph and detect cycles using DFS with coloring: white (0) = unvisited, gray (1) = in current DFS path, black (2) = fully processed. If we reach a gray node during DFS, a cycle exists and we cannot finish all courses.

## Code
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<int> color;

    bool hasCycle(int u) {
        color[u] = 1;
        for (int v : adj[u]) {
            if (color[v] == 1) return true;
            if (color[v] == 0 && hasCycle(v)) return true;
        }
        color[u] = 2;
        return false;
    }

public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        adj.resize(numCourses);
        color.assign(numCourses, 0);
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        for (int i = 0; i < numCourses; i++)
            if (color[i] == 0 && hasCycle(i)) return false;
        return true;
    }
};
```
