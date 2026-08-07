# Diameter of Binary Tree

**Link:** https://leetcode.com/problems/diameter-of-binary-tree/

## Problem
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

## Solution
Use a post-order traversal (DFS) where each node returns its height to its parent. The height of a null node is 0. For any node, the longest path passing through it is the sum of the heights of its left and right subtrees. Maintain a global/reference variable to track the maximum diameter found so far, updating it at each node with `leftHeight + rightHeight`. The height returned to the parent is `1 + max(leftHeight, rightHeight)`.

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
public:
    int solve(TreeNode* root, int& h) {
        if(root==nullptr) {
            h = 0;
            return 0;
        }

        int lefth = 0, righth = 0, maxdia = 0;
        maxdia = max(maxdia, solve(root->left, lefth));
        maxdia = max(maxdia, solve(root->right, righth));

        h = 1+max(lefth, righth);

        return max(maxdia, lefth+righth);
    }

    int diameterOfBinaryTree(TreeNode* root) {
        int h = 0;
        return solve(root, h);
    }
};
```
