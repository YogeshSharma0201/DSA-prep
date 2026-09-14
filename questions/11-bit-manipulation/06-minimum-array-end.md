# Minimum Array End

**Link:** [Minimum Array End - LeetCode](https://leetcode.com/problems/minimum-array-end/)

## Problem Description

You are given two integers `n` and `x`. You have to construct an array of positive integers `nums` of size `n` such that:
- `nums[i] < nums[i+1]` for all `0 <= i < n - 1` (strictly increasing).
- The bitwise `AND` of all elements of `nums` is `x`.

Return the **minimum possible value** of `nums[n - 1]`.

---

## Solution: Bit Manipulation & Bit Insertion

### Key Intuition
- Since the bitwise `AND` of all elements in `nums` must equal `x`, every element in `nums` **must** have all the set bits (`1`s) of `x`.
- To minimize the last element `nums[n - 1]` while ensuring $n$ strictly increasing numbers, the set bits of $x$ remain fixed, and the unset bits (`0`s) of $x$ are filled with the binary representation of $n - 1$.
- **Algorithm:**
  1. Let $c = n - 1$.
  2. Maintain a pointer $j$ to scan through bit positions of $x$.
  3. For each bit $i$ of $c$ (from bit $0$ to $63$):
     - Extract bit $b = (c \gg i) \ \& \ 1$.
     - Advance $j$ until $x \ \& \ (1 \ll j) == 0$ (finding the next zero-bit slot in $x$).
     - Set the $j$-th bit of $x$ to $b$ (`x |= (b << j)`).
     - Increment $j$.
  4. Return $x$.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(64) = \mathcal{O}(1)$ — iterates over at most 64 bits.
- **Space Complexity:** $\mathcal{O}(1)$ — uses constant extra space.

---

## Code (C++)

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    long long minEnd(int n, long long x) {
        long long c = n - 1;
        int j = 0; // next pointer in x with zero bit

        // Distribute bits of c into the zero-bit positions of x
        for(int i = 0; i < 64; i++) {
            long long b = (c & (1LL << i)) > 0 ? 1 : 0; 

            // Find the next zero bit in x
            while(j < 64 && (x & (1LL << j))) {
                j++;
            }
            if(j == 64) break;

            // Insert bit b into position j of x
            x |= (b << j);
            
            j++;
        }

        return x;
    }
};
```
