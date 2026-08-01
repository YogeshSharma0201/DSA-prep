# Binary Search Tree Iterator

**Link:** https://leetcode.com/problems/binary-search-tree-iterator/

## Problem
Implement the `BSTIterator` class for an inorder iterator over a BST. `next()` returns the smallest number not yet returned, and `hasNext()` returns whether there is a next number. Both operations must run in average O(1) time and use O(h) memory where h is the tree height.

## Approach 1: Controlled Recursion using a Stack (Standard)

### Concept
Maintain a stack that always holds the leftmost chain of nodes from the current position. On construction, push all left children of the root. `next()` pops the top node, returns its value, then extends the stack down the right subtree's leftmost path — ensuring amortized \(O(1)\) time per call.

### Code
```cpp
class BSTIterator {
    stack<TreeNode*> myStack;
public:
    BSTIterator(TreeNode* root) {
        pushAll(root);
    }

    /** @return whether we have a next smallest number */
    bool hasNext() {
        return !myStack.empty();
    }

    /** @return the next smallest number */
    int next() {
        TreeNode* tmpNode = myStack.top();
        myStack.pop();
        pushAll(tmpNode->right);
        return tmpNode->val;
    }

private:
    void pushAll(TreeNode* node) {
        for (; node != NULL; myStack.push(node), node = node->left);
    }
};
```

### Complexity
- **Time Complexity:** 
  - `next()`: Amortized \(O(1)\) time (each node is pushed and popped exactly once).
  - `hasNext()`: \(O(1)\) time.
- **Space Complexity:** \(O(h)\) auxiliary memory, where \(h\) is the tree height, to store the stack.

---

## Approach 2: In-place Linked List Flattening (Alternative)

### Concept
Instead of maintaining a stack, we can flatten the BST into a sorted Singly Linked List in-place during the constructor call. We do an in-order traversal and re-wire the `left` pointer to `nullptr` and the `right` pointer to serve as the `next` pointer of the linked list.
This allows worst-case \(O(1)\) operations for both `next()` and `hasNext()` at the expense of an \(O(N)\) initialization step.

### Code
```cpp
class BSTIterator {
    TreeNode* curr;
    TreeNode* prev = nullptr;
    TreeNode* head = nullptr;

public:
    BSTIterator(TreeNode* root) {
        flatten(root);
        curr = head;
    }

    int next() {
        int val = curr->val;
        curr = curr->right;
        return val;
    }

    bool hasNext() {
        return curr != nullptr;
    }

private:
    void flatten(TreeNode* root) {
        if (!root) return;
        
        flatten(root->left);
        
        if (prev == nullptr) {
            head = root;
        } else {
            prev->right = root;
        }
        root->left = nullptr;
        prev = root;
        
        flatten(root->right);
    }
};
```

### Complexity
- **Time Complexity:** 
  - **Constructor:** \(O(N)\) to traverse and flatten the tree.
  - `next()` / `hasNext()`: Guaranteed **\(O(1)\)** worst-case time.
- **Space Complexity:** \(O(h)\) auxiliary memory for the recursion call stack during flattening.

