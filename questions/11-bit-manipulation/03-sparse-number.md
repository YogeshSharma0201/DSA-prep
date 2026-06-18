# Sparse Number

**Link:** https://www.geeksforgeeks.org/check-whether-given-number-is-sparse-not/

## Problem
A number is sparse if it does not contain two consecutive 1-bits in its binary representation. Given a positive integer n, check if it is a sparse number.

## Solution
If n has two consecutive 1-bits, then n AND (n>>1) will be non-zero (because shifting right aligns a 1-bit with its neighbor). So check `(n & (n >> 1)) == 0`.

## Code
```cpp
bool isSparse(int n) {
    return (n & (n >> 1)) == 0;
}
```
