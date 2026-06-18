# Clone Graph

**Link:** https://leetcode.com/problems/clone-graph/

## Problem
Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.

## Solution
BFS or DFS with a hash map from original node to its clone. When visiting a node for the first time, create its clone and add it to the map. For each neighbor, if it hasn't been cloned yet, clone it and enqueue/recurse it. Add the cloned neighbor to the current clone's neighbor list.

## Code
```cpp
class Solution {
    unordered_map<Node*, Node*> cloned;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (cloned.count(node)) return cloned[node];
        Node* copy = new Node(node->val);
        cloned[node] = copy;
        for (Node* nb : node->neighbors)
            copy->neighbors.push_back(cloneGraph(nb));
        return copy;
    }
};
```
