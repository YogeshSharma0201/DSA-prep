# Flatten Binary Tree to Linked List

**Link:** https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

## Problem
Given the root of a binary tree, flatten the tree into a "linked list" in-place using the right pointers in preorder traversal order. The left pointer of every node should be null.

## Solution
Use Morris-style in-place flattening: for each node, if it has a left child, find the rightmost node of the left subtree and connect it to node->right. Then move node->right to node->left and clear node->left. Advance to node->right. This achieves O(n) time with O(1) extra space.

## Code
```cpp
void flatten(TreeNode* root) {
    TreeNode* cur = root;
    while (cur) {
        if (cur->left) {
            TreeNode* prev = cur->left;
            while (prev->right) prev = prev->right;
            prev->right = cur->right;
            cur->right  = cur->left;
            cur->left   = nullptr;
        }
        cur = cur->right;
    }
}
```
