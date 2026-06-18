# Convert Binary Tree to Doubly Linked List

**Link:** https://www.geeksforgeeks.org/convert-given-binary-tree-doubly-linked-list-set-3/

## Problem
Given a binary tree, convert it to a doubly linked list in-place. The left pointer of each node should point to the previous node and the right pointer should point to the next node. The order of nodes in the DLL must be the same as the inorder traversal of the binary tree.

## Solution
Do an inorder traversal while threading the DLL. Keep a `prev` pointer. At each node: set prev->right = node and node->left = prev, then update prev = node. The leftmost node is the head of the DLL.

## Code
```cpp
Node* bToDLL(Node* root) {
    Node* head = nullptr;
    Node* prev = nullptr;

    function<void(Node*)> inorder = [&](Node* node) {
        if (!node) return;
        inorder(node->left);

        if (!prev) {
            head = node;
        } else {
            prev->right = node;
            node->left  = prev;
        }
        prev = node;

        inorder(node->right);
    };

    inorder(root);
    return head;
}
```
