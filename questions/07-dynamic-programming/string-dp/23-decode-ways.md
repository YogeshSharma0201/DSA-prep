# Decode Ways

**Link:** https://leetcode.com/problems/decode-ways/

## Problem
A message containing letters A-Z can be encoded as numbers where A=1, B=2, ..., Z=26. Given a string of digits, return the number of ways to decode it. '0' cannot stand alone; "06" is not valid.

## Solution
DP where `dp[i]` = number of ways to decode the first i characters. At each position, check: (1) if the single digit s[i-1] is valid (1-9), add dp[i-1]; (2) if the two-digit number s[i-2..i-1] is valid (10-26), add dp[i-2].

## Code
```cpp
int numDecodings(string s) {
    int n = s.size();
    vector<int> dp(n+1, 0);
    dp[0] = 1;
    dp[1] = s[0] != '0' ? 1 : 0;
    for (int i = 2; i <= n; i++) {
        int one = s[i-1] - '0';
        int two = stoi(s.substr(i-2, 2));
        if (one >= 1) dp[i] += dp[i-1];
        if (two >= 10 && two <= 26) dp[i] += dp[i-2];
    }
    return dp[n];
}
```
