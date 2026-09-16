# Coin Change

**Link:** https://leetcode.com/problems/coin-change/

## Problem

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

**Example 1:**
```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

**Example 2:**
```
Input: coins = [2], amount = 3
Output: -1
```

**Example 3:**
```
Input: coins = [0], amount = 0
Output: 0
```

---

## Solution

### 1D Dynamic Programming (Optimal Approach)

#### State & Recurrence
- **State:** `dp[i]` = minimum number of coins needed to make target amount `i`.
- **Base Case:** `dp[0] = 0` (0 coins needed to make amount 0).
- **Initialization:** Set `dp[1...amount] = amount + 1` (a sentinel value representing infinity, since max coins needed is at most `amount` using 1-cent coins).
- **Recurrence:** For each amount `i` from `1` to `amount` and each coin denomination `coin`:
  $$\text{dp}[i] = \min(\text{dp}[i], 1 + \text{dp}[i - \text{coin}]) \quad \text{if } i \ge \text{coin}$$

#### Difference Between Coin Change I and Coin Change II
- **Coin Change I (Min Coins):** Finds minimum coins. `dp[i] = min(dp[i], 1 + dp[i - coin])`. Either loop order works.
- **Coin Change II (Total Combinations):** Counts unique combinations. Outer loop MUST be `coins` to avoid counting permutations (e.g. `[1, 2]` vs `[2, 1]`).

#### Complexity
- **Time Complexity:** $\mathcal{O}(\text{amount} \times N)$
- **Space Complexity:** $\mathcal{O}(\text{amount})$

---

## Code

### Approach 1: 1D Dynamic Programming ($\mathcal{O}(\text{amount})$ Space) — *Optimal*

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Initialize dp array with (amount + 1) representing infinity
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0; // Base case: 0 coins needed for amount 0

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = min(dp[i], 1 + dp[i - coin]);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

---

### Approach 2: 2D Rolling Array DP

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        int maxAmount = INT_MAX >> 1;
        vector<vector<int>> dp(2, vector<int>(amount + 1, maxAmount));

        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= amount; j++) {
                if (i == 0) {
                    if (j % coins[i] == 0) {
                        dp[i % 2][j] = j / coins[i];
                    }
                } else {
                    dp[i % 2][j] = dp[(i + 1) % 2][j];
                    if (j >= coins[i]) {
                        dp[i % 2][j] = min(1 + dp[i % 2][j - coins[i]], dp[i % 2][j]);
                    }
                }
            }
        }

        return dp[(n + 1) % 2][amount] >= maxAmount ? -1 : dp[(n + 1) % 2][amount];
    }
};
```
