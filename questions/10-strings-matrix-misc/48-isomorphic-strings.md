# Isomorphic Strings

**Link:** https://leetcode.com/problems/isomorphic-strings

## Problem
Given two strings `s` and `t`, determine if they are isomorphic. Two strings are isomorphic if characters in `s` can be replaced to get `t`, with each unique character mapping to exactly one unique character (no two characters map to the same character).

## Solution
Maintain two maps: one from s to t characters and one from t to s characters. For each position, check if the current mapping is consistent. If s[i] maps to a different t[i] or vice versa, return false.

## Code
```cpp
bool isIsomorphic(string s, string t) {
    unordered_map<char, char> sToT, tToS;
    for (int i = 0; i < s.size(); i++) {
        if (sToT.count(s[i]) && sToT[s[i]] != t[i]) return false;
        if (tToS.count(t[i]) && tToS[t[i]] != s[i]) return false;
        sToT[s[i]] = t[i];
        tToS[t[i]] = s[i];
    }
    return true;
}
```
