# Binary Tree Maximum Path Sum

**Link:** https://leetcode.com/problems/binary-tree-maximum-path-sum

## Problem
Given the root of a binary tree, return the maximum path sum of any non-empty path. A path is a sequence of nodes where each pair is connected by an edge, and no node appears more than once. The path does not need to pass through the root.

## Solution
DFS where each call returns the best single-branch gain going through a node (clamped to 0 to discard negative branches). At each node, update a global maximum by considering the path that passes through the node using both left and right branches. Return the best single-branch contribution to the parent.

## Code
```cpp
int maxPath(TreeNode* root, int& path) {
    if(root == nullptr) return INT_MIN>>1;

    int maxleftPath = 0, maxrightPath = 0;

    int res = INT_MIN>>1;
    res = max(res, maxPath(root->left,  maxleftPath));
    res = max(res, maxPath(root->right, maxrightPath));

    path = root->val + max(0, max(maxleftPath, maxrightPath));

    return max(res, root->val + max(0, maxleftPath) + max(0, maxrightPath));
}

int maxPathSum(TreeNode* root) {
    int pathSum = 0;
    return maxPath(root, pathSum);
}
```
