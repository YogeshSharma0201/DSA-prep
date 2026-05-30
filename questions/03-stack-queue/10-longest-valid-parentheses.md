# Longest Valid Parentheses

**Link:** https://leetcode.com/problems/longest-valid-parentheses

## Problem
Given a string containing only '(' and ')', return the length of the longest valid (well-formed) parentheses substring. A valid parentheses substring is one where every opening bracket has a matching closing bracket in the correct order.

## Solution
Use a stack initialized with -1 as a base index. For each '(' push its index. For each ')' pop the top — if the stack becomes empty, push the current index as the new base marker. Otherwise the length of the current valid substring is (current index - stack.top()), and update the max accordingly.

## Code
```cpp
int longestValidParentheses(string s) {
    stack<int> st;
    st.push(-1);
    int max_len = 0;

    for (int i = 0; i < s.length(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            st.pop();
            if (st.empty()) {
                st.push(i);
            } else {
                max_len = max(max_len, i - st.top());
            }
        }
    }

    return max_len;
}
```
