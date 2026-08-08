# Divide Two Integers

**Link:** https://leetcode.com/problems/divide-two-integers/

## Problem
Given two integers dividend and divisor, divide them without using multiplication, division, or mod operator. Return the quotient after dividing dividend by divisor, truncated toward zero. The result must fit in a 32-bit signed integer; clamp to INT_MAX or INT_MIN on overflow.

## Solution

### Intuition & Logic
1. **The Core Goal:** Division is essentially repeated subtraction: finding how many times the divisor can be subtracted from the dividend before the remainder is less than the divisor.
2. **Why Not Linear Subtraction?**
   - Subtracting `divisor` from `dividend` one-by-one is $O(\text{dividend})$. If `dividend = INT_MAX` and `divisor = 1`, this would take $\approx 2 \times 10^9$ operations, resulting in Time Limit Exceeded (TLE).
3. **Exponential Search / Bit Shifting (Doubling Strategy):**
   - Every quotient $Q$ can be expressed in binary:
     $$Q = c_k \cdot 2^k + c_{k-1} \cdot 2^{k-1} + \dots + c_1 \cdot 2^1 + c_0 \cdot 2^0 \quad (c_i \in \{0, 1\})$$
   - This means:
     $$\text{dividend} = (\text{divisor} \cdot 2^{k_1}) + (\text{divisor} \cdot 2^{k_2}) + \dots + \text{remainder}$$
   - We can repeatedly find the largest power of 2 ($2^k$) such that $(\text{divisor} \ll k) \le \text{remaining dividend}$.
   - Left shifting `temp = divisor` by 1 (`temp << 1`) doubles its value ($2 \times \text{temp}$) without using multiplication.
   - We subtract the largest doubled divisor from `dividend`, add the corresponding power of 2 (`multiple`) to `quotient`, and repeat until `dividend < divisor`.

### Step-by-Step Example Walkthrough

**Example:** `dividend = 43`, `divisor = 3` (Expected Quotient: $43 / 3 = 14$)

1. **Sign & Absolute Values:**
   - Both are positive $\implies \text{positive} = \text{true}$.
   - Work with `dvd = 43`, `dvs = 3`.

2. **Iteration 1:**
   - Start with `temp = 3`, `multiple = 1`.
   - Double `temp` while `dvd >= (temp << 1)`:
     - `temp << 1 = 6` $\le 43 \implies \text{temp} = 6, \text{multiple} = 2$
     - `temp << 1 = 12` $\le 43 \implies \text{temp} = 12, \text{multiple} = 4$
     - `temp << 1 = 24` $\le 43 \implies \text{temp} = 24, \text{multiple} = 8$
     - Next: `temp << 1 = 48` $> 43$ (Stop doubling).
   - Subtract: `dvd = 43 - 24 = 19`.
   - Add to quotient: `quotient = 0 + 8 = 8`.

3. **Iteration 2:**
   - Current `dvd = 19`, start with `temp = 3`, `multiple = 1`.
   - Double `temp`:
     - `temp << 1 = 6` $\le 19 \implies \text{temp} = 6, \text{multiple} = 2$
     - `temp << 1 = 12` $\le 19 \implies \text{temp} = 12, \text{multiple} = 4$
     - Next: `temp << 1 = 24` $> 19$ (Stop doubling).
   - Subtract: `dvd = 19 - 12 = 7`.
   - Add to quotient: `quotient = 8 + 4 = 12`.

4. **Iteration 3:**
   - Current `dvd = 7`, start with `temp = 3`, `multiple = 1`.
   - Double `temp`:
     - `temp << 1 = 6` $\le 7 \implies \text{temp} = 6, \text{multiple} = 2$
     - Next: `temp << 1 = 12` $> 7$ (Stop doubling).
   - Subtract: `dvd = 7 - 6 = 1`.
   - Add to quotient: `quotient = 12 + 2 = 14`.

5. **Iteration 4:**
   - Current `dvd = 1 < dvs (3)` $\implies$ Loop terminates.

6. **Result:**
   - $\text{quotient} = 14$, $\text{positive} = \text{true} \implies 14$.

### Edge Cases & Overflow Handling
- **Overflow Case:** `dividend = INT_MIN (-2147483648)` and `divisor = -1`. The true mathematical quotient is `2147483648`, which exceeds `INT_MAX (2147483647)`. We must explicitly return `INT_MAX`.
- **`abs(INT_MIN)` Overflow:** In 32-bit signed integers, `abs(INT_MIN)` causes overflow. We cast both `dividend` and `divisor` to `long long` before taking `abs()`.
- **Signs Without Multiplication:** If either dividend or divisor is negative (but not both), return `-quotient` instead of multiplying by sign: `positive ? quotient : -quotient`.

### Complexity
- **Time Complexity:** $O((\log(\text{dividend}))^2)$ — The outer loop runs at most $O(\log(\text{dividend}))$ times, and the inner doubling loop runs $O(\log(\text{dividend}))$ times.
- **Space Complexity:** $O(1)$ — Only a few 64-bit integer variables are used.

## Code
```cpp
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;

        long long dvd = abs((long long)dividend);
        long long dvs = abs((long long)divisor);
        bool positive = (dividend > 0) == (divisor > 0);
        long long quotient = 0;

        while (dvd >= dvs) {
            long long temp = dvs, multiple = 1;
            while (dvd >= (temp << 1)) {
                temp <<= 1;
                multiple <<= 1;
            }
            dvd -= temp;
            quotient += multiple;
        }

        return positive ? quotient : -quotient;
    }
};
```
