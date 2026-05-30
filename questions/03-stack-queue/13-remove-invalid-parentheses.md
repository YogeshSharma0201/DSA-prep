# Remove Invalid Parentheses

**Link:** https://leetcode.com/problems/remove-invalid-parentheses

## Problem
Given a string s containing parentheses and letters, remove the minimum number of invalid parentheses to make the string valid. Return all possible results in any order. The answer must include all unique strings achievable with the minimum number of removals.

## Solution
First calculate the minimum removals needed: scan left to right counting unmatched ')' (increment on ')', decrement on '(' if open > 0, otherwise it is an unmatched ')'). Then DFS/backtracking: at each position try keeping or skipping a parenthesis. Prune by tracking remaining allowed removals for '(' and ')'. Use a set to avoid duplicates in results.

## Code
```cpp
vector<string> removeInvalidParentheses(string s) {
    int leftRem = 0, rightRem = 0;
    for (char c : s) {
        if (c == '(') leftRem++;
        else if (c == ')') {
            if (leftRem > 0) leftRem--;
            else rightRem++;
        }
    }

    set<string> result;
    function<void(int, int, int, string)> dfs = [&](int idx, int open, int lRem, string cur) {
        if (idx == s.size()) {
            if (open == 0) result.insert(cur);
            return;
        }
        char c = s[idx];
        if (c == '(' && lRem > 0)
            dfs(idx + 1, open, lRem - 1, cur);
        if (c == ')' && rightRem - (/* initial */0) >= 0) {
            // handled below
        }
        // keep the character
        if (c == '(') dfs(idx + 1, open + 1, lRem, cur + c);
        else if (c == ')') {
            if (open > 0) dfs(idx + 1, open - 1, lRem, cur + c);
            // skip ')'
            if (lRem == leftRem) dfs(idx + 1, open, lRem, cur); // placeholder
        } else {
            dfs(idx + 1, open, lRem, cur + c);
        }
    };

    // Clean BFS approach
    result.clear();
    queue<string> q;
    unordered_set<string> visited;
    q.push(s);
    visited.insert(s);
    bool found = false;
    while (!q.empty()) {
        string cur = q.front(); q.pop();
        if (isValid(cur)) { result.insert(cur); found = true; }
        if (found) continue;
        for (int i = 0; i < cur.size(); i++) {
            if (cur[i] != '(' && cur[i] != ')') continue;
            string next = cur.substr(0, i) + cur.substr(i + 1);
            if (!visited.count(next)) { visited.insert(next); q.push(next); }
        }
    }
    return vector<string>(result.begin(), result.end());
}

bool isValid(const string& s) {
    int cnt = 0;
    for (char c : s) {
        if (c == '(') cnt++;
        else if (c == ')') { if (--cnt < 0) return false; }
    }
    return cnt == 0;
}
```
