# Vertical Order Traversal of a Binary Tree

**Link:** https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/

## Problem
Given the `root` of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position `(row, col)`, its left child will be at `(row + 1, col - 1)` and its right child will be at `(row + 1, col + 1)`. The root of the tree is at `(0, 0)`.

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return the vertical order traversal of the binary tree.

## Solution
1. Traverse the binary tree using DFS (or BFS), passing the current `row` and column `col` coordinates (root is at `(0, 0)`).
2. Store nodes in an ordered `map<int, vector<pair<int, int>>>` where the key is `col` (so columns are naturally ordered from left to right) and the value is a list of `{row, val}` pairs.
3. For each column, sort the nodes primarily by `row` (top to bottom) and secondarily by `val` (ascending order) when rows are identical.
4. Extract the node values for each column and return the 2D result vector.

## Code
```cpp
bool compare(pair<int,int>& a, pair<int,int>& b) {
    if(a.first == b.first) return a.second < b.second;
    return a.first < b.first;
}

class Solution {
public:
    void dfs(TreeNode* root, int r, int c, map<int, vector<pair<int,int>>>& s) {
        if(root == nullptr) return;

        if(s.find(c) == s.end()) {
            s[c] = *(new vector<pair<int,int>>());
        }

        s[c].push_back({r, root->val});

        dfs(root->left, r + 1, c - 1, s);
        dfs(root->right, r + 1, c + 1, s);
    }

    vector<vector<int>> verticalTraversal(TreeNode* root) {
        map<int, vector<pair<int,int>>> s;

        dfs(root, 0, 0, s);

        vector<vector<int>> ret;
        for(auto it: s) {
            vector<int> vt;
            sort(it.second.begin(), it.second.end(), compare);
            for(int i = 0; i < it.second.size(); i++) {
                vt.push_back(it.second[i].second);
            }
            ret.push_back(vt);
        }

        return ret;
    }
};
```
