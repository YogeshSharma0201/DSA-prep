# Power of Two

**Link:** https://leetcode.com/problems/power-of-two/

## Problem
Given an integer n, return true if it is a power of two. Otherwise, return false. An integer is a power of two if there exists an integer k such that n == 2^k.

## Solution
A power of two has exactly one bit set in its binary representation. For a positive number n, `n & (n-1)` clears the lowest set bit — if the result is 0, only one bit was set. Handle the edge case n <= 0 separately (those cannot be powers of two).

## Code
```cpp
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```
