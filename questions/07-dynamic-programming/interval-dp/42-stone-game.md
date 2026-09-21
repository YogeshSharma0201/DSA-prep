# Stone Game

**Link:** [Stone Game - LeetCode](https://leetcode.com/problems/stone-game/)

## Problem Description

Alice and Bob play a game with piles of stones. There is an **even number** of piles $n$ arranged in a row, and each pile has a positive integer number of stones `piles[i]`.

The total number of stones across all piles is **odd**, so there are no ties.

Alice and Bob take turns, with **Alice going first**. Each turn, a player takes a pile of stones from either the beginning or the end of the row. The game ends when there are no more piles left.

The player with the most stones wins. Assuming both play optimally, return `true` if Alice wins, or `false` if Bob wins.

---

## Solution 1: Top-Down Recursion with Memoization (2D DP)

### Approach
We track Alice's total score. At state `(l, r)`:
- If `(l + r) % 2 == 1` (length is even), it is **Alice's turn**. Alice wants to **maximize** her total score.
- If `(l + r) % 2 == 0` (length is odd), it is **Bob's turn**. Bob wants to **minimize** Alice's final score (as Bob getting stones means Alice gets 0 from that pile).

### Code
```cpp
class Solution {
public:
    int solve(int l, int r, vector<int>& piles, vector<vector<int>>& dp) {
        if (l > r) return 0;
        if (dp[l][r] != -1) return dp[l][r];

        bool isAlice = ((l + r) % 2 == 1);

        if (isAlice) {
            return dp[l][r] = max(piles[l] + solve(l + 1, r, piles, dp),
                                  piles[r] + solve(l, r - 1, piles, dp));
        } else {
            return dp[l][r] = min(solve(l + 1, r, piles, dp),
                                  solve(l, r - 1, piles, dp));
        }
    }

    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        int totalStones = accumulate(piles.begin(), piles.end(), 0);
        vector<vector<int>> dp(n, vector<int>(n, -1));

        int maxAliceScore = solve(0, n - 1, piles, dp);
        return maxAliceScore > totalStones / 2;
    }
};
```

- **Time Complexity:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(n^2)$ for memoization table and recursion stack.

---

## Solution 2: Bottom-Up Iterative DP (1D Space Optimized - User's Approach)

### Approach
We optimize the 2D DP space down to 1D array `dp[l]` representing the maximum score Alice can get from subarray starting at index `l` with interval length `i + 1`.

When iterating over interval length `i` from `1` to `n - 1`:
- `dp[l]` holds the subproblem answer for `[l ... l + i - 1]` (length $i$).
- `dp[l + 1]` holds the subproblem answer for `[l + 1 ... l + i]` (length $i$).
- Updating `dp[l]` in forward order allows us to reuse memory safely.

### Cleaned Code
```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        int totalStones = accumulate(piles.begin(), piles.end(), 0);

        vector<int> dp(n, 0); // Base case for len 1 (Bob's turn, Alice gets 0)

        for (int i = 1; i < n; i++) { // i represents subproblem length offset
            for (int l = 0; l < n - i; l++) {
                int r = l + i;
                bool isAlice = (i % 2 == 1);

                if (isAlice) {
                    dp[l] = max(piles[l] + dp[l + 1], piles[r] + dp[l]);
                } else {
                    dp[l] = min(dp[l + 1], dp[l]);
                }
            }
        }

        return dp[0] > totalStones / 2;
    }
};
```

- **Time Complexity:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(n)$

---

## Solution 3: Minimax Score Difference DP (Cleanest DP Formulation)

### Approach
Instead of tracking absolute scores and explicitly handling turn parity, we track the **relative score difference** $\text{dp}[l][r] = (\text{Current Player Score} - \text{Opponent Score})$ for subarray `piles[l...r]`.

- At any subproblem `piles[l...r]`:
  - If current player picks `piles[l]`, net gain is $\text{piles}[l] - \text{dp}[l+1][r]$.
  - If current player picks `piles[r]`, net gain is $\text{piles}[r] - \text{dp}[l][r-1]$.
  - Dynamic Programming transition:
    $$\text{dp}[l][r] = \max(\text{piles}[l] - \text{dp}[l+1][r], \; \text{piles}[r] - \text{dp}[l][r-1])$$
- If final net gain $\text{dp}[0][n-1] > 0$, Alice wins!

### 1D Space-Optimized Minimax Code
```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<int> dp = piles; // Base case: interval of length 1

        for (int i = 1; i < n; i++) {
            for (int l = 0; l < n - i; l++) {
                int r = l + i;
                dp[l] = max(piles[l] - dp[l + 1], piles[r] - dp[l]);
            }
        }

        return dp[0] > 0;
    }
};
```

- **Time Complexity:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(n)$

---

## Solution 4: Mathematical Strategy / Game Theory ($\mathcal{O}(1)$ Optimal)

### Mathematical Proof
1. $n$ is always **even**, meaning the piles can be split into two equal-sized sets by index parity:
   - Even-indexed piles: `piles[0], piles[2], piles[4], ...`
   - Odd-indexed piles: `piles[1], piles[3], piles[5], ...`
2. Total stones is **odd**, so $\sum \text{even} \neq \sum \text{odd}$. One of these two sums must be strictly greater than the other.
3. Alice goes first and can choose to take **all even-indexed piles** or **all odd-indexed piles**:
   - If Alice picks `piles[0]` (even), the remaining choices for Bob are `piles[1]` and `piles[n-1]` — both are **odd** indices!
   - Whichever odd index Bob takes, Alice is again presented with two **even** index options.
4. Alice calculates $\sum \text{even}$ and $\sum \text{odd}$ beforehand and chooses the strategy with the higher sum.
5. Therefore, **Alice is guaranteed to win every game**.

### Code
```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        return true;
    }
};
```

- **Time Complexity:** $\mathcal{O}(1)$
- **Space Complexity:** $\mathcal{O}(1)$
