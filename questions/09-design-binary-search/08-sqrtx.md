# Sqrt(x)

**Link:** https://leetcode.com/problems/sqrtx/

## Problem
Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative. You may not use any built-in exponent function or operator.

## Solution
Binary search in the range [0, x]. For each midpoint `mid`, check if `mid * mid <= x` and `(mid+1) * (mid+1) > x`. If so, `mid` is the integer square root. Use `long long` to avoid overflow when squaring. Shrink the search space by adjusting `lo` and `hi` based on whether `mid*mid` overshoots or undershoots.

## Code
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        long long lo = 1, hi = x / 2;
        while (lo <= hi) {
            long long mid = lo + (hi - lo) / 2;
            long long sq = mid * mid;
            if (sq == x) return (int)mid;
            else if (sq < x) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int)hi;
    }
};
```
