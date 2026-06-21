# Minimum Difficulty of a Job Schedule

**Link:** https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/

## Problem
You have n jobs that must be completed in order over d days. Each day you must do at least one job; jobs are done in sequence and cannot be reordered. The difficulty of a day is the maximum job difficulty that day. Return the minimum total difficulty across all days, or -1 if scheduling is impossible.

## Solution
DP where dp[day][i] = minimum total difficulty to schedule the first i jobs in exactly `day` days. For each day and each ending job index i, try all possible starting positions j for the last day's work. Track the running maximum of jobs[j..i] as you extend backwards. Return dp[d][n] or -1 if n < d.

## Code
```cpp
int minDifficulty(vector<int>& jobDifficulty, int d) {
    int n = jobDifficulty.size();
    if (n < d) return -1;

    const int INF = 1e9;
    // dp[i][j] = min difficulty using first j jobs in i days
    vector<vector<int>> dp(d + 1, vector<int>(n + 1, INF));
    dp[0][0] = 0;

    for (int day = 1; day <= d; day++) {
        for (int i = day; i <= n; i++) {
            int maxD = 0;
            // last day covers jobs [j-1 .. i-1], try all splits
            for (int j = i; j >= day; j--) {
                maxD = max(maxD, jobDifficulty[j - 1]);
                if (dp[day - 1][j - 1] != INF)
                    dp[day][i] = min(dp[day][i], dp[day - 1][j - 1] + maxD);
            }
        }
    }
    return dp[d][n] == INF ? -1 : dp[d][n];
}
```
