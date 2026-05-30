# Longest Palindromic Substring

**Link:** https://leetcode.com/problems/longest-palindromic-substring

## Problem
Given a string s, find and return the longest substring that is a palindrome. A palindrome reads the same forwards and backwards. If there are multiple answers of the same length, return any one of them.

## Solution
Expand around center: for each index, treat it as the center of an odd-length palindrome and also treat the gap between it and the next character as the center of an even-length palindrome. Expand outward while characters match, record the length. Track start and end indices of the longest palindrome found. This runs in O(n^2) time and O(1) space.

## Code
```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";

        int start = 0, end = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            int odd  = expandAroundCenter(s, i, i);
            int even = expandAroundCenter(s, i, i + 1);
            int max_len = max(odd, even);

            if (max_len > end - start) {
                start = i - (max_len - 1) / 2;
                end   = i + max_len / 2;
            }
        }

        return s.substr(start, end - start + 1);
    }

private:
    int expandAroundCenter(string s, int left, int right) {
        while (left >= 0 && right < (int)s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};
```
