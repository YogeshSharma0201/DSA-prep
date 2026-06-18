# Symmetric Tree

**Link:** https://leetcode.com/problems/symmetric-tree/

## Problem
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

## Solution
Use a helper that compares two subtrees for mirror symmetry: they are symmetric if both are null, or both non-null with equal values and their children are symmetric in mirrored order (left->left with right->right, and left->right with right->left).

## Code
```cpp
bool isMirror(TreeNode* l, TreeNode* r) {
    if (!l && !r) return true;
    if (!l || !r) return false;
    return l->val == r->val &&
           isMirror(l->left,  r->right) &&
           isMirror(l->right, r->left);
}

bool isSymmetric(TreeNode* root) {
    return isMirror(root, root);
}
```
