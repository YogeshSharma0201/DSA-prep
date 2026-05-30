# Sum of Two Integers (Bit Manipulation)

**Link:** https://leetcode.com/problems/sum-of-two-integers/solutions/84278/

## Problem
Given two integers a and b, return the sum of two integers without using the operators + and -. You must use only bit manipulation operations to compute the result.

## Solution
XOR of a and b gives the sum bits without carry. AND of a and b left-shifted by 1 gives the carry bits. Repeat the process with the new sum (XOR) and new carry (AND << 1) until there is no carry remaining (b == 0).

## Code
```cpp
class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            unsigned int carry = (unsigned int)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};
```
