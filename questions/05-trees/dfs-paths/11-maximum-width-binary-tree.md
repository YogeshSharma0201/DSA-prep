# Maximum Width of Binary Tree

**Link:** https://leetcode.com/problems/maximum-width-of-binary-tree/

## Problem
Given the root of a binary tree, return the maximum width of the tree. Width of a level is defined as the length between the leftmost and rightmost non-null nodes, including all null nodes in between. The answer is guaranteed to fit in a 32-bit integer.

## Solution
BFS level by level, assigning each node a positional index (left child = 2*i, right child = 2*i+1). At each level, width = lastIndex - firstIndex + 1. Normalize indices at each level start by subtracting the first index to prevent integer overflow, or use mod 1e9+7 for very wide trees.

## Code
```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if(!root) return 0;

        int maxWidth = 0;
        queue<pair<TreeNode*, long long>> q;
        q.push({root, 0});

        while(!q.empty()) {
            int sz = q.size();
            long long first = q.front().second;
            long long last  = q.back().second;
            maxWidth = max(maxWidth, (int)(last - first + 1));

            for(int i = 0; i < sz; i++) {
                auto [node, idx] = q.front(); q.pop();
                long long pos = idx - first; // normalize to prevent overflow
                if(node->left)  q.push({node->left,  2*pos});
                if(node->right) q.push({node->right, 2*pos+1});
            }
        }

        return maxWidth;
    }
};
```
