# Word Break II

**Link:** https://leetcode.com/problems/word-break-ii/

## Problem
Given a string s and a dictionary of words, return all possible sentences formed by inserting spaces into s such that each word is a valid dictionary word. Unlike Word Break I, you must return all valid segmentations, not just whether one exists.

## Solution
DFS with memoization starting from each index. At each start position, try every word in the dictionary; if the word matches at the current position, recurse on the remainder of the string. Cache the list of sentences achievable from each start index using an unordered_map to avoid recomputation.

## Code
```cpp
class Solution {
    unordered_map<int, vector<string>> memo;

    vector<string> dfs(const string& s, const vector<string>& wordDict, int start) {
        if (memo.count(start)) return memo[start];
        vector<string> res;
        if (start == (int)s.size()) {
            res.push_back("");
            return res;
        }
        for (const string& word : wordDict) {
            int len = word.size();
            if (start + len <= (int)s.size() && s.substr(start, len) == word) {
                auto rest = dfs(s, wordDict, start + len);
                for (const string& r : rest) {
                    res.push_back(r.empty() ? word : word + " " + r);
                }
            }
        }
        return memo[start] = res;
    }

public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        return dfs(s, wordDict, 0);
    }
};
```
