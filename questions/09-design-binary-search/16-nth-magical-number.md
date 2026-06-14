# Nth Magical Number

**Link:** https://leetcode.com/problems/nth-magical-number/

## Problem
A positive integer is magical if it is divisible by either `a` or `b`. Given three integers `n`, `a`, and `b`, return the `n`-th magical number. Since the answer may be very large, return it modulo `10^9 + 7`.

## Solution
Binary search on the answer value using the left-search template (see [00-binary-search-template.md](00-binary-search-template.md)). The count of magical numbers ≤ `mid` is `mid/a + mid/b - mid/lcm(a,b)` (inclusion-exclusion — numbers divisible by both are counted twice, so subtract once). Binary search for the first value where this count reaches `n`.

Search bounds: lower = `min(a,b)` (smallest possible magical number), upper = `n * min(a,b)` (worst case: all magical numbers are multiples of the smaller of a, b).

## Code
```cpp
class Solution {
public:
    int mod = (int)1e9 + 7;

    int nthMagicalNumber(int n, int a, int b) {
        long long l = min(a, b);
        long long r = 1LL * n * l;

        // Inclusion-exclusion: count of numbers divisible by a or b up to x
        // = x/a + x/b - x/lcm(a,b)
        // lcm(a,b) = a*b / gcd(a,b)
        long long lcm = 1LL * a * b / __gcd(a, b);

        while (l < r) {
            long long mid = (l + r) >> 1;
            long long magicalNums = mid / a + mid / b - mid / lcm;  // count of magical numbers <= mid

            if (magicalNums < n) l = mid + 1;  // not enough magical numbers yet; search higher
            else                 r = mid;        // mid could be the answer; keep
        }

        return l % mod;
    }
};
```
