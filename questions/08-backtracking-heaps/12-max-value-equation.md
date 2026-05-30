# Max Value of Equation

**Link:** https://leetcode.com/problems/max-value-of-equation/

## Problem
Given an array of points sorted by x-coordinate and an integer k, find the maximum value of `yi + yj + |xi - xj|` where `|xi - xj| <= k` and `i < j`. Since points are sorted, `|xi - xj| = xj - xi`.

## Solution
Rewrite the expression as `(yi - xi) + (yj + xj)`. For each new point j, maximize by finding the largest `(yi - xi)` among all previous points within distance k. Use a max-heap storing `(yi - xi, xi)`. Before checking the top, pop all entries where `xj - xi > k`. Update the answer, then push the current point's `(yj - xj, xj)`.

## Code
```cpp
int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
    priority_queue<pair<int,int>> pq;

    int maxV = -(INT_MAX>>1);
    for(int i=0; i<points.size(); i++) {
        while(!pq.empty() && points[i][0] - pq.top().second.first > k) pq.pop();

        if(!pq.empty()) {
            maxV = max(maxV, points[i][1] + pq.top().second.second + points[i][0] - pq.top().second.first);
        }

        pq.push({ points[i][1] - points[i][0], {points[i][0], points[i][1]}});
    }

    return maxV;
}
```
