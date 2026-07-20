# Remove All Adjacent Duplicates In String

**Link:** https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/

## Problem
Given a string `s`, repeatedly remove adjacent pairs of equal characters until no such pair remains. Return the final string.

## Solution
In-place stack simulation using the string itself as the stack. `i` tracks the stack top (one past the last kept character), `j` scans the input. Write `s[j]` into `s[i]`; if it matches the new top of the stack (`s[i-1]`), that's a pair — pop both by decrementing `i` by 2. Otherwise the character stays pushed. The answer is the prefix `s[0..i)`.

## Code
```cpp
class Solution {
public:
    string removeDuplicates(string s) {
        int i = 0, n = s.length();
        for (int j = 0; j < n; ++j, ++i) {
            s[i] = s[j];
            if (i > 0 && s[i - 1] == s[i]) // count = 2
                i -= 2;
        }
        return s.substr(0, i);
    }
};
```
