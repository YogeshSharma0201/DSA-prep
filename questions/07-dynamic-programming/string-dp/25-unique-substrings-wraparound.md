# Unique Substrings in Wraparound String

**Link:** https://leetcode.com/problems/unique-substrings-in-wraparound-string/

## Problem
Consider the infinite wraparound string "...abcdefghijklmnopqrstuvwxyzabcdefg...". Given a string p, return the number of unique non-empty substrings of p that are also substrings of this infinite wraparound string. Duplicates in p count only once.

## Solution
A valid substring must be consecutive characters in the alphabet (with z wrapping to a). Use DP where dp[c] = maximum length of a valid substring ending at character c found so far in p. If p[i] follows p[i-1] in wraparound order, extend the current run length; otherwise reset to 1. Update dp[p[i]] = max(dp[p[i]], currentLength). The answer is the sum of all dp values, as each dp[c] counts unique substrings ending at c.

## Code
```cpp
int findSubstringInWraproundString(string p) {
    vector<int> dp(26, 0);
    int currLen = 0;

    for (int i = 0; i < (int)p.size(); i++) {
        if (i > 0 && (p[i] - p[i-1] + 26) % 26 == 1) {
            currLen++;
        } else {
            currLen = 1;
        }
        int c = p[i] - 'a';
        dp[c] = max(dp[c], currLen);
    }

    return accumulate(dp.begin(), dp.end(), 0);
}
```
