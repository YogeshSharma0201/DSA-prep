# Factorial Trailing Zeroes

**Link:** https://leetcode.com/problems/factorial-trailing-zeroes/

## Problem
Given an integer `n`, return the number of trailing zeroes in `n!`.

## Approach — Count factors of 5
Trailing zeroes come from factors of 10 = 2 × 5 in `n!`. Since factors of 2 always outnumber factors of 5, the answer equals the total count of factor 5s across all numbers from 1 to n.

Every multiple of 5 contributes at least one factor of 5, giving `floor(n/5)` such factors. But higher powers of 5 contribute more:
- 25 = 5² contributes two factors of 5
- 125 = 5³ contributes three factors of 5

So the total count is:

```
floor(n/5) + floor(n/25) + floor(n/125) + ...
```

**Why `floor(n/5)` counts multiples of 5:** every multiple of 5 is `5 × k` for some integer `k`. We need `5k ≤ n`, so `k ≤ n/5`, giving exactly `floor(n/5)` valid values of `k`.

The code accumulates this sum by repeatedly dividing `n` by 5, which is equivalent to computing each term without needing to enumerate powers explicitly.

**Example — 100!**

| Division | Result |
|----------|--------|
| 100 / 5  | 20     |
| 100 / 25 | 4      |
| 100 / 125 | 0 (stop) |
| **Total** | **24** |

So `100!` has **24 trailing zeroes**.

## Code
```cpp
int trailingZeroes(int n) {
    int count = 0;
    while (n >= 5) {
        n /= 5;
        count += n;
    }
    return count;
}
```
