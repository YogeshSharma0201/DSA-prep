# Swap All Odd and Even Bits

**Link:** https://www.geeksforgeeks.org/swap-all-odd-and-even-bits/

## Problem
Given an unsigned integer, swap all odd bits with even bits. Bit 0 is the LSB (even position), bit 1 is odd position, etc. Every even-position bit should be moved to the odd position and vice versa.

## Solution
Use two masks: `0xAAAAAAAA` (all odd bits set) and `0x55555555` (all even bits set). Extract the odd bits, right-shift by 1; extract the even bits, left-shift by 1. OR the two results.

## Code
```cpp
unsigned int swapBits(unsigned int n) {
    unsigned int oddBits  = n & 0xAAAAAAAA; // bits at positions 1,3,5,...
    unsigned int evenBits = n & 0x55555555; // bits at positions 0,2,4,...
    return (oddBits >> 1) | (evenBits << 1);
}
```
