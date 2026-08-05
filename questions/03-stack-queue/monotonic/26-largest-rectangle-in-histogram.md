# Largest Rectangle in Histogram

**Link:** https://leetcode.com/problems/largest-rectangle-in-histogram/

## Problem
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

## Solution
We can solve this problem in $O(N)$ time and $O(N)$ space using a **monotonic stack**:
1. For each bar, we want to find how far the rectangle of its height can extend to the left and right.
2. The rectangle of height `heights[i]` can extend from the first bar to its left that is strictly shorter than `heights[i]` (let's call its index `left[i]`) to the first bar to its right that is strictly shorter than `heights[i]` (let's call its index `right[i]`).
3. The width of the rectangle will be `right[i] - left[i] - 1`.
4. The area for bar `i` is `heights[i] * (right[i] - left[i] - 1)`.
5. We use a monotonic stack to find `left[i]` (nearest smaller element to the left) and `right[i]` (nearest smaller element to the right) for all indices in $O(N)$ time.

## Code
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();

        vector<int> left(n, 0), right(n, 0);
        stack<int> st; st.push(0); left[0] = -1;

        for(int i=1; i<n; i++) {
            while(!st.empty() && heights[st.top()] >= heights[i]) st.pop();

            left[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }
        while(!st.empty()) st.pop();

        st.push(n-1); right[n-1] = n;
        for(int i=n-2; i>=0; i--) {
            while(!st.empty() && heights[st.top()] >= heights[i]) st.pop();

            right[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        int maxA = 0;

        for(int i=0; i<n; i++) {
            maxA = max(maxA, (right[i] - left[i] - 1) * heights[i]);
        }

        return maxA;
    }   
};
```
