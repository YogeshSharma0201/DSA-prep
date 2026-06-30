# Generate Parentheses

**Link:** https://leetcode.com/problems/generate-parentheses/

## Problem
Given n pairs of parentheses, generate all combinations of well-formed parentheses.

## Solution
Backtracking with two counters: `left` (open brackets placed) and `right` (close brackets placed). Two pruning rules keep the string valid at every step:
- `left > n`: placed too many open brackets
- `right > left`: a close bracket would be unmatched

When `right == n`, all n pairs are closed — add to result.

## Code
```cpp
class Solution {
    void solve(int left, int right, int n, string s, vector<string>& res) {
        if(left > n) return;
        if(right > left) return;

        if(right == n) {
            res.push_back(s);
            return;
        }

        solve(left+1, right, n, s+"(", res);
        solve(left, right+1, n, s+")", res);
    }

public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        solve(0, 0, n, "", res);
        return res;
    }
};
```
