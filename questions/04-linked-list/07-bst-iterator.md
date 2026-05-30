# Binary Search Tree Iterator

**Link:** https://leetcode.com/problems/binary-search-tree-iterator/

## Problem
Implement the `BSTIterator` class for an inorder iterator over a BST. `next()` returns the smallest number not yet returned, and `hasNext()` returns whether there is a next number. Both operations must run in average O(1) time and use O(h) memory where h is the tree height.

## Solution
Maintain a stack that always holds the leftmost chain of nodes from the current position. On construction push all left children of the root. `next()` pops the top node, returns its value, then calls `pushAll` on its right child to extend the stack down the right subtree's leftmost path — ensuring amortized O(1) per call.

## Code
```cpp
class BSTIterator {
    stack<TreeNode*> myStack;
public:
    BSTIterator(TreeNode* root) {
        pushAll(root);
    }

    /** @return whether we have a next smallest number */
    bool hasNext() {
        return !myStack.empty();
    }

    /** @return the next smallest number */
    int next() {
        TreeNode* tmpNode = myStack.top();
        myStack.pop();
        pushAll(tmpNode->right);
        return tmpNode->val;
    }

private:
    void pushAll(TreeNode* node) {
        for (; node != NULL; myStack.push(node), node = node->left);
    }
};
```
