# Path Sum III

**Link:** https://leetcode.com/problems/path-sum-iii/

## Problem
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of node values equals targetSum. Paths must go downward (parent to child) but do not need to start at the root or end at a leaf.

## Solution
DFS with prefix sum and a hashmap. Maintain a running sum from the root. At each node, if (runningSum - targetSum) exists in the map, those prefix-sum paths form valid paths ending here. Add the count, then insert runningSum into the map, recurse on both children, and decrement the map entry on the way back up (backtracking). Initialize map[0] = 1 for paths starting at root.

## Code
```cpp
int dfs(TreeNode* root, unordered_map<long long, int>& mp, long long sum, int targetSum) {
    if(root == nullptr) return 0;

    sum += root->val;

    int ret = 0;
    if(mp.find(sum-targetSum) != mp.end() && mp[sum-targetSum] > 0) {
        ret += mp[sum-targetSum];
    }
    mp[sum]++;

    ret += dfs(root->left, mp, sum, targetSum);
    ret += dfs(root->right, mp, sum, targetSum);

    mp[sum]--;
    return ret;
}

int pathSum(TreeNode* root, int targetSum) {
    unordered_map<long long, int> mp;
    mp[0] = 1;

    return dfs(root, mp, 0, targetSum);
}
```
