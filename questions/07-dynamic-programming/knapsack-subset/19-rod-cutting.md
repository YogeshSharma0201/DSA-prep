# Rod Cutting Problem

**Link:** https://www.geeksforgeeks.org/problems/rod-cutting0840/1

## Problem
Given a rod of length `N` and prices for pieces of lengths `1` to `N`, determine the maximum value obtainable by cutting the rod into pieces and selling them.

**Example 1:**
```
Input: price[] = [1, 5, 8, 9, 10, 17, 17, 20]
Output: 22
Explanation: Cut the rod of length 8 into two pieces of lengths 2 and 6 to get price 5 + 17 = 22.
```

**Example 2:**
```
Input: price[] = [3, 5, 8, 9, 10, 17, 17, 20]
Output: 24
Explanation: Cut the rod of length 8 into 8 pieces of length 1 to get price 8 * 3 = 24.
```

---

## Solutions

### Approach 1: 1D Dynamic Programming (Subproblem Cutting) — O(N^2) Time, O(N) Space
- `dp[i]` represents the maximum profit obtainable from a rod of length `i`.
- For a rod of length `i`, try making a first cut of length `j` ($1 \le j \le i$), which yields profit `price[j-1]`, and solve the remaining subproblem of length `i-j` (`dp[i-j]`).
- **Recurrence:**
  $$\text{dp}[i] = \max_{1 \le j \le i} (\text{price}[j-1] + \text{dp}[i-j])$$

> **Trace Example:**
> - `len = 1`: `[1]`
> - `len = 2`: `max(price[1], price[0] + dp[1]) = max(5, 1+1) = 5`
> - `len = 3`: `max(price[2], price[0] + dp[2], price[1] + dp[1]) = max(8, 1+5, 5+1) = 8`

---

### Approach 2: Unbounded Knapsack Mapping — O(N^2) Time, O(N) Space
- **Mapping to Unbounded Knapsack:**
  - Knapsack Capacity $W = N$ (total rod length).
  - Items available: Pieces of length $1, 2, \dots, N$.
  - Item weight = Piece length $j$.
  - Item value = `price[j-1]`.
  - Since each piece length can be chosen an **infinite number of times** (unbounded), this is identical to the Unbounded Knapsack problem.
- **Recurrence (Forward 1D Traversal):**
  For each piece length $i$ ($1 \le i \le N$) and capacity $w$ ($i \le w \le N$):
  $$\text{dp}[w] = \max(\text{dp}[w], \text{price}[i-1] + \text{dp}[w - i])$$

---

## Code

### Approach 1: 1D DP (Subproblem Cutting)

```cpp
class Solution {
  public:
    int cutRod(vector<int> &price) {
        int n = price.size();
        
        vector<int> dp(n + 1, 0);
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] = max(dp[i], price[j - 1] + dp[i - j]);
            }
        }
        
        return dp[n];
    }
};

// Subproblem recurrence:
// solve(length) = max_{1 <= i <= length} ( price[i-1] + solve(length - i) )
```

### Approach 2: Unbounded Knapsack Approach

```cpp
class Solution {
  public:
    int cutRod(vector<int> &price) {
        int n = price.size();
        // Capacity W = n
        // Weight wt[i-1] = i, Value val[i-1] = price[i-1]
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= n; i++) {           // Piece of length i
            for (int w = i; w <= n; w++) {       // Forward iteration for Unbounded Knapsack
                dp[w] = max(dp[w], price[i - 1] + dp[w - i]);
            }
        }

        return dp[n];
    }
};
```

