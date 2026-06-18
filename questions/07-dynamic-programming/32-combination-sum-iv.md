# Combination Sum IV

**Link:** https://leetcode.com/problems/combination-sum-iv/

## Problem
Given an array of distinct integers and a target integer, return the number of possible combinations that add up to target. The order of the combination matters, so different orderings count as different combinations.

## Solution
Unbounded DP (order matters, so iterate target first). `dp[j]` = number of ways to form sum j. For each sum j, iterate over all numbers: if num <= j, add dp[j - num] to dp[j]. Since order matters, we iterate the target in the outer loop.

## Code
```cpp
int combinationSum4(vector<int>& nums, int target) {
    vector<unsigned int> dp(target + 1, 0);
    dp[0] = 1;
    for (int j = 1; j <= target; j++) {
        for (int num : nums) {
            if (num <= j) dp[j] += dp[j - num];
        }
    }
    return dp[target];
}
```
