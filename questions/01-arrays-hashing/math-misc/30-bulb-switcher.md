# Bulb Switcher

**Link:** [Bulb Switcher - LeetCode](https://leetcode.com/problems/bulb-switcher/)

## Problem Description

There are `n` bulbs that are initially turned off. You first turn on all the bulbs, then you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it's off or off if it's on). For the $i^{\text{th}}$ round, you toggle every $i^{\text{th}}$ bulb. For the $n^{\text{th}}$ round, you only toggle the last bulb.

Return the number of bulbs that are **on** after `n` rounds.

---

## Solution: Perfect Square Property ($\lfloor \sqrt{n} \rfloor$)

### Key Intuition
- A bulb at position $i$ (1-indexed) is toggled in round $k$ if and only if $k$ is a factor (divisor) of $i$.
- A bulb ends up **ON** if it is toggled an **odd number of times** (starts OFF $\to$ toggled odd times $\to$ ON).
- Divisors of a number usually come in pairs $(d, i/d)$. Therefore, most numbers have an **even number of divisors**.
- A number has an **odd number of divisors** if and only if it is a **perfect square** (since $\sqrt{i}$ pairs with itself).
- Thus, only the bulbs at perfect square positions ($1, 4, 9, 16, 25, \dots \le n$) remain **ON**.
- The count of perfect squares $\le n$ is simply $\lfloor \sqrt{n} \rfloor$.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(\sqrt{n})$ using a simple loop (or $\mathcal{O}(1)$ using `sqrt(n)`).
- **Space Complexity:** $\mathcal{O}(1)$.

---

## Code (C++)

```cpp
class Solution {
public:
    int bulbSwitch(int n) {
        int counts = 0;
        
        for (int i = 1; i * i <= n; ++i) {
            ++counts;    
        }
        
        return counts;
    }
};
```
