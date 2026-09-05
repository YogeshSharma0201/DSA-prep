# Partition Equal Subset Sum

**Link:** https://leetcode.com/problems/partition-equal-subset-sum/

## Problem

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.

**Example 1:**
```
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

**Example 2:**
```
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

---

## Solution

### Reduction to Subset Sum (0/1 Knapsack)
1. **Total Sum Check:** Calculate the sum of all elements in `nums`. If `sum` is odd (`sum & 1`), return `false` immediately because an odd integer cannot be partitioned into two equal integer sums.
2. **Target Definition:** Set `target = sum / 2`. The problem reduces to checking whether there exists a subset of `nums` whose sum equals `target`.

---

### Approach 1: 2D Dynamic Programming — O(N * Target) Time, O(N * Target) Space

#### State Representation & Recurrence
- `dp[j][i]` = `true` if a sum `i` can be formed using a subset of the first `j` elements.
- **Base Case:** `dp[j][0] = true` for all `0 <= j <= N` (a sum of 0 can always be formed with an empty subset).
- **Transitions:** For each element `nums[j-1]` and target sum `i`:
  $$\text{dp}[j][i] = \text{dp}[j-1][i] \lor (\text{dp}[j-1][i - \text{nums}[j-1]] \text{ if } i \ge \text{nums}[j-1])$$

---

### Approach 2: 1D Space-Optimized DP — O(N * Target) Time, O(Target) Space

#### Core Idea
Since state transitions `dp[j][i]` only depend on row `dp[j-1]`, we can compress the DP table into a 1D array `dp[i]` of size `target + 1`.
- Iterate target backwards from `target` down to `num` to prevent using the same element multiple times in the same step.
- Transition: `dp[i] = dp[i] || dp[i - num]`.

---

## Code

### Approach 1: 2D Dynamic Programming (Explicit Table)

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();

        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum & 1) return false;
        int target = sum / 2;

        vector<vector<bool>> dp(n + 1, vector<bool>(target + 1, false));

        // Base case: sum of 0 is always possible
        for (int j = 0; j <= n; j++) dp[j][0] = true;

        for (int i = 1; i <= target; i++) {
            for (int j = 1; j <= n; j++) {
                dp[j][i] = dp[j - 1][i];
                if (i >= nums[j - 1] && dp[j - 1][i - nums[j - 1]]) {
                    dp[j][i] = true;
                }
            }
        }

        return dp[n][target];
    }
};
// State recurrence: sum(idx, target) = sum(idx-1, target) || sum(idx-1, target - nums[i])
```

### Approach 2: 1D Space-Optimized DP

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum & 1) return false;
        int target = sum / 2;

        vector<bool> dp(target + 1, false);
        dp[0] = true;

        for (int num : nums) {
            for (int i = target; i >= num; i--) {
                dp[i] = dp[i] || dp[i - num];
            }
        }

        return dp[target];
    }
};
```
