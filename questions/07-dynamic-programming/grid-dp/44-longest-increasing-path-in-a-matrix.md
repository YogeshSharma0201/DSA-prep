# Longest Increasing Path in a Matrix

**Link:** [Longest Increasing Path in a Matrix - LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix)

## Problem Description

Given an $m \times n$ integers `matrix`, return the length of the **longest increasing path** in `matrix`.

From each cell, you can move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary. You also cannot revisit cells (strictly increasing requirement naturally prevents cycles).

---

## Solution 1: Min-Heap / Priority Queue Approach (User's Approach)

### Approach
Because the path must be **strictly increasing**, the matrix can be viewed as a Directed Acyclic Graph (DAG) where directed edges go from smaller values to strictly larger neighboring values.

Processing cells in **increasing order of their matrix values** ensures that when we process a cell with value $V$, all smaller adjacent cells $< V$ have already been processed and finalized.

1. Push all matrix cells `( -matrix[i][j], {i, j} )` into a **Min-Heap (Priority Queue)** so the smallest elements are processed first.
2. Initialize a `dp[i][j]` matrix with 0s.
3. Pop cells one by one from the Priority Queue:
   - For each neighbor `(x, y)` of the popped cell `(ele.i, ele.j)` where `matrix[x][y] > matrix[ele.i][ele.j]`:
     $$\text{dp}[x][y] = \max(\text{dp}[x][y], \; \text{dp}[ele.i][ele.j] + 1)$$
4. Track and return the maximum value in `dp` plus 1.

### Code
```cpp
class Solution {
public:
    int dx[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        priority_queue<pair<int,pair<int,int>>> queue; // Max-heap storing (-val, {i, j})
        vector<vector<int>> dp(matrix.size(), vector<int>(matrix[0].size(), 0));

        for(int i=0; i<matrix.size(); i++) {
            for(int j=0; j<matrix[0].size(); j++) {
                queue.push({-matrix[i][j], {i, j}});
            }
        }

        int maxn = 0;
        while(!queue.empty()) {
            pair<int,pair<int,int>> ele = queue.top();
            queue.pop();
            
            int dist = dp[ele.second.first][ele.second.second] + 1;
            for(int i=0; i<4; i++) {
                int x = ele.second.first + dx[i][0];
                int y = ele.second.second + dx[i][1];

                if(x >= 0 && y >= 0 && x < matrix.size() && y < matrix[0].size() && matrix[x][y] > -ele.first) {
                    dp[x][y] = max(dp[x][y], dist);
                }
            }

            maxn = max(maxn, dp[ele.second.first][ele.second.second]);
        }

        return maxn + 1;
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(m \cdot n \log(m \cdot n))$ — Pushing and popping $m \times n$ elements into a priority queue takes logarithmic time per element.
- **Space Complexity:** $\mathcal{O}(m \cdot n)$ — For the Priority Queue and DP table.

---

## Solution 2: Standard DFS with Memoization (Top-Down DP - Optimal $\mathcal{O}(m \cdot n)$)

### Approach
For any cell `(r, c)`, the longest increasing path starting at `(r, c)` is:
$$\text{dfs}(r, c) = 1 + \max_{(nr, nc) \in \text{neighbors}, \; \text{matrix}[nr][nc] > \text{matrix}[r][c]} \text{dfs}(nr, nc)$$

Since subproblems overlap, we memoize results in a 2D array `memo[r][c]`. Each cell is computed **at most once**.

### Code
```cpp
class Solution {
public:
    int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    int dfs(int r, int c, vector<vector<int>>& matrix, vector<vector<int>>& memo) {
        if (memo[r][c] != 0) return memo[r][c];

        int m = matrix.size(), n = matrix[0].size();
        int maxLen = 1;

        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                maxLen = max(maxLen, 1 + dfs(nr, nc, matrix, memo));
            }
        }

        return memo[r][c] = maxLen;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> memo(m, vector<int>(n, 0));

        int maxPath = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxPath = max(maxPath, dfs(i, j, matrix, memo));
            }
        }

        return maxPath;
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(m \cdot n)$ — Each cell is computed once, visiting 4 directions.
- **Space Complexity:** $\mathcal{O}(m \cdot n)$ — For memoization matrix and recursion stack.

---

## Comparison of Approaches

| Method | Approach | Time Complexity | Space Complexity | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Priority Queue (Val-Sorting)** | Topological order processing by cell value | $\mathcal{O}(m \cdot n \log(m \cdot n))$ | $\mathcal{O}(m \cdot n)$ | Simple iterative logic, no recursion |
| **DFS + Memoization** | Top-Down Recursive DP | $\mathcal{O}(m \cdot n)$ | $\mathcal{O}(m \cdot n)$ | Optimal time complexity |
