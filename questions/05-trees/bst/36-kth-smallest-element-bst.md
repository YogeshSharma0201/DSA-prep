# Kth Smallest Element in a BST

**Link:** https://leetcode.com/problems/kth-smallest-element-in-a-bst/

## Problem
Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.

## Solution
An in-order traversal of a BST visits the nodes in strictly increasing (sorted) order.
We can perform an in-order traversal (DFS) and keep a global counter `idx` (starting at 1) to track the count of visited nodes.
- Recursively visit the left subtree. If the result is found (i.e. not `-1`), return it immediately.
- Visit the current node. If `idx == k`, the current node's value is the `k`th smallest element. Return `root->val`. Otherwise, increment `idx`.
- Recursively visit the right subtree. If the result is found, return it; otherwise return `-1`.

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
    int idx = 1;
public:
    int kthSmallest(TreeNode* root, int k) {
        if(root==nullptr) return -1;

        int ans = kthSmallest(root->left, k);
        if(ans!=-1) return ans;

        if(idx == k) return root->val;
        idx++;

        ans = kthSmallest(root->right, k);

        if(ans!=-1) return ans;
        else return -1;
    }
};
```
