# Matchsticks to Square

**Link:** https://leetcode.com/problems/matchsticks-to-square/

## Problem
You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i-th` matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

Return `true` if you can make this square and `false` otherwise.

---

## Solutions

### Approach 1: Top-Down DFS with Bitmask Memoization — O(N * 2^N) Time, O(2^N) Space
- **State:** `dfs(mask, currSum, side)`
  - `mask`: Bitmask representing used matchsticks.
  - `currSum`: Sum of matchsticks accumulated for the current active side.
  - `dp[mask]`: Memoizes whether remaining matchsticks defined by `mask` can complete the square.
- **Transitions:** Try placing each unused stick `i` such that `currSum + matchsticks[i] <= side`.
- Resets current side accumulator `(currSum + matchsticks[i]) % side` whenever a side is filled.

---

### Approach 2: Bottom-Up Iterative Bitmask DP — O(N * 2^N) Time, O(2^N) Space
- **`dp[mask]`:** Stores the accumulated remainder `sum % target` for the current side after using matchsticks indicated by `mask`.
- Initialize `dp[0] = 0` and all other states to `-1` (unreachable).
- Iterate mask `i` from `0` to `(1 << n) - 1`:
  - **Crucial Rule:** If `dp[i] == -1`, skip the mask (`continue`). Do **not** `return false`, as mask `i` might just be an invalid intermediate subset while other valid paths exist!
  - For each unused stick `j`, if `dp[i] + matchsticks[j] <= target`, set:
    $$\text{dp}[i \mid (1 \ll j)] = (\text{dp}[i] + \text{matchsticks}[j]) \bmod \text{target}$$
- Final Answer: `dp.back() == 0` (all matchsticks used and final side completed).

---

## Code

### Approach 1: Top-Down DFS + Bitmask Memoization

```cpp
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

### Approach 2: Bottom-Up Iterative Bitmask DP

```cpp
class Solution {
public:
    bool makesquare(vector<int>& match) {
        int n = match.size();
        int tot = accumulate(match.begin(), match.end(), 0);

        if (tot % 4 != 0) return false;
        int target = tot / 4;

        vector<int> dp(1 << n, -1);
        dp[0] = 0;

        for (int i = 0; i < (1 << n); i++) {
            if (dp[i] == -1) continue; // Skip unreachable subset states
            for (int j = 0; j < n; j++) {
                if (i & (1 << j)) continue; // Matchstick j already used
                if (dp[i] + match[j] > target) continue; // Exceeds current side
                
                dp[i | (1 << j)] = (dp[i] + match[j]) % target;
            }
        }

        return dp.back() == 0;
    }
};
```

