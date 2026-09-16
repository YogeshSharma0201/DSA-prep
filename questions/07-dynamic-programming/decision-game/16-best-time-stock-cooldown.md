# Best Time to Buy and Sell Stock with Cooldown

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

## Problem

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

- After you sell your stock, you cannot buy stock on the next day (i.e., **cooldown** of 1 day).
- You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1:**
```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
```

**Example 2:**
```
Input: prices = [1]
Output: 0
```

**Constraints:**
- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

---

## Solution

### Key Intuition
We want to maximize our total profit under the constraint that selling on day `i` prevents buying on day `i+1` (forcing a cooldown day on `i+1`). Thus, if we buy on day `j` and sell on day `i` ($j < i$), the previous transaction must have ended on or before day `j - 2`.

---

### Approach 1: 1D Dynamic Programming (User's Solution)

#### Intuition & Recurrence
Let `dp[i]` be the maximum profit achieved up to day `i`.
For each day `i`:
1. **Sell on day `i`:** Choose a buying day `j < i`. The profit is `prices[i] - prices[j] + dp[j-2]` (if `j >= 2`, since we need 1 cooldown day before buying at `j`).
2. **Do not sell on day `i`:** `dp[i] = dp[i-1]`.

$$\text{dp}[i] = \max \left( \text{dp}[i-1], \max_{0 \le j < i} \left( \text{prices}[i] - \text{prices}[j] + (\text{dp}[j-2] \text{ if } j \ge 2 \text{ else } 0) \right) \right)$$

#### Complexity
- **Time Complexity:** $\mathcal{O}(N^2)$ due to the nested loop searching for the optimal buy day `j`.
- **Space Complexity:** $\mathcal{O}(N)$ for the 1D DP table.

---

### Approach 2: Optimized 1D DP — $\mathcal{O}(N)$ Time

#### Optimization Idea
In Approach 1, notice that when computing `dp[i]` for selling on day `i`:
$$\text{dp}[i] = \text{prices}[i] + \max_{0 \le j < i} \Big( (\text{dp}[j-2] \text{ if } j \ge 2 \text{ else } 0) - \text{prices}[j] \Big)$$

The term inside the $\max$ depends only on $j$. We can eliminate the inner loop by maintaining a running variable `max_buy`:
$$\text{max\_buy} = \max \Big( \text{max\_buy}, (\text{dp}[j-2] \text{ if } j \ge 2 \text{ else } 0) - \text{prices}[j] \Big)$$

This reduces the time complexity from $\mathcal{O}(N^2)$ to $\mathcal{O}(N)$ while preserving your original DP state concept!

#### Complexity
- **Time Complexity:** $\mathcal{O}(N)$
- **Space Complexity:** $\mathcal{O}(N)$

---

### Approach 3: State Machine DP — $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space (Optimal)

#### State Definitions for Day `i`
We can represent the system using 3 states:
1. `hold`: Maximum profit if we hold a stock on day `i`.
2. `sell`: Maximum profit if we sell a stock on day `i`.
3. `rest`: Maximum profit if we do nothing / rest (in cooldown or holding no stock) on day `i`.

#### State Transitions
- $\text{hold}_i = \max(\text{hold}_{i-1}, \text{rest}_{i-1} - \text{prices}[i])$
- $\text{sell}_i = \text{hold}_{i-1} + \text{prices}[i]$
- $\text{rest}_i = \max(\text{rest}_{i-1}, \text{sell}_{i-1})$

Since state at day $i$ only depends on state at day $i-1$, we can compress the space to $\mathcal{O}(1)$ using 3 variables.

#### Complexity
- **Time Complexity:** $\mathcal{O}(N)$
- **Space Complexity:** $\mathcal{O}(1)$

---

## Code

### Approach 1: 1D DP with Inner Loop ($\mathcal{O}(N^2)$ Time, $\mathcal{O}(N)$ Space) — *User's Original Solution*

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if (n == 0) return 0;
        vector<int> dp(n, 0);

        for (int i = 1; i < prices.size(); i++) {
            // Find a good buy value
            for (int j = 0; j < i; j++) {
                if (prices[i] > prices[j]) {
                    dp[i] = max(dp[i], prices[i] - prices[j] + (j - 2 >= 0 ? dp[j - 2] : 0));
                }
            }
            // No selling, take max from last index
            dp[i] = max(dp[i], dp[i - 1]);
        }

        return dp[n - 1];
    }
};
```

---

### Approach 2: Optimized 1D DP ($\mathcal{O}(N)$ Time, $\mathcal{O}(N)$ Space)

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if (n <= 1) return 0;

        vector<int> dp(n, 0);
        int max_buy = -prices[0]; // Stores max(dp[j-2] - prices[j])

        for (int i = 1; i < n; i++) {
            // Option 1: Carry forward max profit from previous day (no sale today)
            dp[i] = dp[i - 1];

            // Option 2: Sell today (buy at best previous day j)
            dp[i] = max(dp[i], prices[i] + max_buy);

            // Update max_buy for future days: buying today at prices[i] with profit from dp[i-2]
            int prev_profit = (i >= 2) ? dp[i - 2] : 0;
            max_buy = max(max_buy, prev_profit - prices[i]);
        }

        return dp[n - 1];
    }
};
```

---

### Approach 3: State Machine DP ($\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space) — *Optimal*

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;

        int hold = -prices[0];
        int sell = 0;
        int rest = 0;

        for (int i = 1; i < prices.size(); i++) {
            int prev_hold = hold;
            int prev_sell = sell;
            int prev_rest = rest;

            hold = max(prev_hold, prev_rest - prices[i]);
            sell = prev_hold + prices[i];
            rest = max(prev_rest, prev_sell);
        }

        return max(sell, rest);
    }
};
```
