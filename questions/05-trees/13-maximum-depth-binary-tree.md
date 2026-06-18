# Maximum Depth of Binary Tree

**Link:** https://leetcode.com/problems/maximum-depth-of-binary-tree/

## Problem
Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root node down to the farthest leaf node.

## Solution
Use DFS recursively: the depth of a node is 1 + max(depth(left), depth(right)). Base case: null node returns 0. This visits every node once giving O(n) time and O(h) space for the call stack where h is the tree height.

## Code
```cpp
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
```
