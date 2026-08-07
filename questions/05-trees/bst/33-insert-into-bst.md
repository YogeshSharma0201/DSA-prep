# Insert into a Binary Search Tree

**Link:** https://leetcode.com/problems/insert-into-a-binary-search-tree

## Problem
You are given the `root` node of a binary search tree (BST) and a `val` to insert into the tree. Return the `root` node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

## Solution
Use recursion to find the correct insertion spot:
- If the current node is null, we have found the leaf position where the new value should be inserted. Create and return a `new TreeNode(val)`.
- If `val` is less than the current node's value, recurse on the left subtree: `root->left = insertIntoBST(root->left, val)`.
- If `val` is greater than the current node's value, recurse on the right subtree: `root->right = insertIntoBST(root->right, val)`.
- Return the current `root`.

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
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if(root==nullptr) {
            return new TreeNode(val);
        }

        if(val < root->val) root->left = insertIntoBST(root->left, val);
        if(val > root->val) root->right = insertIntoBST(root->right, val);

        return root;
    }
};
```
