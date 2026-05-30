# Recover Binary Search Tree

**Link:** https://leetcode.com/problems/recover-binary-search-tree

## Problem
Two nodes of a BST are swapped by mistake. Given the root of the tree, recover the BST by swapping those two nodes back. The solution should use O(1) space (Morris traversal) or O(h) recursion space.

## Solution
Perform an inorder traversal, tracking the previous node visited. The first violation (`prevEle->val >= curr->val`) marks `firstEle = prevEle`. The second violation marks `secondEle = curr`. After traversal, swap the values of `firstEle` and `secondEle` to restore BST order.

## Code
```cpp
TreeNode* firstEle  = nullptr;
TreeNode* secondEle = nullptr;
TreeNode* prevEle   = nullptr;

void traverse(TreeNode* root) {
    if(root == nullptr) return;

    traverse(root->left);

    // If first element has not been found, assign it to prevElement
    if (firstEle == nullptr && prevEle != nullptr && prevEle->val >= root->val) {
        firstEle = prevEle;
    }

    // If first element is found, assign the second element to the root
    if (firstEle != nullptr && prevEle != nullptr && prevEle->val >= root->val) {
        secondEle = root;
    }
    prevEle = root;

    traverse(root->right);
}

void recoverTree(TreeNode* root) {
    traverse(root);

    int temp = firstEle->val;
    firstEle->val  = secondEle->val;
    secondEle->val = temp;
}
```
