# Longest Prefix Suffix (KMP Failure Function)

**Link:** https://www.geeksforgeeks.org/problems/longest-prefix-suffix2527/1

## Problem
Given a string, find the length of the longest proper prefix which is also a suffix. A proper prefix is not equal to the string itself. This is the LPS (Longest Prefix Suffix) array used in KMP algorithm.

## Solution
Build the LPS array iteratively. Maintain a pointer `len` for the length of the current matching prefix. For each character, extend the match or fall back using the LPS value. The last value in the LPS array gives the answer.

## Code
```cpp
int longestPrefixSuffix(string s) {
    int n = s.size();
    vector<int> lps(n, 0);
    int len = 0, i = 1;
    while (i < n) {
        if (s[i] == s[len]) {
            lps[i++] = ++len;
        } else if (len) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps[n - 1];
}
```
