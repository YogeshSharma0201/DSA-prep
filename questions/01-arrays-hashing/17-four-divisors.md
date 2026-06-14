# Four Divisors

**Link:** https://leetcode.com/problems/four-divisors/

## Problem
Given an integer array `nums`, return the sum of divisors of the integers that have exactly four divisors. If no integer in the array has exactly four divisors, return `0`.

## Solution — Single divisor in range [2, sqrt(n)]
A number `n` has exactly four divisors (1, d, n/d, n) when there is exactly one divisor `d` in the range `[2, sqrt(n)]` and `d ≠ sqrt(n)` (i.e. `d ≠ n/d`, meaning `n` is not a perfect square with that divisor). Iterate `d` from 2 up to `sqrt(n)`: track the first qualifying divisor in `last_d`; if a second divisor is found, discard this number and break early. After the loop, if `last_d > 0` and `last_d != n/last_d`, add `1 + last_d + n/last_d + n` to the answer.

## Code
```cpp
int sumFourDivisors(vector<int>& input) {
    int sum = 0;
    for (int i = 0; i < input.size(); i++) {
        int last_d = 0;
        for (int d = 2; d * d <= input[i]; d++) {
            if (input[i] % d == 0) {
                if (last_d == 0) {
                    last_d = d;
                } else {
                    last_d = 0;
                    break;
                }
            }
        }
        if (last_d > 0 && last_d != input[i] / last_d) {
            sum += 1 + input[i] + last_d + input[i] / last_d;
        }
    }
    return sum;
}
```
