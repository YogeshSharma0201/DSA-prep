# Left View of Binary Tree

**Link:** https://www.geeksforgeeks.org/print-left-view-binary-tree/

## Problem
Given a binary tree, print the left view of it. The left view of a tree is the set of nodes visible when the tree is viewed from the left side — i.e., the first node at each level.

## Solution
BFS level order traversal: for each level, the first node (index 0) in the level is visible from the left side. Collect those values.

## Code
```cpp
vector<int> leftView(TreeNode* root) {
    vector<int> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            TreeNode* node = q.front(); q.pop();
            if (i == 0) res.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return res;
}
```
