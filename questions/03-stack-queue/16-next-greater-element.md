# Next Greater Element

**Link:** https://leetcode.com/problems/next-greater-element-i

## Problem
Given two arrays `nums1` and `nums2` where nums1 is a subset of nums2, for each element in nums1 find the next greater element in nums2. The next greater element of x in nums2 is the first element to the right of x in nums2 that is greater than x. Return -1 if no such element exists.

## Solution
Use a monotonic stack on nums2. Process elements left to right; pop the stack when a larger element is found and record the mapping. Store results in a hash map from element to its next greater element, then look up each element of nums1.

## Code
```cpp
vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> nextGreater;
    stack<int> st;
    for (int x : nums2) {
        while (!st.empty() && st.top() < x) {
            nextGreater[st.top()] = x;
            st.pop();
        }
        st.push(x);
    }
    vector<int> result;
    for (int x : nums1)
        result.push_back(nextGreater.count(x) ? nextGreater[x] : -1);
    return result;
}
```
