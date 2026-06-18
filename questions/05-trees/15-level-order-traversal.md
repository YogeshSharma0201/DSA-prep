# Binary Tree Level Order Traversal

**Link:** https://leetcode.com/problems/binary-tree-level-order-traversal/

## Problem
Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level) as a list of lists.

## Solution
BFS using a queue. At the start of each iteration, record the current queue size — that is the number of nodes at the current level. Process exactly that many nodes, collecting their values, then enqueue their children. Repeat until the queue is empty.

## Code
```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}
```
