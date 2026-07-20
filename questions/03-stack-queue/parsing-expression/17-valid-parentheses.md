# Valid Parentheses

**Link:** https://leetcode.com/problems/valid-parentheses

## Problem
Given a string `s` containing only characters '(', ')', '{', '}', '[', ']', determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets in the correct order.

## Solution
Use a stack. Push opening brackets onto the stack. When a closing bracket is encountered, check if the top of the stack is the matching opening bracket. If not, or if the stack is empty, return false. Return true if the stack is empty at the end.

## Code
```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == ']' && st.top() != '[') return false;
            if (c == '}' && st.top() != '{') return false;
            st.pop();
        }
    }
    return st.empty();
}
```
