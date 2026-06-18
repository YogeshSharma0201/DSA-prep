# Multiply Strings

**Link:** https://leetcode.com/problems/multiply-strings

## Problem
Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2` as a string. You must not convert the inputs to integers directly.

## Solution
Simulate grade-school multiplication. The product of digits at positions `i` and `j` contributes to positions `i+j` and `i+j+1` in the result array. Build the result array of size m+n, then convert to string skipping leading zeros.

## Code
```cpp
string multiply(string num1, string num2) {
    int m = num1.size(), n = num2.size();
    vector<int> pos(m + n, 0);
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int mul = (num1[i]-'0') * (num2[j]-'0');
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + pos[p2];
            pos[p2] = sum % 10;
            pos[p1] += sum / 10;
        }
    }
    string result;
    for (int p : pos)
        if (!(result.empty() && p == 0))
            result += to_string(p);
    return result.empty() ? "0" : result;
}
```
