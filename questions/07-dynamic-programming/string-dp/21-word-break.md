# Word Break

**Link:** https://leetcode.com/problems/word-break/

## Problem
Given a string s and a dictionary of words, determine if s can be segmented into a space-separated sequence of one or more dictionary words. Each dictionary word may be reused multiple times. Return true if such a segmentation is possible.

## Solution
DP scanning from right to left where dp[i] = true if the substring s[i..end] can be segmented using dictionary words. For each index i, iterate over all words and check if s[i..i+word.size()] matches that word; if so, dp[i] = dp[i + word.size()]. Base case: dp[s.size()] = true. Return dp[0].

## Code
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        vector<bool> dp(s.size()+1, 0);

        for(int i=s.size()-1; i >= 0; i--) {
            for(int j=0; j<wordDict.size(); j++) {
                if(s.size() >= i + wordDict[j].size()) {
                    if(s.substr(i, wordDict[j].size()) == wordDict[j]) {
                        if(i + wordDict[j].size() == s.size()) {
                            dp[i] = true;
                        }
                        else {
                            dp[i] = dp[i + wordDict[j].size()];
                        }
                    }
                }
                if(dp[i]) break;
            }
        }

        return dp[0];
    }
};
```
