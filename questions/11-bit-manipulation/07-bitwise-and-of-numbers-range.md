# Bitwise AND of Numbers Range

**Link:** [Bitwise AND of Numbers Range - LeetCode](https://leetcode.com/problems/bitwise-and-of-numbers-range)

## Problem Description

Given two integers `left` and `right` that represent the range `[left, right]`, return *the bitwise AND of all numbers in this range, inclusive*.

---

## Solution: Bit Cycle Analysis / Common Bit Prefix

### Key Intuition
- **Bit Cycle Pattern:** For any bit position $i$, the bit value toggles between `0` and `1` periodically with a period (cycle length) of $2^{i+1}$.
- In every cycle of length $2^{i+1}$:
  - The bit is `0` for values in $[0, 2^i - 1]$.
  - The bit is `1` for values in $[2^i, 2^{i+1} - 1]$.
- **Condition for $i$-th bit to remain 1 across `[left, right]`:**
  1. The total range length `right - left` must not exceed half of the cycle length ($2^i$), because if `right - left > 2^i`, at least one number in the range will fall into a `0`-bit region.
  2. Both `left % cycle` and `right % cycle` must lie strictly within the `1`-bit region $[2^i, 2^{i+1} - 1]$.
- If both conditions hold for bit $i$, we set the $i$-th bit in the result (`ret |= (1 << i)`).

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(32) = \mathcal{O}(1)$ — constant time check for 32 bits.
- **Space Complexity:** $\mathcal{O}(1)$ — constant extra space.

---

## Code (C++)

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int ret = 0;

        for(int i = 0; i < 32; i++) {
            long long cycle = 1LL << (i + 1);

            // If range length is greater than half the cycle, at least one number has 0 at bit i
            if(right - left > cycle / 2) continue;

            int leftI = left % cycle;
            int rightI = right % cycle;

            // Check if both bounds fall in the '1' region of the bit cycle [cycle/2, cycle - 1]
            if((leftI >= cycle / 2 && leftI < cycle) 
                && (rightI >= cycle / 2 && rightI < cycle)) {
                ret |= (1 << i);
            }
        }
        return ret;
    }
};
```
