# Binary Tree Preorder Traversal

**Link:** https://leetcode.com/problems/binary-tree-preorder-traversal/

## Problem
Given the `root` of a binary tree, return the preorder traversal of its nodes' values.

## Solution
Iterative traversal using an explicit stack (LIFO). 

1. Push the `root` node onto the stack.
2. While the stack is not empty, pop the top node.
3. If the node is `nullptr`, continue.
4. Add the node's value to the result list.
5. Push the `right` child first and then the `left` child onto the stack. Because a stack is Last-In-First-Out (LIFO), pushing the right child first ensures that the left subtree is processed before the right subtree (Root -> Left -> Right order).

## Code
```cpp
vector<int> preorderTraversal(TreeNode* root) {
    stack<TreeNode*> st;
    vector<int> res;

    st.push(root);
    while(!st.empty()) {
        TreeNode* n = st.top(); st.pop();
        if(n == nullptr) continue;

        res.push_back(n->val);
        st.push(n->right); // Notice - We need to push right first due to LIFO stack
        st.push(n->left);
    }

    return res;
}
```
