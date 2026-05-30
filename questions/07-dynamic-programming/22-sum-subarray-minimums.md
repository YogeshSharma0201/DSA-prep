# Sum of Subarray Minimums

**Link:** https://leetcode.com/problems/sum-of-subarray-minimums/

## Problem
Given an array of integers, find the sum of the minimum values of every contiguous subarray. The answer may be large so return it modulo 10^9 + 7. Efficiently computing this requires avoiding the O(n^2) brute force approach.

## Solution
For each element arr[i], compute how many subarrays have arr[i] as their minimum. Use a monotonic increasing stack to find left[i] = distance to the nearest element strictly smaller on the left, and right[i] = distance to the nearest element smaller or equal on the right (use strict/non-strict to avoid double-counting). Contribution of arr[i] = arr[i] * left[i] * right[i]. Sum all contributions.

## Code
```cpp
int sumSubarrayMins(vector<int>& arr) {
    const int MOD = 1e9 + 7;
    int n = arr.size();
    vector<int> left(n), right(n);
    stack<int> st;

    // distance to previous smaller element (strict)
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();
        left[i] = st.empty() ? i + 1 : i - st.top();
        st.push(i);
    }

    while (!st.empty()) st.pop();

    // distance to next smaller or equal element
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && arr[st.top()] > arr[i]) st.pop();
        right[i] = st.empty() ? n - i : st.top() - i;
        st.push(i);
    }

    long long ans = 0;
    for (int i = 0; i < n; i++)
        ans = (ans + (long long)arr[i] * left[i] * right[i]) % MOD;
    return ans;
}
```
