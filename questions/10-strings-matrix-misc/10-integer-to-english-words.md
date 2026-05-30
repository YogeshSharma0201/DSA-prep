# Integer to English Words

**Link:** https://leetcode.com/problems/integer-to-english-words/

## Problem
Convert a non-negative integer num to its English words representation. For example, 1234567 becomes "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven". The input is guaranteed to be in the range [0, 2^31 - 1].

## Solution
Divide the number into groups of three digits. Process each group with a helper that handles hundreds, tens (including teens), and ones. Append the appropriate suffix (Thousand, Million, Billion) for each group. Handle the special case of 0 and ensure no leading/trailing spaces.

## Code
```cpp
class Solution {
    vector<string> ones = {"", "One", "Two", "Three", "Four", "Five", "Six",
        "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
        "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    vector<string> tens = {"", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"};
    vector<string> thousands = {"", "Thousand", "Million", "Billion"};

    string helper(int n) {
        if (n == 0) return "";
        if (n < 20) return ones[n] + " ";
        if (n < 100) return tens[n / 10] + " " + helper(n % 10);
        return ones[n / 100] + " Hundred " + helper(n % 100);
    }
public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        string result;
        for (int i = 3; i >= 0; i--) {
            int divisor = pow(1000, i);
            if (num / divisor > 0) {
                result += helper(num / divisor) + thousands[i] + " ";
                num %= divisor;
            }
        }
        while (result.back() == ' ') result.pop_back();
        return result;
    }
};
```
