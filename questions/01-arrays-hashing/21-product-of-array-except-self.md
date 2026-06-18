# Product of Array Except Self

**Link:** https://leetcode.com/problems/product-of-array-except-self

## Problem
Given an integer array `nums`, return an array `answer` such that `answer[i]` is the product of all elements of `nums` except `nums[i]`. You must solve it in O(n) time without using division.

## Solution
Use two passes. First pass builds a prefix products array where `answer[i]` = product of all elements to the left. Second pass multiplies each position by the suffix product (product of all elements to the right), maintained as a running variable.

## Code
```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> answer(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
}
```
