# Matchsticks to Square

**Link:** https://leetcode.com/problems/matchsticks-to-square/

## Problem
You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i-th` matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

Return `true` if you can make this square and `false` otherwise.

---

## Solution (Backtracking + Bitmask Memoization)

> **Note:** This problem is equivalent to partitioning an array into $k = 4$ subsets with equal sum (`totalSum / 4`), similar to *Partition to K Equal Sum Subsets* (LeetCode 698).

### Approach
1. **Total Sum & Side Check**:
   - Calculate total length of all matchsticks: `total = accumulate(matchsticks)`.
   - If `total % 4 != 0`, we cannot form a square, return `false`.
   - The required side length of each of the 4 sides is `side = total / 4`.
2. **State Representation**:
   - `mask`: An integer where the $i$-th bit is `1` if `matchsticks[i]` has been used, and `0` otherwise.
   - `currSum`: The sum of matchsticks placed on the currently active side.
   - `dp[mask]`: Memoizes whether the remaining unplaced matchsticks defined by `mask` can successfully form the remaining square sides.
3. **Transitions**:
   - Try placing any unused matchstick `i` (`!(mask & (1 << i))`) such that `currSum + matchsticks[i] <= side`.
   - The next side sum becomes `(currSum + matchsticks[i]) % side` (resets to 0 whenever a side of length `side` is completed).
   - If all matchsticks are used (`mask == (1 << n) - 1`), return `true`.

### Complexity
- **Time Complexity:** $\mathcal{O}(n \cdot 2^n)$ — There are $2^n$ unique bitmask states and from each state we try up to $n$ transitions.
- **Space Complexity:** $\mathcal{O}(2^n)$ — Memoization table `dp` of size $2^n$ plus recursion stack $\mathcal{O}(n)$.

---

## Code

```cpp
#include <vector>
#include <numeric>

using namespace std;

class Solution {
public:
    bool dfs(int mask, int currSum, int groupTarget, vector<int>& matchsticks, vector<int>& dp) {
        int n = matchsticks.size();
        if (mask == (1 << n) - 1) return true;

        if (dp[mask] != -1) return dp[mask]; 

        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) == 0 && currSum + matchsticks[i] <= groupTarget) {
                if (dfs(mask | (1 << i), 
                        (currSum + matchsticks[i]) % groupTarget, 
                        groupTarget, 
                        matchsticks, 
                        dp)) {
                    return dp[mask] = true;
                }
            }
        }

        return dp[mask] = false;
    }

    bool makesquare(vector<int>& matchsticks) {
        int total = accumulate(matchsticks.begin(), matchsticks.end(), 0);

        if (total % 4 != 0) return false;
        int side = total / 4;

        vector<int> dp(1 << matchsticks.size(), -1);

        return dfs(0, 0, side, matchsticks, dp);
    }
};
```
