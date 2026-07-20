# Minimum Add to Make Parentheses Valid

**Link:** https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

## Problem
Given a string s of '(' and ')' parentheses, return the minimum number of parentheses you must add to make the string valid (every '(' is matched with a ')' and vice versa).

## Solution
Track open (unmatched '(' count) and close (unmatched ')' count). For each '(', increment open. For each ')', if open > 0 decrement open (it matches), else increment close (unmatched ')'). The answer is open + close.

## Code
```cpp
int minAddToMakeValid(string s) {
    int open = 0, close = 0;
    for (char c : s) {
        if (c == '(') {
            open++;
        } else {
            if (open > 0) open--;
            else close++;
        }
    }
    return open + close;
}
```
