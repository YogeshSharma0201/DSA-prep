# Construct Binary Tree from Preorder and Inorder Traversal

**Link:** https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

## Problem
Given two integer arrays preorder and inorder where preorder is the preorder traversal and inorder is the inorder traversal of the same tree, construct and return the binary tree.

## Solution
The first element of preorder is always the root. Find that value in inorder — everything to its left forms the left subtree, everything to its right forms the right subtree. Recurse with the corresponding slices of both arrays. Use a hash map for O(1) inorder index lookup.

## Code
```cpp
class Solution {
    unordered_map<int,int> idx;
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, (int)preorder.size()-1, 0, (int)inorder.size()-1);
    }

    TreeNode* build(vector<int>& pre, int ps, int pe, int is, int ie) {
        if (ps > pe) return nullptr;
        TreeNode* root = new TreeNode(pre[ps]);
        int mid = idx[pre[ps]];
        int leftSize = mid - is;
        root->left  = build(pre, ps+1, ps+leftSize, is, mid-1);
        root->right = build(pre, ps+leftSize+1, pe, mid+1, ie);
        return root;
    }
};
```
