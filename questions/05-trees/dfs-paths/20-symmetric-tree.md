# Symmetric Tree

**Link:** https://leetcode.com/problems/symmetric-tree/

## Problem
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

## Solution
Use a helper that compares two subtrees for mirror symmetry: they are symmetric if both are null, or both non-null with equal values and their children are symmetric in mirrored order (left->left with right->right, and left->right with right->left).

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
    bool isSymmetric(TreeNode* root) {
        return isMirror(root->left, root->right);
    }

    bool isMirror(TreeNode* n1, TreeNode* n2) {
        if(n1 == nullptr && n2 == nullptr) {
            return true;
        }
        if(n1 == nullptr || n2 == nullptr) {
            return false;
        }

        return n1->val == n2->val && isMirror(n1->left, n2->right)
            && isMirror(n1->right, n2->left);
    }
};
```
