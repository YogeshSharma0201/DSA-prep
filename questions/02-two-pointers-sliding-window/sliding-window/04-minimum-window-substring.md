# Minimum Window Substring

**Link:** https://leetcode.com/problems/minimum-window-substring/

## Problem
Given strings s and t, return the minimum window substring of s that contains every character of t (including duplicates). If no such window exists, return an empty string. The answer is guaranteed to be unique.

## Solution
Use two frequency maps: one for required characters in t, one for the current window. Expand the right pointer to include characters; when all required characters are satisfied (formed == required), shrink from the left to minimize the window, updating the answer. Decrement formed when shrinking removes a needed character.

## Code
```cpp
string minWindow(string s, string t) {
    unordered_map<char, int> need, have;
    for (char c : t) need[c]++;

    int required = need.size(), formed = 0;
    int l = 0, minLen = INT_MAX, minL = 0;

    for (int r = 0; r < s.size(); r++) {
        char c = s[r];
        have[c]++;
        if (need.count(c) && have[c] == need[c])
            formed++;

        while (formed == required) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                minL = l;
            }
            char lc = s[l++];
            have[lc]--;
            if (need.count(lc) && have[lc] < need[lc])
                formed--;
        }
    }

    return minLen == INT_MAX ? "" : s.substr(minL, minLen);
}
```
