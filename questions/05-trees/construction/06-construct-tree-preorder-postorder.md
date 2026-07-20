# Construct Binary Tree from Preorder and Postorder Traversal

**Link:** https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal

## Problem
Given two integer arrays `preorder` and `postorder` representing the preorder and postorder traversals of a binary tree, construct and return the binary tree. If multiple valid trees exist, return any of them.

## Solution
Use a shared preorder index that advances as nodes are created. The first element of `preorder` is always the current root. Find where `preorder[index]` (left subtree root) appears in the `postorder` window to split left and right subtree bounds. Recurse on left half then right half using those bounds in postorder.

## Code
```cpp
class Solution {
public:
    TreeNode* constructFromPrePost(vector<int>& pre, vector<int>& post) {
        int index = 0;
        return construct(pre, post, index, 0, pre.size() - 1);
    }

private:
    TreeNode* construct(vector<int>& pre, vector<int>& post, int& index, int l, int h) {
        if (index >= pre.size() || l > h)
            return nullptr;

        TreeNode* root = new TreeNode(pre[index++]);
        if (l == h) return root;

        int i = l;
        while (i <= h && post[i] != pre[index]) i++;

        if (i <= h) {
            root->left  = construct(pre, post, index, l, i);
            root->right = construct(pre, post, index, i + 1, h - 1);
        }

        return root;
    }
};
```
