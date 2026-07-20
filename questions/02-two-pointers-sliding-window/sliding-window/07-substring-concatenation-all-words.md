# Substring with Concatenation of All Words

**Link:** https://leetcode.com/problems/substring-with-concatenation-of-all-words/

## Problem
Given a string s and an array of strings words (all of equal length), find all starting indices of substrings in s that are a concatenation of all words in any order. Each word must be used exactly the number of times it appears in words.

## Solution
Build a frequency map of the required words. For each starting offset from 0 to wordLen-1, use a sliding window of exactly (wordLen * numWords) characters, stepping by wordLen. At each step, check whether the current window's word frequencies match the required map. Use a deque or left pointer to shrink when an unknown word or excess word is encountered.

## Code
```cpp
vector<int> findSubstring(string s, vector<string>& words) {
    vector<int> result;
    if (s.empty() || words.empty()) return result;

    int wordLen = words[0].size(), numWords = words.size();
    int winLen = wordLen * numWords, n = s.size();
    unordered_map<string, int> need;
    for (auto& w : words) need[w]++;

    for (int i = 0; i < wordLen; i++) {
        unordered_map<string, int> have;
        int l = i, count = 0;
        for (int r = i; r + wordLen <= n; r += wordLen) {
            string w = s.substr(r, wordLen);
            if (need.count(w)) {
                have[w]++;
                count++;
                while (have[w] > need[w]) {
                    string lw = s.substr(l, wordLen);
                    have[lw]--;
                    count--;
                    l += wordLen;
                }
                if (count == numWords) result.push_back(l);
            } else {
                have.clear();
                count = 0;
                l = r + wordLen;
            }
        }
    }

    return result;
}
```
