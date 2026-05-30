# Lowest Common Ancestor of a Binary Search Tree

**Link:** https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree

## Problem
Given a BST and two nodes `p` and `q`, find their lowest common ancestor (LCA). The LCA is defined as the deepest node that has both `p` and `q` as descendants (a node is a descendant of itself).

## Solution
Exploit the BST ordering property. If both `p->val` and `q->val` are less than `root->val`, the LCA must be in the left subtree. If both are greater, recurse right. Otherwise the current node is the split point and is the LCA.

## Code
```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if(root == NULL) return NULL;

    if(root->val == p->val || root->val == q->val) {
        return root;
    }

    TreeNode* left  = lowestCommonAncestor(root->left,  p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if(right == NULL) return left;
    if(left  == NULL) return right;

    return root;
}
```
