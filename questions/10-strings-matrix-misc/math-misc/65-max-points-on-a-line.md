# Max Points on a Line

**Link:** https://leetcode.com/problems/max-points-on-a-line/

## Problem
Given an array of points where points[i] = [xi, yi] represents a point on the 2D plane, return the maximum number of points that lie on the same straight line.

## Solution
For each point `i`, treat it as the anchor. Calculate the slope of the line passing through `i` and every other point `j`. Store the frequency of each slope in a hash map. The maximum frequency of a slope plus 1 (for the anchor point itself) gives the maximum points on a line passing through `i`. The slope is calculated using `atan2(y_diff, x_diff)` (or by reducing the fraction `y_diff / x_diff` using GCD to avoid floating-point inaccuracies). The time complexity is O(N^2) where N is the number of points.

## Code
```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& input) {
        int n = input.size();

        if(n == 1) return 1;

        int ans = 2;

        for(int i=0; i<n; i++) {
            unordered_map<double,int> umap;
            for(int j=0; j<n; j++) {
                if(i==j) continue;

                double tan0 = atan2((input[j][1] - input[i][1])
                        ,(input[j][0] - input[i][0]));

                umap[tan0]++;
                ans = max(ans, umap[tan0]+1);
            }
        }

        return ans;
    }
};
```
