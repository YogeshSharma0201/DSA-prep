# Valid Anagram (Check for Anagram)

**Link:** https://leetcode.com/problems/valid-anagram

## Problem
Given two strings `s` and `t`, return true if `t` is an anagram of `s` and false otherwise. An anagram uses all the characters of the original string exactly once.

## Solution
Count character frequencies of both strings using an array of size 26. Increment for characters in `s`, decrement for characters in `t`. If all counts are zero at the end, the strings are anagrams.

## Code
```cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int count[26] = {0};
    for (int i = 0; i < s.size(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count)
        if (c != 0) return false;
    return true;
}
```
