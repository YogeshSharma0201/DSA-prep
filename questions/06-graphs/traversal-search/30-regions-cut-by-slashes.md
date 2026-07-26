# Regions Cut By Slashes

**Link:** https://leetcode.com/problems/regions-cut-by-slashes/

## Problem
An `n x n` grid is composed of `1 x 1` squares where each `1 x 1` square can contain a `'/'`, `'\'`, or blank space `' '`. These characters divide the square into contiguous regions.

Given the grid represented as a string array, return the number of regions.

Note that backslash characters are escaped, so a `'\'` is represented as `'\\'`.

**Example 1:**
```
Input: grid = [" /","/ "]
Output: 2
```

**Example 2:**
```
Input: grid = [" /","  "]
Output: 1
```

**Example 3:**
```
Input: grid = ["/\\","\\/"]
Output: 5
```

**Constraints:**
- `n == grid.length == grid[i].length`
- `1 <= n <= 30`
- `grid[i][j]` is either `'/'`, `'\'`, or `' '`.

## Solution
### Upscaled DFS (Connected Components)
- We can view this as finding connected components (number of islands) on a grid. However, slashes (`/` and `\`) partition cells diagonally, which cannot be represented directly with standard grid coordinates.
- To handle this, we can **upscale the grid** by a factor of 3. Each `1 x 1` cell becomes a `3 x 3` grid of sub-cells:
  - A blank space `' '` is represented as all `0`s (walkable).
  - A forward slash `'/'` is represented by setting the diagonal sub-cells from top-right to bottom-left to `1` (blocked boundary).
  - A backslash `'\'` is represented by setting the diagonal sub-cells from top-left to bottom-right to `1` (blocked boundary).
- After constructing the upscaled `3n x 3m` binary matrix, we count the number of regions using standard Flood Fill (DFS) to traverse all reachable `0`s.

## Code
```cpp
class Solution {
public:
    int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};

    void dfs(int i, int j, vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();

        if(i<0 || i>=n || j<0 || j>= m || mat[i][j] == 1) {
            return;
        }

        mat[i][j] = 1;

        for(auto d : dir) {
            int xi = i + d[0];
            int yi = j + d[1];

            dfs(xi, yi, mat);
        }
    }

    // Upscaled DFS
    int regionsBySlashes(vector<string>& grid) {
        int n = grid.size(), m = grid[0].size();
        // Upscale the grid to 3x the size
        // If we upscale by 2x the size then it doesn't work
        // It needs to be minimum of 3x
        vector<vector<int>> mat(3*n, vector<int>(3*m, 0));

        for(int i=0; i<grid.size(); i++) {
            string s = grid[i];

            for(int j=0; j<s.size(); j++) {
                if(s[j] == '\\') {
                    // 1 0
                    // 0 1 pattern
                    for(int k=0; k<3; k++) {
                        mat[3*i + k][3*j + k] = 1;
                    }
                }
                else if(s[j] == '/') {
                    // 0 1
                    // 1 0 pattern
                    for(int k=0, l=2; k<3; k++,l--) {
                        mat[3*i + k][3*j + l] = 1;
                    }
                }
            }
        }

        // flood fill
        int count = 0;
        for(int i=0; i<mat.size(); i++) {
            for(int j=0; j<mat[0].size(); j++) {
                if(mat[i][j] == 0) {
                    count++;
                    dfs(i, j, mat);
                }
            }
        }
        return count;
    }
};
```
