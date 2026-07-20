# Decode String

**Link:** https://leetcode.com/problems/decode-string/

## Problem
Given an encoded string in the form k[encoded_string] where the encoded_string inside the brackets is repeated exactly k times, return the decoded string. k is always a positive integer. The encoding may be nested.

## Solution
Use a stack of (string, int) pairs. Maintain a current string and current number. On '[', push the current string and number onto the stack, then reset both. On ']', pop the top pair: repeat the current string by the popped count and prepend the popped string. On digits build the number. On letters append to the current string.

## Code
```cpp
string decodeString(string s) {
    stack<pair<string, int>> st;
    string cur = "";
    int num = 0;

    for (char c : s) {
        if (isdigit(c)) {
            num = num * 10 + (c - '0');
        } else if (c == '[') {
            st.push({cur, num});
            cur = "";
            num = 0;
        } else if (c == ']') {
            auto [prevStr, count] = st.top();
            st.pop();
            string repeated = "";
            for (int i = 0; i < count; i++) repeated += cur;
            cur = prevStr + repeated;
        } else {
            cur += c;
        }
    }

    return cur;
}
```
