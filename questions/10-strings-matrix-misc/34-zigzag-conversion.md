# Zigzag Conversion

**Link:** https://leetcode.com/problems/zigzag-conversion/

## Problem
The string "PAYPALISHIRING" written in a zigzag pattern on a given number of rows is read line by line to produce "PAHNAPLSIIGYIR". Given a string and numRows, return the string read in the zigzag line-by-line order.

## Solution
Create numRows strings, one per row. Track current row and direction (going down or up). Append each character to the appropriate row's string. Reverse direction when reaching row 0 or row numRows-1. Concatenate all row strings at the end.

## Code
```cpp
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;
        vector<string> rows(numRows);
        int row = 0, dir = -1;

        for (char c : s) {
            rows[row] += c;
            if (row == 0 || row == numRows - 1) dir = -dir;
            row += dir;
        }

        string result;
        for (auto& r : rows) result += r;
        return result;
    }
};
```
