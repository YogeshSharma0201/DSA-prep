# All Nodes Distance K in Binary Tree

**Link:** https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree

## Problem
Given the root of a binary tree, a target node, and an integer `k`, return a list of all node values that are exactly distance `k` from the target node. Distance is measured in edges. The answer may be returned in any order.

## Solution
Convert the tree into an undirected graph by recording parent pointers for every node via a DFS/BFS pass. Then run a standard BFS starting from the target node, tracking visited nodes. After exactly `k` levels of BFS, collect all nodes at the current frontier — these are the answer.

## Code
```cpp
class Solution {
    unordered_map<TreeNode*, TreeNode*> parent;

    void findParents(TreeNode* node, TreeNode* par) {
        if(!node) return;
        parent[node] = par;
        findParents(node->left,  node);
        findParents(node->right, node);
    }

public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        findParents(root, nullptr);

        unordered_set<TreeNode*> visited;
        queue<TreeNode*> q;
        q.push(target);
        visited.insert(target);

        int dist = 0;
        while(!q.empty()) {
            if(dist == k) break;
            int sz = q.size();
            while(sz--) {
                TreeNode* node = q.front(); q.pop();
                for(TreeNode* nbr : {node->left, node->right, parent[node]}) {
                    if(nbr && !visited.count(nbr)) {
                        visited.insert(nbr);
                        q.push(nbr);
                    }
                }
            }
            dist++;
        }

        vector<int> result;
        while(!q.empty()) {
            result.push_back(q.front()->val);
            q.pop();
        }
        return result;
    }
};
```
