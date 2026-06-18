# Path Sum

**Link:** https://leetcode.com/problems/path-sum/

## Problem
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

## Solution
DFS: subtract the current node's value from targetSum at each step. At a leaf node, return true if the remaining sum equals the leaf's value (i.e., remaining - leaf->val == 0). Return false for null nodes.

## Code
```cpp
bool hasPathSum(TreeNode* root, int targetSum) {
    if (!root) return false;
    if (!root->left && !root->right) return root->val == targetSum;
    return hasPathSum(root->left,  targetSum - root->val) ||
           hasPathSum(root->right, targetSum - root->val);
}
```
