# Power of Four

**Link:** https://leetcode.com/problems/power-of-four/

## Problem
Given an integer n, return true if it is a power of four. Otherwise, return false. An integer is a power of four if there exists an integer k such that n == 4^k.

## Solution
A power of four must first be a power of two (only one bit set). Additionally, that single set bit must be at an even position (0, 2, 4, ...). Use the mask `0x55555555` (bits at even positions) to check: `n > 0 && (n & (n-1)) == 0 && (n & 0x55555555) != 0`.

## Code
```cpp
bool isPowerOfFour(int n) {
    // 0x55555555 has 1s at positions 0,2,4,6,...
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
}
```
