# Diagonal Traversal of Binary Tree

**Link:** https://www.geeksforgeeks.org/diagonal-traversal-of-binary-tree/

## Problem
Given a binary tree, print all diagonal elements in a binary tree belonging to the same line. Moving down a right child does not increase the diagonal index, but moving down a left child increases it by 1.

## Solution
Use a map from diagonal index to list of values. DFS: start at diagonal 0 for root. At each node, add its value to the current diagonal. Recurse right with the same diagonal index and recurse left with diagonal+1. Then print diagonals in order of their index.

## Code
```cpp
void diagonalDFS(TreeNode* root, int d, map<int, vector<int>>& diag) {
    if (!root) return;
    diag[d].push_back(root->val);
    diagonalDFS(root->left,  d + 1, diag);
    diagonalDFS(root->right, d,     diag);
}

vector<vector<int>> diagonalTraversal(TreeNode* root) {
    map<int, vector<int>> diag;
    diagonalDFS(root, 0, diag);
    vector<vector<int>> res;
    for (auto& [d, vals] : diag) res.push_back(vals);
    return res;
}
```
