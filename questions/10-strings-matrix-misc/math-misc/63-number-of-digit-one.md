# Number of Digit One

**Link:** https://leetcode.com/problems/number-of-digit-one/

## Problem
Given an integer `n`, count the total number of digit `1` appearing in all non-negative integers less than or equal to `n`.

## Solution
We can solve this problem recursively by breaking it down by place values (units, tens, hundreds, etc.).
- Let `f(9)` be the number of ones in numbers from 0 to 9, which is 1.
- `f(99)` is the number of ones in numbers from 0 to 99. This is equivalent to `10 * f(9) + 10`, where `10` is the contribution of the digit 1 in the tens place for numbers `[10-19]`.
- In general, `f(10^k - 1) = 10 * f(10^(k-1) - 1) + 10^(k-1)`.
- For a given number `n`, find its most significant digit (e.g. for `n = 54`, the first digit is `5` and divisor is `10`). We can compute the answer as:
  1. Ones from the full cycles of lower-order numbers: `f(divisor - 1) * first_digit`.
  2. If the first digit is greater than 1, add `divisor` (since all numbers in `[divisor, 2 * divisor - 1]` have `1` as their first digit).
  3. If the first digit is exactly 1, add `rem + 1` (since numbers from `divisor` to `n` have `1` as their first digit).
  4. Recursively count ones in the remainder: `countDigitOne(rem)`.

## Code
```cpp
class Solution {
public:
    int countDigitOne(int n) {
        /*
            dp[j] : The number of ones until j

            f(9) = 1;
            f(99) = 10*f(9) + 10 (contribution from [10-19])
            f(999) = 10*f(99) + 100 (contribution from [100-199])

            f(26):
            [0-9] [10-19] [20-26]
            2*f(9) + 10 + f(6)

        */        

        if(n <= 0) return 0;
        if(n <= 9) return 1;

        unordered_map<int,int> mp;
        mp[9] = 1;

        for(int i=9; i<(INT_MAX-9)/10; i=10*i+9) {
            mp[10*i+9] = mp[i]*10 + (i+1);
        }

        int temp = n;
        int divisor = 1;

        while(temp/10) {
            temp /= 10;
            divisor *= 10;
        }


        int first_digit = n/divisor; // n=54; divisor = 10; n/divisor = 5.4 = 5
        int rem = n%divisor;


        int ans = 0;

        ans += mp[divisor-1]*first_digit;
        ans += (first_digit > 1) ? divisor : 0;
        ans += (first_digit == 1) ? rem + 1 : 0;
        ans += countDigitOne(rem);

        return ans;
    }
};
```
