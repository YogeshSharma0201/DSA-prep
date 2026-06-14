# Rectangle Area

**Link:** https://leetcode.com/problems/rectangle-area/

## Problem
Given two axis-aligned rectangles defined by their bottom-left and top-right corners `(ax1, ay1, ax2, ay2)` and `(bx1, by1, bx2, by2)`, return the total area covered by both rectangles (overlapping region counted only once).

## Solution — Inclusion-exclusion with min-of-all-differences trick
Total area = area(A) + area(B) − overlap area.

The overlap width is `max(0, min of all four x-differences)`:
- `ax2 - bx1` and `bx2 - ax1` — cross differences (negative when no overlap)
- `ax2 - ax1` and `bx2 - bx1` — individual widths (cap the overlap when one rect contains the other)

Taking the min of all four always yields the true overlap dimension (or a negative value which is clamped to 0). The same applies to the y-axis for overlap height.

## Code
```cpp
int computeArea(int ax1, int ay1, int ax2, int ay2,
                int bx1, int by1, int bx2, int by2) {
    int overlap = max(0, min({ax2 - bx1, bx2 - ax1, ax2 - ax1, bx2 - bx1}))
                * max(0, min({ay2 - by1, by2 - ay1, ay2 - ay1, by2 - by1}));

    return (ax2 - ax1) * (ay2 - ay1)
         + (bx2 - bx1) * (by2 - by1)
         - overlap;
}
```
