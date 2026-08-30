# Inorder Successor in BST

**Link:** [Inorder Successor in BST - GeeksforGeeks](https://www.geeksforgeeks.org/problems/inorder-successor-in-bst/1)

## Problem

Given a Binary Search Tree (BST) and a node `k` in it, find the **inorder successor** of that node in the BST.

The **inorder successor** of a node is the node with the smallest key strictly greater than `k->data`. If no such node exists, return `-1` (or `nullptr`).

---

## Solution Approaches

### Approach 1: Recursive BST Traversal (User Solution)

Using BST properties recursively:
1. If `root->data <= k->data`: The successor cannot be `root` or any node in `root`'s left subtree. Thus, search in the **right subtree**: `inOrderSuccessor(root->right, k)`.
2. If `root->data > k->data`: `root` is a candidate successor. However, a smaller valid candidate might exist in the **left subtree**.
   - Recurse into `root->left`: `target = inOrderSuccessor(root->left, k)`.
   - If a valid `target != -1` is found, return `target`.
   - Otherwise, `root->data` is the smallest value greater than `k->data`, so return `root->data`.

#### Complexity Analysis
- **Time Complexity:** O(h) where $h$ is the height of the BST (O(log N) for balanced BST, O(N) for skewed BST).
- **Space Complexity:** O(h) recursion stack space.

#### Code
```cpp
class Solution {
  public:
    int inOrderSuccessor(Node *root, Node *k) {
        if(root == nullptr)
            return -1;
            
        if(root->data <= k->data)
            return inOrderSuccessor(root->right, k);
        else {
            int target = inOrderSuccessor(root->left, k);
            if(target != -1 && target < root->data)
                return target;
            return root->data;
        }
    }
};
```

---

### Approach 2: Iterative BST Search (O(1) Auxiliary Space)

Keep track of the candidate `successor` node as we traverse down the tree:
- If `root->data > k->data`: `root` could be the successor. Update `successor = root` and move left (`root = root->left`) to see if a smaller valid value exists.
- If `root->data <= k->data`: Move right (`root = root->right`).

#### Complexity Analysis
- **Time Complexity:** O(h) time.
- **Space Complexity:** O(1) auxiliary space.

#### Code
```cpp
class Solution {
  public:
    Node* inOrderSuccessor(Node *root, Node *k) {
        Node* successor = nullptr;
        while (root != nullptr) {
            if (root->data > k->data) {
                successor = root;
                root = root->left;
            } else {
                root = root->right;
            }
        }
        return successor;
    }
};
```
