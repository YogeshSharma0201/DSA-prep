# Last Stone Weight II

**Link:** https://leetcode.com/problems/last-stone-weight-ii/

## Problem

You are given an array of integers `stones` where `stones[i]` is the weight of the `i-th` stone.

We are playing a game with the stones. On each step, we choose any two stones and smash them together. Suppose the stones have weights `x` and `y` with `x <= y`. The result of this smash is:
- If `x == y`, both stones are destroyed.
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is at most one stone left.

Return *the smallest possible weight of the left stone*. If there are no stones left, return `0`.

**Example 1:**
```
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0, so the array converts to [1], then that's the value of the last stone.
```

**Example 2:**
```
Input: stones = [31,26,33,21,40]
Output: 5
```

**Constraints:**
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 100`

---

## Solution

### Key Insight — Reduction to Partition Minimum Subset Difference (0/1 Knapsack)
Smashing any two stones with weights $x$ and $y$ produces $y - x$. Repeatedly smashing pairs of stones is equivalent to dividing all stones into two target groups $S_1$ and $S_2$, such that the total weight of group 1 is $W$ and group 2 is $\text{total} - W$. The final remaining weight is $|S_1 - S_2| = |(\text{total} - W) - W| = |\text{total} - 2W|$.

To minimize $|\text{total} - 2W|$, we want to find a subset sum $W$ as close to $\lfloor \text{total} / 2 \rfloor$ as possible.

---

### Approach 1: Memoized Top-Down DP (Recursion + Memoization)

#### State Representation & Recurrence
- **State:** `solve(idx, w)` where `idx` is the current stone index and `w` is the accumulated sum of group 1.
- **Base Case:** When `idx == n`, return `abs((total - w) - w) = abs(total - 2*w)`.
- **Transitions:** For each stone `stones[idx]`:
  - **Option 1 (Exclude from Group 1):** `solve(idx + 1, w)`
  - **Option 2 (Include in Group 1):** `solve(idx + 1, w + stones[idx])`
- **Memoization:** Table `dp[n][total + 1]` initialized to `-1`.

#### Complexity
- **Time Complexity:** $\mathcal{O}(N \times \text{total})$
- **Space Complexity:** $\mathcal{O}(N \times \text{total})$ for DP table and recursion stack.

---

### Approach 2: 1D Bottom-Up DP (Space Optimized 0/1 Knapsack)

#### Core Idea
Find the maximum subset sum $W \le \lfloor \text{total} / 2 \rfloor$.
- Let `target = total / 2`.
- `dp[w]` stores whether subset sum `w` can be formed.
- Loop `target` backwards down to `stone` to reuse 1D array safely.
- Answer will be `total - 2 * max_W`.

#### Complexity
- **Time Complexity:** $\mathcal{O}(N \times \text{target})$
- **Space Complexity:** $\mathcal{O}(\text{target})$

---

## Code

### Approach 1: Top-Down DP (Memoization)

```cpp
class Solution {
public:
    // Divide into two groups, then minimize the difference between two groups
    int solve(int idx, int w, int& tot, vector<int>& stones, vector<vector<int>>& dp) {
        int n = stones.size();
        if (idx == n) {
            int v = tot - w;
            return abs(w - v);
        }
        if (dp[idx][w] != -1) return dp[idx][w];

        // Choose or discard the stone to be in group w
        return dp[idx][w] = min(solve(idx + 1, w, tot, stones, dp),
                                solve(idx + 1, w + stones[idx], tot, stones, dp));
    }

    int lastStoneWeightII(vector<int>& stones) {
        int n = stones.size();
        int tot = accumulate(stones.begin(), stones.end(), 0);
        vector<vector<int>> dp(n, vector<int>(tot + 1, -1));
        return solve(0, 0, tot, stones, dp);
    }
};
```

### Approach 2: 1D Space-Optimized Bottom-Up DP

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int tot = accumulate(stones.begin(), stones.end(), 0);
        int target = tot / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;

        for (int stone : stones) {
            for (int w = target; w >= stone; w--) {
                dp[w] = dp[w] || dp[w - stone];
            }
        }

        for (int w = target; w >= 0; w--) {
            if (dp[w]) {
                return tot - 2 * w;
            }
        }

        return 0;
    }
};
```
