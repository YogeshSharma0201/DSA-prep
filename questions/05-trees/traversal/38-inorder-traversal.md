# Binary Tree Inorder Traversal

**Link:** https://leetcode.com/problems/binary-tree-inorder-traversal/

## Problem
Given the `root` of a binary tree, return the inorder traversal of its nodes' values.

## Solution
Iterative traversal using an explicit stack (LIFO).

1. Initialize `curr` to `root` and an empty stack `st`.
2. Push all left children of `curr` onto `st` until `curr` becomes `nullptr`.
3. Pop the top node from `st` (this is the leftmost unprocessed node / root of current subtree), and append its value to the result list.
4. Set `curr = curr->right` to traverse the right subtree.
5. Repeat steps 2-4 until `curr == nullptr` and `st.empty()`.

## Code
```cpp
vector<int> inorderTraversal(TreeNode* root) {
    vector<int> res;
    stack<TreeNode*> st;
    TreeNode* curr = root;

    while (curr != nullptr || !st.empty()) {
        // Reach the leftmost node of the current subtree
        while (curr != nullptr) {
            st.push(curr);
            curr = curr->left;
        }

        // Current must be NULL at this point; pop the top node
        curr = st.top();
        st.pop();
        res.push_back(curr->val);

        // Move to the right subtree
        curr = curr->right;
    }

    return res;
}
```
