# Invert Binary Tree

**Link:** https://leetcode.com/problems/invert-binary-tree/

## Problem
Given the root of a binary tree, invert the tree (mirror it), and return its root.

## Solution
Recursively swap the left and right children of every node. First invert the left subtree, invert the right subtree, then swap the two pointers at the current node. O(n) time and O(h) space.

## Code
```cpp
TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    invertTree(root->left);
    invertTree(root->right);
    swap(root->left, root->right);
    return root;
}
```
