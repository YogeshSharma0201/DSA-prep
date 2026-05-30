# Course Schedule II

**Link:** https://leetcode.com/problems/course-schedule-ii/

## Problem
Given numCourses and a list of prerequisite pairs [a, b] meaning you must take course b before course a, return an ordering of courses to finish all courses. If it is impossible (due to a cycle), return an empty array.

## Solution
Build an adjacency list and compute in-degrees for all nodes. Use Kahn's algorithm (BFS topological sort): enqueue all nodes with in-degree 0, process them one by one decrementing neighbors' in-degrees and enqueuing those that reach 0. If the result contains all numCourses nodes, return it; otherwise a cycle exists.

## Code
```cpp
vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses, vector<int>());
    vector<int> indeg(numCourses, 0);

    for(int i=0; i<prerequisites.size(); i++) {
        adj[prerequisites[i][1]].push_back(prerequisites[i][0]);
        indeg[prerequisites[i][0]]++;
    }

    queue<int> q;
    vector<int> res;
    vector<bool> isVisited(numCourses, false);
    for(int i=0; i<numCourses; i++) {
        if(indeg[i] == 0) {
            q.push(i);
        }
    }

    while(!q.empty()) {
        int tem = q.front();
        q.pop();
        res.push_back(tem);

        for(int i=0; i<adj[tem].size(); i++) {
            indeg[adj[tem][i]]--;
            if(indeg[adj[tem][i]] == 0) q.push(adj[tem][i]);
        }
    }

    return res.size() == numCourses ? res : vector<int>();
}
```
