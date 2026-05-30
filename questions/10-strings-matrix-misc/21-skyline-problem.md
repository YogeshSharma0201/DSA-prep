# The Skyline Problem

**Link:** https://leetcode.com/problems/the-skyline-problem/

## Problem
Given a list of buildings as [left, right, height] triplets, compute the skyline formed by these buildings as a list of [x, height] key points. The skyline represents the silhouette formed by all buildings viewed from a distance, marking every point where the outline changes height.

## Solution
Create events for every building's left and right edge sorted by x coordinate. Use a max-heap (priority queue) of (height, right_boundary) for active buildings. At each x, push buildings starting here and pop buildings that have ended. If the max height changes from the previous key point, record it.

## Code
```cpp
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        int edge_idx = 0;
        vector<pair<int, int>> edges;
        priority_queue<pair<int, int>> pq;
        vector<vector<int>> skyline;

        for (int i = 0; i < buildings.size(); ++i) {
            const auto &b = buildings[i];
            edges.emplace_back(b[0], i);
            edges.emplace_back(b[1], i);
        }

        std::sort(edges.begin(), edges.end());

        while (edge_idx < edges.size()) {
            int curr_height;
            const auto &[curr_x, _] = edges[edge_idx];
            while (edge_idx < edges.size() &&
                    curr_x == edges[edge_idx].first) {
                const auto &[_, building_idx] = edges[edge_idx];
                const auto &b = buildings[building_idx];
                if (b[0] == curr_x)
                    pq.emplace(b[2], b[1]);
                ++edge_idx;
            }
            while (!pq.empty() && pq.top().second <= curr_x)
                pq.pop();
            curr_height = pq.empty() ? 0 : pq.top().first;
            if (skyline.empty() || skyline.back()[1] != curr_height)
                skyline.push_back({curr_x, curr_height});
        }
        return skyline;
    }
};
```
