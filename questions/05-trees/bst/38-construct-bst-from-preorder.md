# Construct Binary Search Tree from Preorder Traversal

**Link:** [LeetCode 1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

## Problem
Given an array of integers `preorder`, which represents the **preorder traversal** of a BST (i.e., `[root, left, right]`), construct the tree and return its root.

It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

A **binary search tree** is a binary tree where for every node, any descendant of `Node.left` has a value strictly less than `Node.val`, and any descendant of `Node.right` has a value strictly greater than `Node.val`.

## Solution
In a preorder traversal, the first element is the root. Subsequent elements smaller than the root belong to its left subtree, and elements larger belong to its right subtree.

Instead of searching for the split point in O(N) for each node (which gives O(N^2) worst case), we can maintain valid `min` and `max` bounds (or simply an `upper_bound`) for each subtree:
1. Maintain a global/shared index `idx` pointing to the current element in `preorder`.
2. For the current node, if `preorder[idx]` is outside `[min, max]`, return `nullptr`.
3. Otherwise, create a `new TreeNode(preorder[idx++])`.
4. Recursively build the left child with bounds `[min, root->val]`.
5. Recursively build the right child with bounds `[root->val, max]`.
6. Return `root`.

### Complexity
- **Time Complexity:** O(N) because each element in `preorder` is visited once.
- **Space Complexity:** O(H) where $H$ is the height of the BST (O(N) worst case, O(log N) average) due to the recursion call stack.

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
    int idx = 0;
public:
    TreeNode* solve(vector<int>& preorder, int min, int max) {
        if (idx == preorder.size()) return nullptr;

        if (preorder[idx] < min || preorder[idx] > max) return nullptr;

        TreeNode* root = new TreeNode(preorder[idx++]);
        root->left = solve(preorder, min, root->val);
        root->right = solve(preorder, root->val, max);

        return root;
    }

    TreeNode* bstFromPreorder(vector<int>& preorder) {
        return solve(preorder, INT_MIN >> 1, INT_MAX >> 1);
    }
};
```
