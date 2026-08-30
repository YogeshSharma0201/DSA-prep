# Balance a Binary Search Tree

**Link:** [Balance a Binary Search Tree - LeetCode](https://leetcode.com/problems/balance-a-binary-search-tree/)

## Problem

Given the `root` of a binary search tree, return a **balanced** binary search tree with the same node values. If there is more than one valid answer, return **any of them**.

A binary search tree is **balanced** if the depth of the two subtrees of every node never differs by more than `1`.

---

## Solution (Inorder Traversal + Divide & Conquer BST Construction)

### Intuition:
1. An **in-order traversal** of any Binary Search Tree visits nodes in sorted order.
2. Once we extract the sorted sequence of node values into an array, we can construct a height-balanced BST using a **divide-and-conquer** approach:
   - Pick the middle element (`mid = l + (r - l) / 2`) as the root of the current subtree.
   - Recursively build the left subtree using elements from index `l` to `mid - 1`.
   - Recursively build the right subtree using elements from index `mid + 1` to `r`.
3. Because the array is split evenly at each step, the resulting BST is guaranteed to be height-balanced ($\text{depth} \le \lceil \log_2 N \rceil$).

---

## Complexity Analysis

- **Time Complexity:** O(N) — O(N) for the in-order traversal to collect elements + O(N) to build the new balanced BST.
- **Space Complexity:** O(N) — O(N) space to store the sorted array of values + O(log N) recursion stack depth.

---

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
    void inorder(TreeNode* root, vector<int>& arr) {
        if(root == nullptr) return;

        inorder(root->left, arr);
        arr.push_back(root->val);
        inorder(root->right, arr);
    }

    TreeNode* buildTree(int l, int r, vector<int>& arr) {
        if(l > r) return nullptr;

        int mid = l + (r - l) / 2;

        TreeNode* newN = new TreeNode(arr[mid]);
        newN->left = buildTree(l, mid - 1, arr);
        newN->right = buildTree(mid + 1, r, arr);

        return newN;
    }

    TreeNode* balanceBST(TreeNode* root) {
        vector<int> arr;

        inorder(root, arr);

        return buildTree(0, arr.size() - 1, arr);
    }
};
```
