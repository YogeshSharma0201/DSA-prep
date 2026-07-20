# Single Number

**Link:** https://leetcode.com/problems/single-number

## Problem
Given a non-empty array of integers `nums` where every element appears exactly twice except for one element which appears only once, return that single element. The solution must run in O(n) time and use only O(1) extra space.

## Solution
XOR all elements together. XOR of a number with itself is `0`, and XOR of any number with `0` is the number itself. Since every duplicate pair cancels out (`x ^ x == 0`), all pairs cancel and only the unique element remains. This is O(n) time and O(1) space.

## Code
```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int x : nums) result ^= x;
    return result;
}
```
