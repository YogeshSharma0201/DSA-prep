# Valid Number

**Link:** https://leetcode.com/problems/valid-number/

## Problem
Given a string s, return true if s is a valid number. A valid number can include an optional sign, digits, at most one decimal point, and an optional exponent part ('e' or 'E') followed by an optional sign and digits. Leading/trailing spaces are not allowed.

## Solution
Use boolean flags to track what has been seen: seenDigit, seenDot, seenExp. Iterate through characters handling signs (only at start or right after 'e'/'E'), digits, one decimal point (not after exponent), and one exponent (requires digit before it). Digit must be seen at the end.

## Code
```cpp
class Solution {
public:
    bool isNumber(string s) {
        bool seenDigit = false, seenDot = false, seenExp = false;

        for (int i = 0; i < (int)s.size(); i++) {
            char c = s[i];
            if (isdigit(c)) {
                seenDigit = true;
            } else if (c == '+' || c == '-') {
                if (i != 0 && s[i-1] != 'e' && s[i-1] != 'E')
                    return false;
            } else if (c == '.') {
                if (seenDot || seenExp) return false;
                seenDot = true;
            } else if (c == 'e' || c == 'E') {
                if (seenExp || !seenDigit) return false;
                seenExp = true;
                seenDigit = false; // must have digits after exponent
            } else {
                return false;
            }
        }
        return seenDigit;
    }
};
```
