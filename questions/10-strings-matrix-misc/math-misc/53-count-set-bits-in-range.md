# Count Total Set Bits

**Link:** https://www.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1

## Problem
Given a positive integer N, count the total number of set bits (1s) in the binary representation of all numbers from 1 to N. Return the answer modulo 10^9 + 7.

## Solution
For each bit position b, count how many numbers in [1, N] have that bit set. Numbers repeat in patterns of 2^(b+1): the first 2^b numbers in each cycle have bit b set. Sum contributions from all bit positions up to log2(N).

## Code
```cpp
int countSetBits(int n) {
    long long count = 0, mod = 1e9 + 7;
    for (long long b = 1; b <= n; b <<= 1) {
        long long cycle = b << 1;
        count += (n / cycle) * b;
        count += max(0LL, (n % cycle) - b + 1);
        count %= mod;
    }
    return (int)count;
}
```
