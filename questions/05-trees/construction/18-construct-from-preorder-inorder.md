# Construct Binary Tree from Preorder/Postorder and Inorder Traversal

## 1. Preorder and Inorder Traversal

**Link:** [LeetCode 105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

### Problem
Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

### Solution
The first element of `preorder` is always the root. Find that value in `inorder` — everything to its left forms the left subtree, everything to its right forms the right subtree. Recurse with the corresponding slices of both arrays. Use a hash map for O(1) inorder index lookup.

### Code
```cpp
class Solution {
    unordered_map<int,int> idx;
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, (int)preorder.size()-1, 0, (int)inorder.size()-1);
    }

    TreeNode* build(vector<int>& pre, int ps, int pe, int is, int ie) {
        if (ps > pe) return nullptr;
        TreeNode* root = new TreeNode(pre[ps]);
        int mid = idx[pre[ps]];
        int leftSize = mid - is;
        root->left  = build(pre, ps+1, ps+leftSize, is, mid-1);
        root->right = build(pre, ps+leftSize+1, pe, mid+1, ie);
        return root;
    }
};
```

---

## 2. Inorder and Postorder Traversal

**Link:** [LeetCode 106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

### Problem
Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.

### Solution
The last element of `postorder` is always the root of the current subtree. Find that value in `inorder` — everything to its left forms the left subtree, everything to its right forms the right subtree. Recurse with the corresponding slices of both arrays. Use a hash map for O(1) inorder index lookup.

### Code
```cpp
class Solution {
    unordered_map<int,int> idx;
public:
    TreeNode* build(int is, int ie, int ps, int pe, vector<int>& inorder, vector<int>& postorder) {
        if(is>ie || ps>pe) return nullptr;

        TreeNode* root = new TreeNode(postorder[pe]);
        int iidx = idx[postorder[pe]];
        int count = ie-iidx;
        root->left = build(is, iidx-1, ps, pe-count-1, inorder, postorder);
        root->right = build(iidx+1, ie, pe-count, pe-1, inorder, postorder);

        return root;
    }

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int n = inorder.size();
        for(int i = 0; i<n; i++) {
            idx[inorder[i]] = i;
        }

        return build(0, n-1, 0, n-1, inorder, postorder);
    }
};
```
