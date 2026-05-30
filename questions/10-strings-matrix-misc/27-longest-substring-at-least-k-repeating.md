# Longest Substring with At Least K Repeating Characters

**Link:** https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/

## Problem
Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k. Any character that appears fewer than k times cannot be part of a valid substring.

## Solution
Recursively divide and conquer: count character frequencies in the current substring range. Any character with frequency < k acts as a mandatory split point (it can't appear in any valid answer). Recursively find the max result from all resulting sub-ranges. If all characters meet the threshold, return the full length.

## Code
```cpp
class Solution {
public:
    int longestSubstring(string s, int k) {
        return helper(s, 0, s.size(), k);
    }

private:
    int helper(const string& s, int l, int r, int k) {
        if (r - l < k) return 0;  // substring too short

        // Count frequencies in current substring
        vector<int> freq(26, 0);
        for (int i = l; i < r; i++) {
            freq[s[i] - 'a']++;
        }

        // Find split points
        for (int i = l; i < r; i++) {
            if (freq[s[i] - 'a'] < k) {
                int j = i + 1;
                while (j < r && freq[s[j] - 'a'] < k) j++;
                // Split at [l, i) and [j, r)
                return max(helper(s, l, i, k), helper(s, j, r, k));
            }
        }

        // All chars appear >= k times
        return r - l;
    }
};
```
