# Longest Repeating Character Replacement

**Link:** https://leetcode.com/problems/longest-repeating-character-replacement/

## Problem
Given a string s and an integer k, you can replace at most k characters in the string with any letter. Return the length of the longest substring containing only one distinct character that you can achieve after at most k replacements.

## Solution
Use a sliding window tracking the frequency of each character and the max frequency seen so far (maxCount). The window is valid when (windowSize - maxCount) <= k, meaning we only need to replace the non-dominant characters. Crucially, never shrink maxCount — if a better window is impossible, just slide it forward without reducing maxCount, which avoids missing the optimal answer.

## Code
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> freqs(26,0);
        int res = 0, i = 0, maxFreq = 0;

        for (int j = 0; j < s.size(); j++) {
            freqs[s[j]-'A']++;
            maxFreq = max(maxFreq, freqs[s[j]-'A']);

            while ((j - i + 1) - maxFreq > k) {
                freqs[s[i]-'A']--;
                i++;
            }

            res = max(res, j - i + 1);
        }

        return res;
    }
};
```

