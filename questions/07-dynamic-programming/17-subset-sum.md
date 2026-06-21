# Subset Sum Problem

**Link:** https://www.geeksforgeeks.org/subset-sum-problem-dp-25/

## Problem
Given an array of non-negative integers and a target sum, determine if there exists a subset whose elements sum to the target.

## Solution
0/1 knapsack variant. `dp[j]` = true if sum j is achievable. Initialize dp[0] = true (empty subset). For each element, iterate j from target down to the element's value and set dp[j] |= dp[j - element]. Return dp[target].

## Code
```cpp
bool isSubsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}
```
