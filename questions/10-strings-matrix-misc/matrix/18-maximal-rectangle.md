# Maximal Rectangle

**Link:** https://leetcode.com/problems/maximal-rectangle/

## Problem
Given a rows x cols binary matrix filled with '0's and '1's, find the largest rectangle containing only '1's and return its area. The rectangle must be axis-aligned.

## Solution
Build cumulative histogram heights row by row: for each cell, if it's '1' increment height, otherwise reset to 0. For each row, apply the largest-rectangle-in-histogram algorithm using a monotonic stack that stores (height, start_index) pairs.

## Code
```cpp
int maximalRectangle(vector<vector<char>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();
    vector<int> pre(m, 0);

    int maxRect = 0;
    stack<pair<int,pair<int,int>>> st;
    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) {
            if(matrix[i][j] == '1') pre[j]++;
            else pre[j] = 0;

            // Important optimization, otherwise we would have to maintain left and right arrays
            // with info about the rectangle allowed width constraint
            int idx = j;
            while(!st.empty() && st.top().first >= pre[j]) {
                maxRect = max(pre[st.top().second.first] * (j - st.top().second.second), maxRect);
                idx = st.top().second.second;
                st.pop();
            }
            st.push({pre[j], { j , idx }});
        }
        while(!st.empty()) {
            maxRect = max(pre[st.top().second.first] * (m - st.top().second.second), maxRect);
            st.pop();
        }
    }

    return maxRect;
}
```
