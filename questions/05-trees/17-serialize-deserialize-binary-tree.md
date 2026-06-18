# Serialize and Deserialize Binary Tree

**Link:** https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

## Problem
Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure. There is no restriction on the format as long as serialize and deserialize are inverses.

## Solution
Use preorder traversal. Serialize: visit each node and append its value followed by a comma; use "null" for null nodes. Deserialize: split by comma and reconstruct using a queue of tokens — pop the front token, if "null" return nullptr, otherwise create a node and recursively build left then right.

## Code
```cpp
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "null,";
        return to_string(root->val) + "," +
               serialize(root->left) + serialize(root->right);
    }

    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) q.push(token);
        return build(q);
    }

private:
    TreeNode* build(queue<string>& q) {
        string val = q.front(); q.pop();
        if (val == "null") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left  = build(q);
        node->right = build(q);
        return node;
    }
};
```
