# Recover Binary Search Tree

**Link:** https://leetcode.com/problems/recover-binary-search-tree/

## Problem
You are given the `root` of a binary search tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. *Recover the tree without changing its structure.*

## Solution
An in-order traversal of a BST visits nodes in strictly ascending order. When two elements are swapped:
1. The **first swapped node** (`firstEle`) is the `prev` node at the first occurrence where `prev->val >= curr->val`.
2. The **second swapped node** (`secondEle`) is the `curr` node at the last occurrence where `prev->val >= curr->val` (which could be adjacent to the first violation or further down the traversal).

After the in-order traversal finishes, we swap the values of `firstEle` and `secondEle`.

### Complexity
- **Time Complexity:** O(N) where $N$ is the number of nodes in the tree.
- **Space Complexity:** O(H) for recursion stack where $H$ is the height of the tree (O(N) worst-case, O(log N) for balanced BST).

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
    TreeNode* prev = nullptr;
    TreeNode* firstEle = nullptr;
    TreeNode* secondEle = nullptr;

public:
    void inorder(TreeNode* root) {
        if (root == nullptr) return;

        inorder(root->left);

        if (prev != nullptr && prev->val >= root->val) {
            if (firstEle == nullptr) {
                firstEle = prev;
            } 
            secondEle = root;
        }

        prev = root;

        inorder(root->right);
    }

    void recoverTree(TreeNode* root) {
        inorder(root);
        if (firstEle != nullptr) {
            swap(firstEle->val, secondEle->val);
        }
    }
};
```
