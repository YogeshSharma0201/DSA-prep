# Palindrome Partitioning

**Link:** https://leetcode.com/problems/palindrome-partitioning/

## Problem
Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.

## Solution
Precompute all palindrome substrings using DP (a 2D table `lps` where `lps[i][j]` is true if `s[i..j]` is a palindrome). Then use DFS backtracking to explore every valid partition — at each index `idx`, try all end indices `i` where `s[idx..i]` is a palindrome, recurse on the remainder, and backtrack.

## Code
```cpp
class Solution {
public:
    void dfs(string s, int idx, vector<string>& path, vector<vector<string>>& res, vector<vector<bool>>& lps) {
        if(idx == s.size()) {
            res.push_back(path);
            return;
        }

        for(int i=idx; i<s.size(); i++) {
            if(lps[idx][i]) {
                path.push_back(s.substr(idx, i-idx+1));
                dfs(s, i+1, path, res, lps);
                path.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        int n = s.size();

        vector<vector<string>> res;
        vector<vector<bool>> lps(n, vector<bool>(n, false));

        for(int i=0; i<n; i++) {
            for(int j=0; j+i<n; j++) {
                if(i==0) lps[j][j] = true;
                else if(s[j] == s[j+i]) {
                    lps[j][j+i] = (j+i>j+1 ? lps[j+1][j+i-1] : true);
                }
            }
        }

        vector<string> path;
        dfs(s, 0, path, res, lps);

        return res;
    }
};
```
