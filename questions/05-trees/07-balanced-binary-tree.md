# Balanced Binary Tree

**Link:** https://leetcode.com/problems/balanced-binary-tree

## Problem
Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is one where every node's left and right subtrees differ in height by at most 1.

## Solution
DFS that passes the height of each subtree by reference. At a null node set height to the current level and return true. A node is balanced only if both subtrees are balanced and `|leftHeight - rightHeight| <= 1`. Propagate the maximum height upward to the parent.

## Code
```cpp
bool dfs(TreeNode* root, int lvl, int& height) {
    if(root == nullptr) {
        height = lvl;
        return true;
    }

    int lh, rh;

    bool left  = dfs(root->left,  lvl+1, lh);
    bool right = dfs(root->right, lvl+1, rh);
    height = max(lh, rh);

    return left && right && abs(lh - rh) <= 1;
}

bool isBalanced(TreeNode* root) {
    int height = 0;
    return dfs(root, 0, height);
}
```
