# Flood Fill

**Link:** https://leetcode.com/problems/flood-fill

## Problem
Given an image represented by an m x n integer grid, a starting pixel (sr, sc), and a new color, perform a flood fill. Change the color of all pixels connected (4-directionally) to the starting pixel with the same original color to the new color.

## Solution
BFS or DFS from the starting pixel. If the starting pixel already has the new color, return immediately. Otherwise, use DFS to spread the new color to all 4-directionally adjacent pixels with the original color.

## Code
```cpp
void dfs(vector<vector<int>>& image, int r, int c, int oldColor, int newColor) {
    int m = image.size(), n = image[0].size();
    if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != oldColor) return;
    image[r][c] = newColor;
    dfs(image, r+1, c, oldColor, newColor);
    dfs(image, r-1, c, oldColor, newColor);
    dfs(image, r, c+1, oldColor, newColor);
    dfs(image, r, c-1, oldColor, newColor);
}

vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
    if (image[sr][sc] != color)
        dfs(image, sr, sc, image[sr][sc], color);
    return image;
}
```
