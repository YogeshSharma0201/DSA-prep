# Implement strStr()

**Link:** https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string

## Problem
Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.

## Solution
Use the KMP algorithm for O(n+m) time. Build the failure function (LPS array) for the needle, then use it to skip comparisons when a mismatch occurs during the search in haystack, avoiding redundant re-comparisons.

## Code
```cpp
int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    if (m == 0) return 0;
    vector<int> lps(m, 0);
    for (int i = 1, len = 0; i < m; ) {
        if (needle[i] == needle[len]) lps[i++] = ++len;
        else if (len) len = lps[len - 1];
        else lps[i++] = 0;
    }
    for (int i = 0, j = 0; i < n; ) {
        if (haystack[i] == needle[j]) { i++; j++; }
        if (j == m) return i - j;
        else if (i < n && haystack[i] != needle[j]) {
            if (j) j = lps[j - 1];
            else i++;
        }
    }
    return -1;
}
```
