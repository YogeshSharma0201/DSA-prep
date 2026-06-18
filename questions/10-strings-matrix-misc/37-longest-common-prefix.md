# Longest Common Prefix

**Link:** https://leetcode.com/problems/longest-common-prefix

## Problem
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

## Solution
Take the first string as the initial prefix. For each subsequent string, shrink the prefix from the right until it matches the beginning of that string. Return what remains.

## Code
```cpp
string longestCommonPrefix(vector<string>& strs) {
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0)
            prefix = prefix.substr(0, prefix.size() - 1);
        if (prefix.empty()) return "";
    }
    return prefix;
}
```
