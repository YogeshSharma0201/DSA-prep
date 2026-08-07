# Delete Node in a BST

**Link:** https://leetcode.com/problems/delete-node-in-a-bst/

## Problem
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two steps:
1. Search for a node to remove.
2. If the node is found, delete the node.

## Solution
Use a recursive approach to find and delete the node:
1. **Search Phase:**
   - If the root is null, return null.
   - If the key is less than the current node's value, search in the left subtree: `root->left = deleteNode(root->left, key)`.
   - If the key is greater than the current node's value, search in the right subtree: `root->right = deleteNode(root->right, key)`.
2. **Deletion Phase (when key equals root's value):**
   - **Case 1: No children (leaf node).** Return null.
   - **Case 2: One child.** Return the non-null child (`root->left ? root->left : root->right`).
   - **Case 3: Two children.** Find the node with the maximum value in the left subtree (the predecessor) by traversing right from the left child. Replace the current node's value with the predecessor's value, then recursively delete the predecessor's value from the left subtree: `root->left = deleteNode(root->left, temp->val)`.

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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if(root) 
            if(key < root->val) root->left = deleteNode(root->left, key); 
            else if(key > root->val) root->right = deleteNode(root->right, key);       
            else{
                if(!root->left && !root->right) return NULL;
                if (!root->left || !root->right)
                    return root->left ? root->left : root->right;  

                TreeNode* temp = root->left; 
                while(temp->right != NULL) temp = temp->right;   
                root->val = temp->val;             
                root->left = deleteNode(root->left, temp->val);
            }
        return root;
    }
};
```
