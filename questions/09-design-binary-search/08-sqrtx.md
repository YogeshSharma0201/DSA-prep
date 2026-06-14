# Sqrt(x)

**Link:** https://leetcode.com/problems/sqrtx/

## Problem
Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative. You may not use any built-in exponent function or operator.

## Solution
Binary search for the first `k` where `k*k > x` using the left-search template (inverted condition). The answer is `lo - 1`, which is the last `k` where `k*k ≤ x`. Set `hi = x/2 + 2` as the exclusive upper bound (guaranteed to satisfy `hi*hi > x`).

## Code

**Old code (3-way exact-match, returns `hi` at end):**
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        long long lo = 1, hi = x / 2;
        while (lo <= hi) {                        // inclusive 3-way loop
            long long mid = lo + (hi - lo) / 2;  // overflow-safe form
            long long sq = mid * mid;
            if (sq == x) return (int)mid;         // early exit on exact match
            else if (sq < x) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int)hi;                           // hi ends up as the floor sqrt
    }
};
```

**New code (left-search template, inverted condition, return `lo - 1`):**
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        // Goal: find last k where k*k <= x
        // Equivalent: find first k where k*k > x, then return lo - 1
        long long lo = 1, hi = (long long)x / 2 + 2;  // hi satisfies hi*hi > x
        while (lo < hi) {                               // left-search template
            long long mid = (lo + hi) >> 1;             // left-biased mid
            if (mid * mid > x) hi = mid;               // inverted condition: first false
            else               lo = mid + 1;
        }
        return (int)lo - 1;                            // lo-1 is last k where k*k <= x
    }
};
```
