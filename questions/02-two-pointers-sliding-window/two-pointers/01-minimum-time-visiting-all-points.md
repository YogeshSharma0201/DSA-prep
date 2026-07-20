# Minimum Time Visiting All Points

**Link:** https://leetcode.com/problems/minimum-time-visiting-all-points/

## Problem
Given an array of points on a 2D plane, find the minimum time to visit all points in order. You can move one unit per second in any direction including diagonals. Movement is 8-directional, so you can cover both axes simultaneously.

## Solution
The key insight is Chebyshev distance: the time to move between two points is max(|dx|, |dy|). Moving diagonally covers both x and y differences at the same rate, so the limiting factor is whichever axis has the greater difference. Sum this value across consecutive point pairs.

## Code
```cpp
int minTimeToVisitAllPoints(vector<vector<int>>& points) {
    int ret = 0;

    for (int i = 0; i < points.size() - 1; i++) {
        int xDiff = abs(points[i][0] - points[i+1][0]);
        int yDiff = abs(points[i][1] - points[i+1][1]);

        ret += max(xDiff, yDiff);
    }

    return ret;
}
```
