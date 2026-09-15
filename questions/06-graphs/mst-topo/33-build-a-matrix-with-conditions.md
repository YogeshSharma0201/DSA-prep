# Build a Matrix With Conditions

**Link:** [LeetCode 2392 - Build a Matrix With Conditions](https://leetcode.com/problems/build-a-matrix-with-conditions/)

## Problem Description

You are given a positive integer $k$. You are also given:
- `rowConditions`: a 2D integer array where `rowConditions[i] = [above_i, below_i]` means number `above_i` must appear in a row **above** number `below_i`.
- `colConditions`: a 2D integer array where `colConditions[i] = [left_i, right_i]` means number `left_i` must appear in a column to the **left** of number `right_i`.

All numbers are integers from $1$ to $k$.

Build a $k \times k$ matrix containing all numbers from $1$ to $k$ exactly once, and $0$ in all remaining cells, satisfying all row and column conditions. Return any valid matrix, or an empty 2D array `{}` if no solution exists.

---

## Intuition & Approach

1. **Independent 1D Projections:**
   Notice that row constraints and column constraints are **completely independent**.
   - `above -> below` defines a directed constraint for the **row index**.
   - `left -> right` defines a directed constraint for the **column index**.

2. **Topological Ordering via Kahn's Algorithm:**
   - We run Topological Sort (Kahn's BFS with in-degrees) on `rowConditions` to determine the row position (0 to $k-1$) of each number from $1$ to $k$.
   - We run Topological Sort separately on `colConditions` to determine the column position (0 to $k-1$) of each number from $1$ to $k$.

3. **Cycle Detection:**
   If either graph contains a directed cycle (i.e. `order.size() != k`), it is impossible to satisfy the constraints, so return `{}`.

4. **Matrix Construction:**
   Initialize a $k \times k$ matrix with $0$s. For each number $x \in [1, k]$, place $x$ at `mat[rowOrder[x]][colOrder[x]]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(k^2 + R + C)$
  - Building adjacency lists and running Topological Sort takes $\mathcal{O}(k + R)$ for rows and $\mathcal{O}(k + C)$ for columns, where $R = \text{rowConditions.size()}$ and $C = \text{colConditions.size()}$.
  - Initializing and filling the $k \times k$ matrix takes $\mathcal{O}(k^2)$ time.
- **Space Complexity:** $\mathcal{O}(k^2 + R + C)$
  - $\mathcal{O}(k + R + C)$ for the graph representation, in-degrees, queue, and topological order maps.
  - $\mathcal{O}(k^2)$ for the output matrix.

---

## Code (C++)

```cpp
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

class Solution {
public:
    // Helper function to return topological order mapping for numbers [0, k-1]
    unordered_map<int, int> topoSortOrder(int k, vector<vector<int>>& conditions) {
        vector<vector<int>> adj(k);
        vector<int> indegree(k, 0);

        for (int i = 0; i < conditions.size(); i++) {
            adj[conditions[i][0] - 1].push_back(conditions[i][1] - 1);
            indegree[conditions[i][1] - 1]++;
        }
        
        queue<int> q;
        for (int i = 0; i < k; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        int l = 0;
        unordered_map<int, int> order;
        while (!q.empty()) {
            int n = q.front();
            q.pop();
            order[n] = l++;

            for (auto a : adj[n]) {
                indegree[a]--;
                if (!indegree[a]) {
                    q.push(a);
                }
            }
        }

        return order;
    }

    vector<vector<int>> buildMatrix(int k, vector<vector<int>>& rowConditions, vector<vector<int>>& colConditions) {
        auto rowTopo = topoSortOrder(k, rowConditions);
        if (rowTopo.size() != k) return {}; // Cycle detected in row conditions

        auto colTopo = topoSortOrder(k, colConditions);
        if (colTopo.size() != k) return {}; // Cycle detected in column conditions

        vector<vector<int>> mat(k, vector<int>(k, 0));

        // Place each number (1-indexed) at its corresponding (row, col) position
        for (int i = 0; i < k; i++) {
            mat[rowTopo[i]][colTopo[i]] = i + 1;
        }

        return mat;
    }
};
```
