# Binary Tree Cameras

**Link:** https://leetcode.com/problems/binary-tree-cameras/

## Problem
Given a binary tree, place the minimum number of cameras on the nodes such that every node is monitored. A camera at a node monitors its parent, itself, and its immediate children. Return the minimum number of cameras needed.

## Solution
Greedy bottom-up DFS. Each node returns one of three states: 0 = needs coverage, 1 = has a camera, 2 = already covered. Leaf nodes return 0 (need coverage). A node places a camera (returns 1, increments count) when any child returns 0. If any child has a camera the node is covered (returns 2). Handle the root separately — if root returns 0, place one more camera there.

## Code
```cpp
class Solution {
    int cameras = 0;

    int dfs(TreeNode* node) {
        if(!node) return 2; // null nodes are considered covered

        int left  = dfs(node->left);
        int right = dfs(node->right);

        if(left == 0 || right == 0) {
            cameras++;
            return 1; // place camera here
        }
        if(left == 1 || right == 1) {
            return 2; // covered by child camera
        }
        return 0; // needs coverage from parent
    }

public:
    int minCameraCover(TreeNode* root) {
        if(dfs(root) == 0) cameras++;
        return cameras;
    }
};
```
