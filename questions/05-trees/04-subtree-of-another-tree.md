# Subtree of Another Tree

**Link:** https://leetcode.com/problems/subtree-of-another-tree/

## Problem
Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values as `subRoot`, and `false` otherwise. A subtree includes a node and all its descendants.

## Solution
Hash every subtree of both trees using a polynomial rolling hash. Compute `subRoot`'s hash first, then traverse `root` checking if any subtree produces the same hash value. A match sets a flag. This avoids repeated `isSameTree` calls and runs in O(n) time.

## Code
```cpp
class Solution {
private:
    long long mod = 1000000007;
    long long subRootHash;
    bool flag = false;
public:
    long long HashTree(TreeNode* node) {
        if (!node) return 0;
        long long hash = HashTree(node->left);
        hash = ( hash*37 + (node->val+10001) )%mod;
        hash = ( hash*37 + HashTree(node->right) )%mod;
        return hash;
    }

    long long HashTreeAndCheck(TreeNode* node) {
        if (!node) return 0;
        long long hash = HashTreeAndCheck(node->left);
        hash = ( hash*37 + (node->val+10001) )%mod;
        hash = ( hash*37 + HashTreeAndCheck(node->right) )%mod;

        if (subRootHash == hash) flag = true;
        return hash;
    }

    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        subRootHash = HashTree(subRoot);
        HashTreeAndCheck(root);
        return flag;
    }
};
```
