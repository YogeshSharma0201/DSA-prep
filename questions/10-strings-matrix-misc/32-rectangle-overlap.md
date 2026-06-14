# Rectangle Overlap

**Link:** https://leetcode.com/problems/rectangle-overlap/

## Problem
Given two axis-aligned rectangles `rec1` and `rec2`, each represented as `[x1, y1, x2, y2]` (bottom-left and top-right corners), return `true` if they overlap. Two rectangles overlap if their intersection has a positive area (touching edges/corners does not count).

## Solution — 1D projection to 2D
Two rectangles overlap in 2D if and only if their projections overlap on **both** axes independently.

For 1D: intervals `[a, b]` and `[c, d]` overlap when `a < d && c < b`.

Apply this to both axes:
- X-axis: `rec1[0] < rec2[2] && rec2[0] < rec1[2]`
- Y-axis: `rec1[1] < rec2[3] && rec2[1] < rec1[3]`

Both conditions must hold simultaneously.

## Code
```cpp
bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {
    return rec1[0] < rec2[2] && rec2[0] < rec1[2] &&
           rec1[1] < rec2[3] && rec2[1] < rec1[3];
}
```
