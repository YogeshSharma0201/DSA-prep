# Top View of Binary Tree

**Link:** https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1

## Problem
Given below is a binary tree. The task is to print the top view of binary tree. Top view of a binary tree is the set of nodes visible when the tree is viewed from the top. Return nodes from the leftmost node to the rightmost node.

## Solution
Perform a BFS level-order traversal using a queue of `(Node*, int horizontal_distance)` pairs starting with the root at horizontal distance `0`. Maintain an ordered `map<int, int>` from horizontal distance to node value. During BFS, insert the node's value into the map only if the horizontal distance has not been recorded yet (`mp.find(level) == mp.end()`), preserving the topmost node for each vertical column. Finally, iterate through the map to extract the values from left to right.

## Code
```cpp
class Solution {
public:
    vector<int> topView(Node *root) {
        vector<int> ans;
        if(root == NULL) return ans;
        map<int, int> mp; // level position, node val

        queue<pair<Node*, int>> Q; // Node, Level
        Q.push({root, 0});

        while(!Q.empty()){
            auto it = Q.front();
            Q.pop();
            Node* node = it.first;
            int level = it.second;

            if(mp.find(level) == mp.end()) mp[level] = node->data;
            if(node->left != NULL) Q.push({node->left, level - 1});
            if(node->right != NULL) Q.push({node->right, level + 1});
        }

        for(auto x : mp){
            ans.push_back(x.second);
        }
        return ans;
    }
};
```
