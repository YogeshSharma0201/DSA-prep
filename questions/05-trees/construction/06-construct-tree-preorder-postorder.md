# Construct Binary Tree from Preorder and Postorder Traversal

**Link:** [LeetCode 889](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

## Problem
Given two integer arrays `preorder` and `postorder` representing the preorder and postorder traversals of a binary tree, construct and return the binary tree. If multiple valid trees exist, return any of them.

## Solution
The first element of `preorder` is always the root. If there are remaining elements, the next element (`preorder[prs + 1]`) is the root of the left subtree. Find this left root's index in the `postorder` traversal using a hash map. Everything up to this index in `postorder` belongs to the left subtree, and the rest belongs to the right subtree. Recurse with the calculated ranges.

## Code
```cpp
class Solution {
    unordered_map<int, int> postIdx;
public:
    TreeNode* build(int prs, int pre, int pos, int poe, vector<int>& preorder) {
        if (prs > pre || pos > poe) return nullptr;

        TreeNode* root = new TreeNode(preorder[prs]);
        if (prs == pre) return root;

        int leftRootVal = preorder[prs + 1];
        int idx = postIdx[leftRootVal];
        int count = idx - pos + 1; // Number of elements in left subtree

        root->left = build(prs + 1, prs + count, pos, idx, preorder);
        root->right = build(prs + count + 1, pre, idx + 1, poe - 1, preorder);

        return root;
    }

    TreeNode* constructFromPrePost(vector<int>& preorder, vector<int>& postorder) {
        int n = preorder.size();
        for (int i = 0; i < n; i++) {
            postIdx[postorder[i]] = i;
        }

        return build(0, n - 1, 0, n - 1, preorder);
    }
};
```
