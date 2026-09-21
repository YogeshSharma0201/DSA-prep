# Stone Game II

**Link:** [Stone Game II - LeetCode](https://leetcode.com/problems/stone-game-ii/)

## Problem Description

Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row, where `piles[i]` is the number of stones in the $i$-th pile.

Alice and Bob take turns, with **Alice going first**. Initially, $M = 1$.

On each player's turn, that player can take **all the stones** in the first $X$ remaining piles, where $1 \le X \le 2M$. Then we set $M = \max(M, X)$.

The game continues until all the stones have been taken. Assuming both Alice and Bob play optimally, return the **maximum number of stones Alice can get**.

---

## Solution 1: Initial Top-Down Recursion with Memoization (3D DP - User's Approach)

### Approach
We track the state using `(p, M, idx)`:
- `p`: Turn indicator (`p = 0` for Alice, `p = 1` for Bob).
- `M`: Current multiplier parameter determining max allowed piles to take ($1 \le X \le 2M$).
- `idx`: Current starting index in `piles`.
- `dp[M][idx][p]`: Memoization table.

At Alice's turn (`p == 0`), she wants to **maximize** her score.
At Bob's turn (`p == 1`), he wants to **minimize** Alice's score (which maximizes Bob's score).

### Code
```cpp
class Solution {
public:
    int solve(int p, int M, int idx, vector<int>& piles, vector<vector<vector<int>>>& dp) {
        if(idx >= piles.size()) return 0;
        
        if(dp[M][idx][p] != -1) return dp[M][idx][p];

        int X = 2*M;
        int sum = 0, maxV = p==0 ? 0 : INT_MAX>>1;
        for(int i=idx; i<piles.size() && i<idx+X; i++) {
            sum += piles[i];
            if(p==0) { // Alice turn: maximize
                maxV = max(sum + solve(p^1, max(M, i-idx+1), i+1, piles, dp), maxV);
            }
            else { // Bob turn: minimize Alice's total
                maxV = min(solve(p^1, max(M, i-idx+1), i+1, piles, dp), maxV);
            }
        }

        return dp[M][idx][p] = maxV;
    }

    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<vector<vector<int>>> dp(n+2, vector<vector<int>>(n+1, vector<int>(2, -1)));
        return solve(0, 1, 0, piles, dp);
    }
};

/*
Base cases & recurrence notes:
- idx == piles.size() -> return 0
- solve(p, M, idx) -> returns Alice's total stones
- If Alice turn: max over X (sum + solve(p^1, max(M, X), idx+X))
- If Bob turn: min over X (solve(p^1, max(M, X), idx+X))
State Space: ~ O(n^2) states, each loop up to 2M -> Time O(n^3)
*/
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n^3)$ — There are $\mathcal{O}(n^2)$ states, and for each state, we iterate up to $2M$ times ($X \in [1, 2M]$).
- **Space Complexity:** $\mathcal{O}(n^2)$ — For the 3D DP memoization table of size $(n+2) \times (n+1) \times 2$.

---

## Solution 2: Optimized 2D Top-Down DP (Suffix Sums + Minimax State Reduction + Early Pruning)

### Key Insights & Optimizations

1. **Eliminating the Turn Parameter (`p`):**
   Instead of tracking whose turn it is (`p = 0` vs `p = 1`) and alternating between `max` and `min`, we can define `dp[i][M]` as:
   $$\text{dp}[i][M] = \text{Maximum stones the CURRENT player can get from index } i \text{ onwards with parameter } M.$$

2. **Suffix Sum Transformation:**
   Let $\text{suffixSum}[i]$ be the sum of all stones from index $i$ to $n - 1$.
   If the current player takes $X$ piles (getting stones from $i$ to $i + X - 1$), the remaining stones available for the opponent are $\text{suffixSum}[i + X]$.
   The opponent will optimally obtain $\text{dp}[i + X][\max(M, X)]$ stones.
   Therefore, the current player receives:
   $$\text{Current Player Score} = \text{suffixSum}[i] - \text{dp}[i + X][\max(M, X)]$$

   The transition becomes:
   $$\text{dp}[i][M] = \max_{1 \le X \le 2M} \left( \text{suffixSum}[i] - \text{dp}[i + X][\max(M, X)] \right)$$

3. **Early Pruning Optimization:**
   If $i + 2M \ge n$, the current player can take **all remaining piles** in one move ($X = n - i \le 2M$).
   Since all stone quantities are non-negative, taking all remaining piles guarantees the maximum possible stones for that state:
   $$\text{If } i + 2M \ge n \implies \text{dp}[i][M] = \text{suffixSum}[i]$$

### Optimized Code (Top-Down)
```cpp
class Solution {
public:
    int solve(int i, int M, vector<int>& piles, vector<int>& suffixSum, vector<vector<int>>& memo) {
        int n = piles.size();
        if (i >= n) return 0;
        
        // Pruning: If current player can take all remaining stones, take them all!
        if (i + 2 * M >= n) return suffixSum[i];

        if (memo[i][M] != -1) return memo[i][M];

        int maxStones = 0;
        for (int X = 1; X <= 2 * M; X++) {
            // Current player's score = total remaining stones - optimal score of opponent
            int stones = suffixSum[i] - solve(i + X, max(M, X), piles, suffixSum, memo);
            maxStones = max(maxStones, stones);
        }

        return memo[i][M] = maxStones;
    }

    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<int> suffixSum(n, 0);
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + piles[i];
        }

        vector<vector<int>> memo(n, vector<int>(n + 1, -1));
        return solve(0, 1, piles, suffixSum, memo);
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n^3)$ worst-case, but practically much faster due to $i + 2M \ge n$ early pruning.
- **Space Complexity:** $\mathcal{O}(n^2)$ for the 2D memo table and recursion stack.

---

## Solution 3: Optimized 2D Bottom-Up DP (Iterative Tabulation)

### Approach
We fill the 2D DP table iteratively in reverse order:
- `i` goes from $n - 1$ down to $0$.
- `M` goes from $n$ down to $1$.

### Code
```cpp
class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<int> suffixSum(n, 0);
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + piles[i];
        }

        // dp[i][M] = max stones current player can get from index i with parameter M
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                if (i + 2 * M >= n) {
                    dp[i][M] = suffixSum[i];
                } else {
                    for (int X = 1; X <= 2 * M; X++) {
                        dp[i][M] = max(dp[i][M], suffixSum[i] - dp[i + X][max(M, X)]);
                    }
                }
            }
        }

        return dp[0][1];
    }
};
```

### Complexity
- **Time Complexity:** $\mathcal{O}(n^3)$
- **Space Complexity:** $\mathcal{O}(n^2)$ — Can be further space-optimized if needed, but $\mathcal{O}(n^2)$ easily passes memory limits for $n \le 100$.

---

## Comparison of Approaches

| Approach | DP Table Size | Logic / Mechanics | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Solution 1 (User's)** | 3D `[M][idx][p]` | Explicit `p` turn flag, alternating `max`/`min` | $\mathcal{O}(n^3)$ | $\mathcal{O}(n^2)$ |
| **Solution 2 (Top-Down)** | 2D `[i][M]` | Suffix sums + Minimax (`suffix - dp[i+X]`) + Early Pruning | $\mathcal{O}(n^3)$ (Fast) | $\mathcal{O}(n^2)$ |
| **Solution 3 (Bottom-Up)** | 2D `[i][M]` | Iterative tabulation, no recursion stack | $\mathcal{O}(n^3)$ | $\mathcal{O}(n^2)$ |
