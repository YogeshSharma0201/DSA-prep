# Boundary of Binary Tree

**Link:** https://leetcode.com/problems/boundary-of-binary-tree/

## Problem
Given the root of a binary tree, return the values of its boundary in anti-clockwise direction starting from the root. The boundary includes the left boundary (excluding the leftmost leaf), the leaves (left to right), and the right boundary (excluding the rightmost leaf) in reverse.

## Solution
Split into three parts: (1) left boundary — traverse left children (prefer left, else right) excluding the leaf; (2) all leaves — DFS to collect every leaf left to right; (3) right boundary — traverse right children (prefer right, else left) excluding the leaf, then reverse. Combine root + left boundary + leaves + reversed right boundary.

## Code
```cpp
class Solution {
    bool isLeaf(TreeNode* node) { return !node->left && !node->right; }

    void addLeftBoundary(TreeNode* root, vector<int>& res) {
        TreeNode* cur = root->left;
        while (cur) {
            if (!isLeaf(cur)) res.push_back(cur->val);
            cur = cur->left ? cur->left : cur->right;
        }
    }

    void addLeaves(TreeNode* root, vector<int>& res) {
        if (!root) return;
        if (isLeaf(root)) { res.push_back(root->val); return; }
        addLeaves(root->left,  res);
        addLeaves(root->right, res);
    }

    void addRightBoundary(TreeNode* root, vector<int>& res) {
        TreeNode* cur = root->right;
        vector<int> tmp;
        while (cur) {
            if (!isLeaf(cur)) tmp.push_back(cur->val);
            cur = cur->right ? cur->right : cur->left;
        }
        reverse(tmp.begin(), tmp.end());
        for (int v : tmp) res.push_back(v);
    }

public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        if (!isLeaf(root)) res.push_back(root->val);
        addLeftBoundary(root, res);
        addLeaves(root, res);
        addRightBoundary(root, res);
        return res;
    }
};
```
