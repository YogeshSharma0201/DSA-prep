# String Compression

**Link:** https://leetcode.com/problems/string-compression

## Problem
Given an array of characters `chars`, compress it in-place. Groups of consecutive repeating characters are replaced by the character followed by its count (if count > 1). Return the new length. Must use O(1) extra space.

## Solution
Use two pointers: `read` to scan the input and `write` to update in place. For each group of identical characters, write the character, then if count > 1, write each digit of the count as a separate character.

## Code
```cpp
int compress(vector<char>& chars) {
    int write = 0, read = 0, n = chars.size();
    while (read < n) {
        char c = chars[read];
        int count = 0;
        while (read < n && chars[read] == c) { read++; count++; }
        chars[write++] = c;
        if (count > 1) {
            string cnt = to_string(count);
            for (char d : cnt) chars[write++] = d;
        }
    }
    return write;
}
```
