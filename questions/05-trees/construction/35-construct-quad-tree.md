# Construct Quad Tree

**Link:** https://leetcode.com/problems/construct-quad-tree/

## Problem
Given a `n * n` matrix `grid` of `0's` and `1's` only. We want to represent `grid` with a Quad-Tree. Return the root of the Quad-Tree representing `grid`.

A Quad-Tree is a tree data structure in which each internal node has exactly four children: `topLeft`, `topRight`, `bottomLeft`, and `bottomRight`.

Quad-Tree nodes have two properties:
- `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's.
- `isLeaf`: True if the node is a leaf node on the tree or False if the node has the four children.

We can construct a Quad-Tree from a two-dimensional area using the following steps:
1. If the current grid has the same value (i.e all `1's` or all `0's`) set `isLeaf` True and set `val` to the value of the grid and select the other four children to NULL and stop.
2. If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids.
3. Recurse for each of the children with the proper sub-grid.

## Solution
To optimize finding whether a sub-grid consists entirely of `0`s or `1`s, we can use a 2D Prefix Sum (Prefix Grid Sum).
1. **Precompute 2D Prefix Sum:**
   Create a `preSum` matrix of size `(n+1) * (n+1)`. `preSum[i][j]` stores the sum of all elements in the subgrid from `(0, 0)` to `(i-1, j-1)`.
   Using prefix sums, the sum of a subgrid bounded by top-left `(x1, y1)` and bottom-right `(x2, y2)` (1-indexed based on the prefix sum matrix) can be calculated in O(1) time:
   $$\text{sum} = \text{preSum}[x2][y2] - \text{preSum}[x2][y1-1] - \text{preSum}[x1-1][y2] + \text{preSum}[x1-1][y1-1]$$
2. **Recursive Construction:**
   - Define `constructTree(x, y, s)` where `(x, y)` is the 1-indexed top-left corner of the subgrid in the `preSum` matrix, and `s` is the size of the subgrid.
   - Calculate the sum of the current subgrid `csum` using the prefix sum formula.
   - If `csum == s * s`, it means the subgrid contains all `1`s. Create and return a leaf node `Node(true, true)`.
   - If `csum == 0`, it means the subgrid contains all `0`s. Create and return a leaf node `Node(false, true)`.
   - Otherwise, create an internal node `Node(true, false)` and recursively construct its four children by splitting the subgrid of size `s` into four subgrids of size `s/2`.

## Code
```cpp
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;
    
    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
public:
    int gridSum(int x1, int y1, int x2, int y2, vector<vector<int>>& grid) {
        return grid[x2][y2] - grid[x2][y1-1] - grid[x1-1][y2] + grid[x1-1][y1-1];
    }

    Node* constructTree(int x, int y, int s, vector<vector<int>>& grid) {
        Node* node;

        int csum = gridSum(x, y, x+s-1, y+s-1, grid);

        if(csum == s*s) {
            node = new Node(true, true);
        }
        else if(csum == 0) {
            node = new Node(false, true);
        }
        else {
            node = new Node(true, false, 
                    constructTree(x, y, s/2, grid),
                    constructTree(x, y+s/2, s/2, grid),
                    constructTree(x+s/2, y, s/2, grid),
                    constructTree(x+s/2, y+s/2, s/2, grid)
                    );
        }

        return node;
    }

    Node* construct(vector<vector<int>>& grid) {
        int n = grid.size();

        vector<vector<int>> preSum(n+1, vector<int>(n+1, 0));

        for(int i=1; i<=n; i++) {
            for(int j=1; j<=n; j++) {
                preSum[i][j] = grid[i-1][j-1];
                preSum[i][j] += preSum[i-1][j] + preSum[i][j-1] - preSum[i-1][j-1];
            }
        }

        return constructTree(1, 1, n, preSum);
    }
};
```
