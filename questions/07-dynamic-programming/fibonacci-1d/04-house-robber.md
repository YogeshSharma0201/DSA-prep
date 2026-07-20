# House Robber

**Link:** https://leetcode.com/problems/house-robber/

## Problem
You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems so you cannot rob two adjacent houses. Given an integer array nums representing money in each house, return the maximum amount you can rob.

## Solution
DP with two variables. For each house, either rob it (add its value to the amount from two houses ago) or skip it (take the amount from the previous house). `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Compress space to two variables.

## Code
```cpp
int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int cur = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```
