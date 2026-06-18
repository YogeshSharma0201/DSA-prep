# Number of Steps to Reduce a Number to Zero

**Link:** https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/

## Problem
Given an integer num, return the number of steps to reduce it to zero. In one step, if the current number is even, divide it by 2; if odd, subtract 1 from it.

## Solution
Simulate the process: count steps. For even numbers dividing by 2 is a right shift; for odd numbers subtracting 1 clears the LSB. Alternatively, count the bits: each set bit requires a subtract step plus the shift that follows, and each zero bit (except the leading) requires only a shift. Total = bit_length - 1 + popcount.

## Code
```cpp
int numberOfSteps(int num) {
    int steps = 0;
    while (num > 0) {
        if (num & 1) num--;   // odd: subtract 1
        else         num >>= 1; // even: divide by 2
        steps++;
    }
    return steps;
}
```
