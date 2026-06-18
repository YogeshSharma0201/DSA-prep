# Binary Tree Zigzag Level Order Traversal

**Link:** https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/

## Problem
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

## Solution
BFS level order traversal. Use a flag `leftToRight` to track direction. For each level, build the level vector normally, then if it's a right-to-left level, reverse it before appending to the result.

## Code
```cpp
vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    bool leftToRight = true;
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level(sz);
        for (int i = 0; i < sz; i++) {
            TreeNode* node = q.front(); q.pop();
            int idx = leftToRight ? i : sz - 1 - i;
            level[idx] = node->val;
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
        leftToRight = !leftToRight;
    }
    return res;
}
```
