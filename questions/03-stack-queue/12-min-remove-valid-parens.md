# Minimum Remove to Make Valid Parentheses

**Link:** https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses

## Problem
Given a string s of '(', ')' and lowercase English characters, remove the minimum number of parentheses to make the resulting string valid. Return any valid result. A valid string has every opening bracket matched with a closing bracket in correct order.

## Solution
Two-pass approach using a balance counter. First pass (left to right): keep characters where count >= 0; on ')' decrement count and discard if it goes negative (reset to 0). Second pass (right to left): keep characters where count >= 0; on '(' decrement count and discard if it goes negative. Reverse the result of the second pass and return.

## Code
```cpp
string minRemoveToMakeValid(string s) {
    string res = "";
    int count = 0;

    for (int i = 0; i < s.size(); i++) {
        if (s[i] == ')') count--;
        else if (s[i] == '(') count++;

        if (count >= 0) {
            res.push_back(s[i]);
        } else {
            count = 0;
        }
    }

    s = res;
    count = 0;
    res = "";
    for (int i = s.size() - 1; i >= 0; i--) {
        if (s[i] == '(') count--;
        else if (s[i] == ')') count++;

        if (count >= 0) {
            res.push_back(s[i]);
        } else {
            count = 0;
        }
    }

    for (int i = 0; i < res.size() / 2; i++) {
        char t = res[i];
        res[i] = res[res.size() - i - 1];
        res[res.size() - i - 1] = t;
    }

    return res;
}
```
