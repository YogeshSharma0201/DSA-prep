# Minimum Insertion Steps to Make a String Palindrome

**Link:** https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/

## Problem
Given a string s, find the minimum number of characters to insert (at any position) so that the string becomes a palindrome. Each insertion adds exactly one character anywhere in the string. Return the minimum number of insertions required.

## Solution
The answer equals n minus the length of the Longest Common Subsequence (LCS) of s and its reverse. Characters already in the LCS form the palindromic core and need no insertions; each character not in the LCS requires one insertion. Compute LCS using standard bottom-up DP with a 1D rolling array.

## Code
```cpp
int minInsertions(string s) {
    int n = s.size();
    string rev = s;
    reverse(rev.begin(), rev.end());

    // LCS of s and reverse(s)
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        vector<int> curr(n + 1, 0);
        for (int j = 1; j <= n; j++) {
            if (s[i-1] == rev[j-1])
                curr[j] = dp[j-1] + 1;
            else
                curr[j] = max(dp[j], curr[j-1]);
        }
        dp = curr;
    }
    return n - dp[n];
}
```
