# Pow(x, n)

**Link:** https://leetcode.com/problems/powx-n/

## Problem
Implement pow(x, n), which calculates x raised to the power n (i.e., x^n). The exponent n can be negative, and you must handle that case efficiently without simply multiplying n times.

## Solution
Use fast exponentiation (binary exponentiation): if n is even, x^n = (x^(n/2))^2; if n is odd, x^n = x * x^(n-1). For negative n, compute 1 / x^|n|. This runs in O(log n) time.

## Code
```cpp
double pow(double x, long long n) {
    if(n == 0) return 1;
    if(n == 1) return x;

    double ret = pow(x, n/2);
    ret *= ret;

    if(n & 1) ret *= x;

    return ret;
}

double myPow(double x, int n) {
    if( n < 0) return 1/pow(x, abs(n*1LL));
    return pow(x, n);
}
```
