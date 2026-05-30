# Longest Arithmetic Subsequence

**Link:** https://leetcode.com/problems/longest-arithmetic-subsequence/

## Problem
Given an array of integers, find the length of the longest arithmetic subsequence. An arithmetic subsequence has a constant difference between consecutive elements. Elements do not need to be contiguous, but must appear in order.

## Solution
DP with a map per index: dp[i] is an unordered_map from difference to the length of the longest arithmetic subsequence ending at index i with that difference. For each pair (j, i) with j < i, compute diff = nums[i] - nums[j] and set dp[i][diff] = dp[j][diff] + 1 (or 2 if dp[j][diff] does not exist). Track the global maximum length.

## Code
```cpp
int longestArithSeqLength(vector<int>& nums) {
    int n = nums.size();
    vector<unordered_map<int,int>> dp(n);
    int ans = 2;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            int diff = nums[i] - nums[j];
            int prev = dp[j].count(diff) ? dp[j][diff] : 1;
            dp[i][diff] = prev + 1;
            ans = max(ans, dp[i][diff]);
        }
    }
    return ans;
}
```
