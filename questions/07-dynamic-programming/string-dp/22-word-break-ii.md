# Word Break II

**Link:** https://leetcode.com/problems/word-break-ii/

## Problem
Given a string s and a dictionary of words, return all possible sentences formed by inserting spaces into s such that each word is a valid dictionary word. Unlike Word Break I, you must return all valid segmentations, not just whether one exists.

## Solution
Bottom-up DP where `dp[i]` holds all sentences buildable from `s[i..]`. Start from the end with `dp[n] = {""}`, then for each index scan all words: if the word matches at position `i`, append it (with a space) to each sentence in `dp[i + word.size()]` and store in `dp[i]`. Return `dp[0]`.

## Code
```cpp
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        int strsize = s.size();
        int n = wordDict.size();

        vector<vector<string>> dp(strsize+1, vector<string>());

        dp[strsize] = {""};

        for(int i=strsize-1; i>=0; i--) {
            for(int j=0; j<n; j++) {
                if(strsize >= i+wordDict[j].size()) {
                    if(s.substr(i, wordDict[j].size()) == wordDict[j]) {
                        
                        vector<string> res = dp[i+wordDict[j].size()];
                        for(int k=0; k<res.size(); k++) {
                            dp[i].push_back(res[k] == "" ? wordDict[j] : wordDict[j] + " " + res[k]);
                        }
                    }
                }
            }
        }

        return dp[0];
    }
};
```
