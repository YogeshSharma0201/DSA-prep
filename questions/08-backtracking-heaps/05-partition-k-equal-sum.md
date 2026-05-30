# Partition to K Equal Sum Subsets

**Link:** https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

## Problem
Given an integer array and an integer k, return true if it is possible to divide the array into k non-empty subsets whose sums are all equal. Each element must belong to exactly one subset.

## Solution
Use bitmask DP where each bitmask represents which elements have been used. `dp[mask]` stores the current running sum in the active bucket modulo the target. For each state, try adding each unused element; if adding it keeps the running sum within the target, transition to the next state. If `dp[(1<<n)-1] == 0`, all k buckets were filled perfectly.

## Code
```cpp
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int n = nums.size();
        int total = 0;
        for (int x : nums) total += x;
        if (total % k != 0) return false;
        int target = total / k;

        vector<int> dp(1 << n, -1);
        dp[0] = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) continue;
                int next = dp[mask] + nums[i];
                if (next > target) continue;
                dp[mask | (1 << i)] = next % target;
            }
        }
        return dp[(1 << n) - 1] == 0;
    }
};
```
