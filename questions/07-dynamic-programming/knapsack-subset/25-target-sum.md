# Target Sum

**Link:** https://leetcode.com/problems/target-sum/

## Problem

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.

- For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`.

Return the number of different **expressions** that you can build, which evaluate to `target`.

**Example 1:**
```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

**Example 2:**
```
Input: nums = [1], target = 1
Output: 1
```

**Constraints:**
- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

---

## Solution & Mathematical Reduction

### Key Insight — Reduction to Subset Sum (0/1 Knapsack)

Partition the numbers into two subsets:
1. $P$: numbers assigned positive sign `+`.
2. $N$: numbers assigned negative sign `-`.

We have:
$$\text{sum}(P) - \text{sum}(N) = \text{target}$$
$$\text{sum}(P) + \text{sum}(N) = \text{totalSum}$$

Adding both equations yields:
$$2 \cdot \text{sum}(P) = \text{target} + \text{totalSum} \implies \text{sum}(P) = \frac{\text{target} + \text{totalSum}}{2}$$

Therefore, the problem reduces to: **Find the number of subsets of `nums` whose sum equals $S = (\text{target} + \text{totalSum}) / 2$.**

**Feasibility Conditions:**
- If $\text{totalSum} + \text{target} < 0$, return `0`.
- If $(\text{totalSum} + \text{target}) \pmod 2 \ne 0$, return `0`.

---

### Approach 1: Top-Down DP with Memoization (User's Solution)

#### Intuition & State
- `solve(idx, currSum)`: number of ways to reach target 0 starting at `idx` with `currSum` remaining.
- Shift negative sum values into valid vector indices using an `offset = 2000`.

#### Complexity
- **Time Complexity:** $\mathcal{O}(N \times \text{totalSum})$
- **Space Complexity:** $\mathcal{O}(N \times \text{totalSum})$ for DP table and recursion stack.

---

### Approach 2: Tabular 1D Bottom-Up DP (Subset Sum Reduction) — *Optimal*

#### Algorithm
1. Compute `totalSum = sum(nums)`.
2. Check feasibility: if `totalSum + target < 0` or `(totalSum + target) % 2 != 0`, return `0`.
3. Set $S = (\text{totalSum} + \text{target}) / 2$.
4. Initialize `dp[0] = 1`, all other `dp[s] = 0`.
5. For each `num` in `nums`, iterate `s` backwards from $S$ down to `num`:
   $$\text{dp}[s] += \text{dp}[s - \text{num}]$$
6. Return `dp[S]`.

#### Complexity
- **Time Complexity:** $\mathcal{O}(N \times S)$
- **Space Complexity:** $\mathcal{O}(S)$ where $S \le 1000$.

---

### Approach 3: Tabular 2D Bottom-Up DP (Offset Table)

Directly builds DP table `dp[i][s + offset]` representing ways to form sum `s` using first `i` numbers.

---

## Code

### Approach 1: Top-Down DP (Memoization with Offset) — *User's Solution*

```cpp
class Solution {
public:
    int offset = 2e3;
    int solve(int idx, int currSum, vector<int>& nums, vector<vector<int>>& dp) {
        int n = nums.size();
        if(idx == n) {
            if(currSum == 0) return 1;
            else return 0;
        }

        int cSumOffset = currSum + offset;
        if(dp[idx][cSumOffset] != -1) return dp[idx][cSumOffset];

        return dp[idx][cSumOffset] = solve(idx + 1, currSum + nums[idx], nums, dp) 
                                   + solve(idx + 1, currSum - nums[idx], nums, dp);
    }

    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(2 * offset + 1, -1));

        return solve(0, target, nums, dp);
    }
};
```

---

### Approach 2: Tabular 1D Bottom-Up DP (Subset Sum Reduction) — *Optimal*

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);

        // Target is unreachable if totalSum + target is negative or odd
        if (totalSum + target < 0 || (totalSum + target) % 2 != 0) {
            return 0;
        }

        int subsetSum = (totalSum + target) / 2;
        vector<int> dp(subsetSum + 1, 0);
        dp[0] = 1; // 1 way to form subset sum 0 (empty subset)

        for (int num : nums) {
            for (int s = subsetSum; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[subsetSum];
    }
};
```

---

### Approach 3: Tabular 2D Bottom-Up DP (Direct Offset Matrix)

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > totalSum) return 0;

        int n = nums.size();
        int offset = totalSum;
        vector<vector<int>> dp(n + 1, vector<int>(2 * totalSum + 1, 0));

        dp[0][0 + offset] = 1; // Base case: 0 items, sum 0

        for (int i = 0; i < n; i++) {
            for (int s = -totalSum; s <= totalSum; s++) {
                if (dp[i][s + offset] > 0) {
                    dp[i + 1][s + nums[i] + offset] += dp[i][s + offset];
                    dp[i + 1][s - nums[i] + offset] += dp[i][s + offset];
                }
            }
        }

        return dp[n][target + offset];
    }
};
```
