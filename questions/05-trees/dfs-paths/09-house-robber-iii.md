# House Robber III

**Link:** https://leetcode.com/problems/house-robber-iii/

## Problem
A thief wants to rob houses arranged in a binary tree. Adjacent connected nodes cannot both be robbed. Given the root of the binary tree, return the maximum amount the thief can rob without alerting the police.

## Solution
DFS returning a pair `{skipThis, robThis}` for each node. `robThis = node->val + left.skip + right.skip` (rob this node, skip both children). `skipThis = max(left.rob, left.skip) + max(right.rob, right.skip)` (skip this node, take best of each child). Final answer is `max(res[0], res[1])` at the root.

## Code
```cpp
class Solution {
public:
    vector<int> dfs(TreeNode* root) {
        vector<int> res(2, 0);
        if(root == nullptr) return res;

        vector<int> left  = dfs(root->left);
        vector<int> right = dfs(root->right);

        res[0] = max(left[0], left[1]) + max(right[0], right[1]);
        res[1] = root->val + left[0] + right[0];

        return res;
    }

    int rob(TreeNode* root) {
        vector<int> res = dfs(root);
        return max(res[0], res[1]);
    }
};
```
