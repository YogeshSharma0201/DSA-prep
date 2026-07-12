# Minimum Moves to Equal Array Elements

**Link:** https://leetcode.com/problems/minimum-moves-to-equal-array-elements

## Problem
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal, where in each move you can increment n - 1 elements by 1. The goal is to find the least number of such operations.

## Solution
Incrementing n-1 elements by 1 is equivalent to decrementing 1 element by 1. So the problem reduces to: how many times do we subtract 1 from elements to make them all equal to the minimum? The answer is sum(nums) - n * min(nums).

## Code
```cpp
class Solution {
public:
    int minMoves(vector<int>& nums) {
        int minVal = *min_element(nums.begin(), nums.end());
        long long sum = 0;
        for (int x : nums) sum += x;
        return (int)(sum - (long long)minVal * nums.size());
    }
};
```
