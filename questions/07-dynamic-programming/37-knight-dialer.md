# Knight Dialer

**Link:** https://leetcode.com/problems/knight-dialer/

## Problem
A knight on a phone keypad (digits 0-9 arranged like a phone pad) makes exactly n-1 moves following chess knight movement rules. Count how many distinct phone numbers of length n can be dialed, starting from any digit. Return the answer modulo 10^9 + 7.

## Solution
DP where dp[digit] = number of ways to be on that digit after the current step. Precompute valid knight moves from each digit (e.g., from 1: can reach 6 and 8). At each of n-1 steps, update next[dest] += dp[src] for each valid move. Initialize all dp[0..9] = 1 (any starting digit). Sum all dp values after n-1 steps.

## Code
```cpp
int knightDialer(int n) {
    const int MOD = 1e9 + 7;
    vector<vector<int>> moves = {
        {4, 6},    // 0
        {6, 8},    // 1
        {7, 9},    // 2
        {4, 8},    // 3
        {0, 3, 9}, // 4
        {},        // 5
        {0, 1, 7}, // 6
        {2, 6},    // 7
        {1, 3},    // 8
        {2, 4}     // 9
    };

    vector<long long> dp(10, 1);
    for (int step = 1; step < n; step++) {
        vector<long long> next(10, 0);
        for (int digit = 0; digit <= 9; digit++) {
            for (int dest : moves[digit]) {
                next[dest] = (next[dest] + dp[digit]) % MOD;
            }
        }
        dp = next;
    }

    long long ans = 0;
    for (int d = 0; d <= 9; d++) ans = (ans + dp[d]) % MOD;
    return ans;
}
```
