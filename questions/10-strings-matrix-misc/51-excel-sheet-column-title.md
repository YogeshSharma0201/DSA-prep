# Excel Sheet Column Title

**Link:** https://leetcode.com/problems/excel-sheet-column-title

## Problem
Given an integer columnNumber, return its corresponding column title as it appears in an Excel spreadsheet. For example, 1 maps to "A", 26 to "Z", 27 to "AA", 28 to "AB", and so on. This is a 1-indexed base-26 encoding.

## Solution
It is like base-26 conversion but 1-indexed (no zero). Repeatedly prepend the character (columnNumber - 1) % 26 + 'A' to the result, then set columnNumber = (columnNumber - 1) / 26. Continue until columnNumber becomes 0.

## Code
```cpp
string convertToTitle(int columnNumber) {
    string ret = "";

    while(columnNumber) {
        ret.insert(ret.begin(), (columnNumber-1) % 26 + 'A');
        columnNumber = (columnNumber-1) / 26;
    }

    return ret;
}
```
