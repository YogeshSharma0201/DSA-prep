# Root to Leaf Paths

**Link:** https://www.geeksforgeeks.org/given-a-binary-tree-print-all-root-to-leaf-paths/

## Problem
Given a binary tree, print all root-to-leaf paths. Each path is represented as the sequence of node values from root to leaf.

## Solution
DFS with backtracking: maintain a current path vector. Add the current node's value, and if it's a leaf record the path. Otherwise recurse on both children. Pop the value after returning from both recursive calls.

## Code
```cpp
void dfs(TreeNode* root, vector<int>& path, vector<vector<int>>& res) {
    if (!root) return;
    path.push_back(root->val);
    if (!root->left && !root->right) {
        res.push_back(path);
    } else {
        dfs(root->left,  path, res);
        dfs(root->right, path, res);
    }
    path.pop_back();
}

vector<vector<int>> rootToLeafPaths(TreeNode* root) {
    vector<vector<int>> res;
    vector<int> path;
    dfs(root, path, res);
    return res;
}
```
