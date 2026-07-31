# Longest Valid Parentheses

**Link:** https://leetcode.com/problems/longest-valid-parentheses

## Problem
Given a string containing only '(' and ')', return the length of the longest valid (well-formed) parentheses substring. A valid parentheses substring is one where every opening bracket has a matching closing bracket in the correct order.

## Solution 1 — Stack
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

---

## Solution 2 — Two-Pass Scanner (Constant Space)
Iterate through the string from left to right, maintaining counters for open and close parentheses. Whenever `open == close`, update the maximum length with `open + close`. If `close > open`, reset both counters. Repeat the process iterating from right to left (reversing the roles of open/close tracking) to handle the case where there are leftover unmatched open parentheses.

```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int open = 0, close = 0, ans = 0;

        for(int i=0; i<s.size(); i++) {
            if(s[i] == '(') open++;
            else close++;

            if(open == close) ans = max(ans, open+close);
            else if(close > open) {
                open = 0; close = 0;
            }
        }

        open = 0; close = 0;

        for(int i=s.size()-1; i>=0; i--) {
            if(s[i] == ')') open++;
            else close++;

            if(open == close) ans = max(ans, open+close);
            else if(close > open) {
                open = 0; close = 0;
            }
        }

        return ans;
    }
};
```
