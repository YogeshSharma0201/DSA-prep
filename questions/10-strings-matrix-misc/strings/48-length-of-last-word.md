# Length of Last Word

**Link:** https://leetcode.com/problems/length-of-last-word

## Problem
Given a string `s` consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

## Solution
Use `std::stringstream` to read words separated by spaces. By continuously reading tokens into a string `t`, `t` will hold the last word read when the stream is exhausted. Return the size of `t`.

Alternatively, we can traverse the string from right to left, skip any trailing spaces, and then count characters until we hit a space or the start of the string.

## Code
```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        stringstream ss(s);
        string t;
        while(ss >> t);
        return t.size();
    }
};
```
