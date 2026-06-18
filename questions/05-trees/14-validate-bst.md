# Validate Binary Search Tree

**Link:** https://leetcode.com/problems/validate-binary-search-tree/

## Problem
Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST requires that for every node, all values in its left subtree are strictly less than the node's value, and all values in its right subtree are strictly greater.

## Solution
Pass min and max bounds down the recursion. At each node, check that its value is within (min, max). For the left child, update the upper bound to the current value; for the right child, update the lower bound. Start with bounds (-INF, +INF) at the root.

## Code
```cpp
bool isValidBST(TreeNode* root, long long lo = LLONG_MIN, long long hi = LLONG_MAX) {
    if (!root) return true;
    if (root->val <= lo || root->val >= hi) return false;
    return isValidBST(root->left, lo, root->val) &&
           isValidBST(root->right, root->val, hi);
}
```
