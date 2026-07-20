# Run-Length Encoding

**Link:** https://www.geeksforgeeks.org/problems/run-length-encoding/1

## Problem
Given a string, perform run-length encoding by replacing sequences of the same character with the character followed by its count. For example "aaabbbcc" becomes "a3b3c2".

## Solution
Scan through the string tracking the current character and its consecutive count. When the character changes, append the current character and count to the result. Handle the last group after the loop ends.

## Code
```cpp
string encode(string s) {
    if (s.empty()) return "";
    string result;
    int i = 0;
    while (i < s.size()) {
        char c = s[i];
        int count = 0;
        while (i < s.size() && s[i] == c) { i++; count++; }
        result += c;
        result += to_string(count);
    }
    return result;
}
```
