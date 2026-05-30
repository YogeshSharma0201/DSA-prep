# Divide Two Integers

**Link:** https://leetcode.com/problems/divide-two-integers/

## Problem
Given two integers dividend and divisor, divide them without using multiplication, division, or mod operator. Return the quotient after dividing dividend by divisor, truncated toward zero. The result must fit in a 32-bit signed integer; clamp to INT_MAX or INT_MIN on overflow.

## Solution
Work with long long to handle INT_MIN. Repeatedly find the largest k such that (divisor << k) <= remaining dividend, subtract it, and add (1 << k) to the quotient. Handle signs separately. Special-case INT_MIN / -1 which overflows to INT_MAX.

## Code
```cpp
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;

        long long dvd = abs((long long)dividend);
        long long dvs = abs((long long)divisor);
        int sign = (dividend > 0) == (divisor > 0) ? 1 : -1;
        long long quotient = 0;

        while (dvd >= dvs) {
            long long temp = dvs, multiple = 1;
            while (dvd >= (temp << 1)) {
                temp <<= 1;
                multiple <<= 1;
            }
            dvd -= temp;
            quotient += multiple;
        }

        return sign * quotient;
    }
};
```
