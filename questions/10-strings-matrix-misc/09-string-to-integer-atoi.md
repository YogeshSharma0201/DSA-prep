# String to Integer (atoi)

**Link:** https://leetcode.com/problems/string-to-integer-atoi

## Problem
Implement the myAtoi function which converts a string to a 32-bit signed integer. Skip leading whitespace, read an optional sign, then read digits until a non-digit character is encountered. Clamp the result to the 32-bit integer range [-2^31, 2^31 - 1].

## Solution
Skip leading spaces, check for an optional '+' or '-' sign, then iterate over digit characters accumulating the result. Before each digit, check if adding it would overflow INT_MAX or INT_MIN and clamp early. Return the signed result.

## Code
```cpp
class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size();
        while (i < n && s[i] == ' ') i++;

        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            if (s[i] == '-') sign = -1;
            i++;
        }

        long long result = 0;
        while (i < n && isdigit(s[i])) {
            result = result * 10 + (s[i] - '0');
            if (result * sign > INT_MAX) return INT_MAX;
            if (result * sign < INT_MIN) return INT_MIN;
            i++;
        }
        return (int)(result * sign);
    }
};
```
