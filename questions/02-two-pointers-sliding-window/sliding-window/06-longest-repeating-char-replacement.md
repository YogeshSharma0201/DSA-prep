# Longest Repeating Character Replacement

**Link:** https://leetcode.com/problems/longest-repeating-character-replacement/

## Problem
Given a string s and an integer k, you can replace at most k characters in the string with any letter. Return the length of the longest substring containing only one distinct character that you can achieve after at most k replacements.

## Solution
Use a sliding window tracking the frequency of each character and the max frequency seen so far (maxCount). The window is valid when (windowSize - maxCount) <= k, meaning we only need to replace the non-dominant characters. Crucially, never shrink maxCount — if a better window is impossible, just slide it forward without reducing maxCount, which avoids missing the optimal answer.

## Code
```cpp
int characterReplacement(string s, int k) {
    int freq[26] = {};
    int maxCount = 0, l = 0, result = 0;

    for (int r = 0; r < s.size(); r++) {
        freq[s[r] - 'A']++;
        maxCount = max(maxCount, freq[s[r] - 'A']);

        while ((r - l + 1) - maxCount > k) {
            freq[s[l] - 'A']--;
            l++;
        }

        result = max(result, r - l + 1);
    }

    return result;
}
```
