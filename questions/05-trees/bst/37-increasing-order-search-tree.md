# Increasing Order Search Tree

**Link:** https://leetcode.com/problems/increasing-order-search-tree/

## Problem
Given the `root` of a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.

## Solution
Perform an in-order traversal to process nodes in ascending order:
- Keep a pointer `prev` initialized to `nullptr` to track the previously processed node.
- Recursively process the left subtree. The new root of the entire modified tree will be the leftmost node (i.e. the result returned from the left subtree call, or `root` itself if there is no left child).
- Link the previous node's right pointer to the current node (`if (prev) prev->right = root`).
- Update `prev` to `root`.
- Clear the current node's left child (`root->left = nullptr`).
- Recursively process the right subtree and attach it.
- Return the head of the new skewed tree.

## Code
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
    TreeNode* prev;
public:
    TreeNode* increasingBST(TreeNode* root) {
        if(root==nullptr) return root;

        TreeNode *left = root->left ? increasingBST(root->left) : root;
        if(prev) prev->right = root;
        prev = root;
        root->left = nullptr;
        root->right = increasingBST(root->right);

        return left;
    }
};
```
