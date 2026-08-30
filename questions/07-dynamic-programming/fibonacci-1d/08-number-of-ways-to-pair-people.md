# Number of Ways to Pair People (Friends Pairing Problem)

**Link:** [Number of ways to pair people - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/number-of-ways-to-pair-people/)

## Problem

Given $n$ people, each person can either remain single or be paired up with any other person. Each person can be paired only once. Find the total number of ways in which people can remain single or be paired up.

---

## Solution (1D Dynamic Programming)

### Intuition & Recurrence Relation
For the $n$-th person, there are two distinct choices:
1. **The $n$-th person remains single:** The problem reduces to finding the number of ways to pair the remaining $(n-1)$ people $\implies dp[n-1]$.
2. **The $n$-th person pairs up with another person:** There are $(n-1)$ choices for selecting a partner out of the remaining $(n-1)$ people. Once paired, the problem reduces to finding the number of ways to pair the remaining $(n-2)$ people $\implies (n-1) \times dp[n-2]$.

Combining both options yields the recurrence relation:
$$dp[n] = dp[n-1] + (n-1) \cdot dp[n-2]$$

### Base Cases
- `dp[1] = 1`: 1 person can only stay single.
- `dp[2] = 2`: 2 people can either both stay single `(1),(2)` or pair together `(1,2)`.

---

## Complexity Analysis

- **Time Complexity:** O(n) — Single loop from $3$ to $n$.
- **Space Complexity:** O(n) using a 1D vector (can be optimized to O(1) space using two variables).

---

## Code

```cpp
class WaysToPairPeople {
public:
    int solve(int n) {
        vector<int> dp(n + 1, 0);
        dp[1] = 1;
        dp[2] = 2;

        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + (i - 1) * dp[i - 2];
        }

        return dp[n];
    }
};
```
