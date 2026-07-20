# Longest Substring Without Repeating Characters

**Link:** https://leetcode.com/problems/longest-substring-without-repeating-characters

## Problem
Given a string s, find the length of the longest substring that contains no repeating characters. A substring is a contiguous sequence of characters within the string.

## Solution
Use a sliding window with an array (or hashmap) tracking the last seen index of each character. For each character at index j, if it was seen before, move the left pointer i to max(last_seen + 1, i) to exclude the duplicate. Update the max length as j - i + 1 at each step.

## Code
```cpp
int lengthOfLongestSubstring(string s) {
    int arr[255];
    memset(arr, -1, sizeof arr);

    int maxlen = 0, i = 0;
    for (int j = 0; j < s.size(); j++) {
        if (arr[s[j]] != -1) {
            i = max(arr[s[j]] + 1, i);
        }

        arr[s[j]] = j;
        maxlen = max(maxlen, j - i + 1);
    }

    return maxlen;
}
```
