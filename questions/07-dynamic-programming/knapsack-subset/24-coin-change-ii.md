# Coin Change II

**Link:** https://leetcode.com/problems/coin-change-ii/

## Problem

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

**Example 1:**
```
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

**Example 2:**
```
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
```

**Example 3:**
```
Input: amount = 10, coins = [10]
Output: 1
```

**Constraints:**
- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All the values of `coins` are **unique**.
- `0 <= amount <= 5000`

---

## Solution & Debugging Analysis

### Analysis of User's Initial Solution & Bugs

#### Bug 1: Loop Variable Overflow in `while` loop (`changeA += coins[j-1]`)
In the initial approach:
```cpp
int changeA = coins[j-1];
while(i >= changeA) {
    dp[i][j] += dp[i-changeA][j-1];
    changeA += coins[j-1]; // Overflow when changeA exceeds INT_MAX
}
```
When `changeA` exceeds $2^{31}-1$, signed integer overflow causes `changeA` to wrap around to a negative number. This results in an **infinite loop** and out-of-bounds array access (`dp[i - negative]`).

#### Bug 2: Intermediate State Explosion in 2D DP (`dp[i][j] += dp[i-coins[j-1]][j]`)
Even after removing the `while` loop, intermediate entries in the 2D table `dp[i][j]` (number of ways using first $j$ coins) exceed $2^{31}-1$ for large test cases (reaching trillions). In C++, adding signed integers beyond `INT_MAX` triggers AddressSanitizer/UBSan `signed integer overflow` errors.

#### Fix: Unbounded Knapsack Transition + `unsigned int`
1. **Unbounded Knapsack Recurrence:** Instead of a `while` loop, `dp[i][j] = dp[i][j-1] + dp[i-coins[j-1]][j]`.
2. **`unsigned int` Data Type:** In C++, unsigned addition is defined modulo $2^{32}$, preventing sanitizer errors while yielding the exact 32-bit integer answer.

---

## Code

### Approach 1: User's Initial Code (2D DP with `while` loop) — *Has Signed Int Overflow Bug*

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<long long>> dp(amount+1, vector<long long>(n+1, 0));

        for(int i=0; i<=n; i++) dp[0][i] = 1;

        for(int i=1; i<=amount; i++) {
            for(int j=1; j<=coins.size(); j++) {
                dp[i][j] += dp[i][j-1];
                int changeA = coins[j-1];
                while(i >= changeA) {
                    dp[i][j] += dp[i-changeA][j-1];
                    changeA += coins[j-1]; // Bug: Signed int overflow
                }
            }
        }
        return dp[amount][n];
    }
};
```

---

### Approach 2: Fixed 2D Dynamic Programming (`unsigned int`)

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        // Use unsigned int for 2D DP table to prevent signed overflow on intermediate states
        vector<vector<unsigned int>> dp(amount + 1, vector<unsigned int>(n + 1, 0));

        // Base case: 1 way to form amount 0
        for (int j = 0; j <= n; j++) dp[0][j] = 1;

        for (int i = 1; i <= amount; i++) {
            for (int j = 1; j <= n; j++) {
                // Option 1: Don't use coins[j-1]
                dp[i][j] = dp[i][j - 1];

                // Option 2: Use coins[j-1] at least once
                if (i >= coins[j - 1]) {
                    dp[i][j] += dp[i - coins[j - 1]][j]; // 'j' allows unlimited coin usage
                }
            }
        }

        return dp[amount][n];
    }
};
```

---

### Approach 3: 1D Space-Optimized DP (`unsigned int`) — *Optimal*

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        // Use unsigned int to avoid signed integer overflow errors on LeetCode's sanitizer
        vector<unsigned int> dp(amount + 1, 0);
        dp[0] = 1; // 1 way to make amount 0

        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }

        return dp[amount];
    }
};
```
