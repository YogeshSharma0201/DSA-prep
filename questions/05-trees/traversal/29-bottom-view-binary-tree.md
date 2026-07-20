# Bottom View of Binary Tree

**Link:** https://www.geeksforgeeks.org/bottom-view-binary-tree/

## Problem
Given a binary tree, print the bottom view from left to right. A node is included in the bottom view if it is the bottommost node at its horizontal distance from the root. If two nodes are at the same horizontal distance and same depth, prefer the rightmost one.

## Solution
BFS level order traversal using a queue of (node, horizontal distance) pairs. Use a map from horizontal distance to node value. For each node, update the map (later BFS levels overwrite earlier ones, so the bottommost node wins). After BFS, output map values in order of horizontal distance.

## Code
```cpp
vector<int> bottomView(TreeNode* root) {
    map<int, int> hdMap;
    queue<pair<TreeNode*, int>> q;
    if (root) q.push({root, 0});
    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        hdMap[hd] = node->val;
        if (node->left)  q.push({node->left,  hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    vector<int> res;
    for (auto& [hd, val] : hdMap) res.push_back(val);
    return res;
}
```
