# Binary Tree Postorder Traversal

**Link:** https://leetcode.com/problems/binary-tree-postorder-traversal/

## Problem
Given the `root` of a binary tree, return the postorder traversal of its nodes' values.

## Solution
Iterative traversal using Modified Preorder (Root $\to$ Right $\to$ Left) followed by reversing the result list:

1. A standard Preorder traversal visits **Root $\to$ Left $\to$ Right**.
2. If we push the `left` child first and then the `right` child onto the stack, the `right` child is popped first, producing the order **Root $\to$ Right $\to$ Left**.
3. Reversing this resulting sequence gives **Left $\to$ Right $\to$ Root**, which is the exact Postorder traversal!

## Code
```cpp
vector<int> postorderTraversal(TreeNode* root) {
    vector<int> res;
    if (!root) return res;

    stack<TreeNode*> st;
    st.push(root);

    while (!st.empty()) {
        TreeNode* node = st.top();
        st.pop();
        res.push_back(node->val);

        // Push left first so that right is popped and processed first
        if (node->left)  st.push(node->left);
        if (node->right) st.push(node->right);
    }

    reverse(res.begin(), res.end());
    return res;
}
```
