# Lowest Common Ancestor of a Binary Tree

**Link:** https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

## Problem
Given a binary tree (not necessarily a BST) and two nodes `p` and `q`, find their lowest common ancestor. The LCA is the deepest node that has both `p` and `q` as descendants, where a node counts as a descendant of itself.

## Solution
Perform a post-order DFS. Return the current node immediately if it matches `p` or `q`. Recurse into both subtrees — if both return non-null, the current node is the LCA. Otherwise propagate whichever side returned a non-null result upward to the parent.

## Code
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root == nullptr) return nullptr;
        if(root == p || root == q) return root;

        TreeNode* left  = lowestCommonAncestor(root->left,  p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        if(left && right) return root;
        return left ? left : right;
    }
};
```
