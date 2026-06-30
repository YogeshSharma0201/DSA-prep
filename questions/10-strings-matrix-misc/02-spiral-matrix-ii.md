# Spiral Matrix II

**Link:** https://leetcode.com/problems/spiral-matrix-ii/

## Problem
Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n²` in spiral order.

**Example 1:**
```
Input:  n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

**Example 2:**
```
Input:  n = 1
Output: [[1]]
```

**Constraints:**
- `1 <= n <= 20`

## Solution

Walk the matrix cell by cell, always moving in the current direction. When the next cell is out-of-bounds or already filled, turn clockwise using a direction map before moving.

**Direction cycle:** right → down → left → up → right → ...
Encoded as `(dx, dy)` pairs: `(0,1) → (1,0) → (0,-1) → (-1,0) → (0,1)`

**`tie(dx, dy) = dir[{dx, dy}]`** — `std::tie` is needed to assign into *existing* variables; structured bindings (`auto [a,b]`) only declare new ones.

## Code
```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int N) {
        vector<vector<int>> res(N, vector<int>(N, 0));
        map<pair<int,int>, pair<int,int>> dir = {
            {{0,1},  {1,0}},
            {{1,0},  {0,-1}},
            {{0,-1}, {-1,0}},
            {{-1,0}, {0,1}},
        };

        int ci = 0, cj = 0, dx = 0, dy = 1, i = 1;
        while (true) {
            res[ci][cj] = i++;

            if (i > N*N) break;

            int x = ci + dx;
            int y = cj + dy;

            if (x < 0 || x >= N || y < 0 || y >= N || res[x][y] != 0) {
                tie(dx, dy) = dir[{dx, dy}];
                x = ci + dx;
                y = cj + dy;
            }

            ci = x;
            cj = y;
        }

        return res;
    }
};
```
