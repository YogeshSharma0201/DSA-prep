# Burst Balloons

**Link:** https://leetcode.com/problems/burst-balloons

## Problem
Given n balloons each with a number, bursting balloon i earns nums[i-1] * nums[i] * nums[i+1] coins. Bursting all balloons changes the neighbors of remaining ones. Find the maximum coins you can collect by bursting all balloons. Balloons beyond the boundary are treated as having value 1.

## Solution
Instead of choosing which balloon to burst first, think of choosing the LAST balloon to burst in a subrange [l, r]. When balloon k is the last to burst in [l, r], the boundaries are nums[l-1] and nums[r+1], which are still present. This independence allows dp[l][r] = max over k of (dp[l][k-1] + nums[l-1]*nums[k]*nums[r+1] + dp[k+1][r]).

## Code
```cpp
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    // dp[l][r] = max coins for balloons in open interval (l, r)
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

    for (int len = 1; len <= n; len++) {
        for (int l = 1; l <= n - len + 1; l++) {
            int r = l + len - 1;
            for (int k = l; k <= r; k++) {
                dp[l][r] = max(dp[l][r],
                    dp[l][k-1] + nums[l-1] * nums[k] * nums[r+1] + dp[k+1][r]);
            }
        }
    }
    return dp[1][n];
}
```
