# Minimum Jumps to Reach Home

**Link:** [Minimum Jumps to Reach Home - LeetCode](https://leetcode.com/problems/minimum-jumps-to-reach-home/)

## Problem

A certain bug is at position `0` on the x-axis. It can jump according to the following rules:
- It can jump **forward** `a` positions (`x + a`).
- It can jump **backward** `b` positions (`x - b`).
- It **cannot** jump backward twice in a row.
- It **cannot** jump to any position in `forbidden`.
- It **cannot** jump to negative positions ($x < 0$).

Given an array `forbidden`, integers `a`, `b`, and target `x`, return the **minimum number of jumps** needed to reach position `x`. If it is impossible, return `-1`.

---

## Solution (Memoized Top-Down DP / BFS)

### Intuition & State Representation
The state of the bug is defined by two variables:
1. `x`: Current position on the number line.
2. `backFlag`: A boolean indicating whether the previous jump was a backward jump (`true` if last move was backward, `false` otherwise).

Since we cannot jump backward twice consecutively:
- From state `(x, false)`: We can jump forward to `(x + a, false)` OR backward to `(x - b, true)`.
- From state `(x, true)`: We can ONLY jump forward to `(x + a, false)`.

---

### Upper Bound Analysis (`maxSize`)

Why set `maxSize = max(x + a + b, max(forbidden) + a + b) + 1`?

Mathematically, this is equivalent to:
$$\text{limit} = \max(x, \max(\text{forbidden})) + a + b$$

Let $M = \max(x, \max(\text{forbidden}))$.

Beyond position $M$:
1. There are **no forbidden spots** (since $M \ge \text{all forbidden positions}$).
2. You are already **past the target** $x$ (since $M \ge x$).

#### **Case 1: $a \ge b$ (Forward jump $\ge$ backward jump)**
- After any backward jump ($-b$), the bug **must** take a forward jump ($+a$).
- The net effect of a backward jump followed by a forward jump is $-b + a = a - b \ge 0$.
- Therefore, once you are past $M$, any attempt to step back towards $x$ will force a forward jump next, resulting in a net movement to the right ($\ge 0$). You can **never** move left overall back to $x$.
- The maximum single forward overshoot past $M$ is $M + a$. Taking one backward jump checks up to $M + a + b$.

#### **Case 2: $a < b$ (Forward jump $<$ backward jump)**
- Here, a backward jump followed by a forward jump gives a net leftward movement of $-b + a < 0$.
- However, since **there are no forbidden positions past $M$**, the space beyond $M$ is completely clear.
- If a valid path overshoots past $M + a + b$ and then uses $(-b + a)$ step-back cycles to reach $x$, **that exact same step-back sequence could have been performed at a lower position $\le M + a + b$**.
- Overshooting higher than $M + a + b$ adds extra unnecessary jumps without avoiding any obstacles.

Thus, $\max(x, \max(\text{forbidden})) + a + b$ is the absolute upper bound needed for search. Adding $1$ allows 0-indexed array access up to `maxSize - 1`.

---

## Complexity Analysis

- **Time Complexity:** O(maxSize) = O(max(x, max(forbidden)) + a + b). Each state $(x, \text{backFlag})$ is visited at most once.
- **Space Complexity:** O(maxSize) for the DP table / recursion stack.

---

## Code (Top-Down DP with Memoization)

```cpp
class Solution {
public:
    int maxSize = (int)1e5 + 1;

    int solve(int x, bool backFlag, int a, int b, int t, vector<vector<int>>& dp) {
        // Base cases
        if (x == t) return 0;
        if (x < 0 || x >= maxSize) return INT_MAX >> 1;

        if (dp[x][backFlag] != -1) return dp[x][backFlag];
        
        // Temporarily mark state to avoid infinite cycles
        dp[x][backFlag] = INT_MAX >> 1;

        return dp[x][backFlag] = min(
            1 + solve(x + a, false, a, b, t, dp),
            (!backFlag ? 1 + solve(x - b, true, a, b, t, dp) : INT_MAX >> 1)
        );
    }

    int minimumJumps(vector<int>& forbidden, int a, int b, int x) {
        maxSize = x + a + b;
        for (int i : forbidden) {
            maxSize = max(maxSize, i + a + b);
        }
        maxSize += 1;

        vector<vector<int>> dp(maxSize, vector<int>(2, -1));

        for (int i : forbidden) {
            dp[i][0] = INT_MAX >> 1;
            dp[i][1] = INT_MAX >> 1;
        }

        int ret = solve(0, false, a, b, x, dp);
        return ret >= INT_MAX >> 1 ? -1 : ret;
    }
};
```
