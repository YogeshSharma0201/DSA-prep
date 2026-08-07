# Validate Binary Search Tree

**Link:** https://leetcode.com/problems/validate-binary-search-tree/

## Problem
Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST requires that for every node, all values in its left subtree are strictly less than the node's value, and all values in its right subtree are strictly greater.

## Solutions

### Approach 1: Min/Max Bounds Recursion
Pass min and max bounds down the recursion. At each node, check that its value is within (min, max). For the left child, update the upper bound to the current value; for the right child, update the lower bound. Start with bounds (-INF, +INF) at the root.

#### Code
```cpp
bool isValidBST(TreeNode* root, long long lo = LLONG_MIN, long long hi = LLONG_MAX) {
    if (!root) return true;
    if (root->val <= lo || root->val >= hi) return false;
    return isValidBST(root->left, lo, root->val) &&
           isValidBST(root->right, root->val, hi);
}
```

### Approach 2: In-order Traversal (Tracking Previous Value)
An in-order traversal of a valid BST must produce values in strictly increasing order. We can perform an in-order traversal and keep track of the previously visited node's value (`prev`). If at any point the current node's value is less than or equal to `prev`, the tree is not a valid BST.

#### Code
```cpp
class Solution {
    long long prev = LLONG_MIN;
public:
    bool isValidBST(TreeNode* root) {
        if(root==nullptr) return true;

        if(!isValidBST(root->left)) return false;
        if(root->val <= prev) return false;
        prev = root->val;
        if(!isValidBST(root->right)) return false;

        return true;
    }
};
```
