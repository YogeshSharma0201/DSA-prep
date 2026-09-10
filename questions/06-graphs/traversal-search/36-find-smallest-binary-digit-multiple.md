# Find the Smallest Binary Digit Multiple of Given Number

**Link:** [GeeksforGeeks - Find the smallest binary digit multiple of given number](https://www.geeksforgeeks.org/find-the-smallest-binary-digit-multiple-of-given-number/)

## Problem Description

Given a positive integer `n`, find the smallest positive multiple of `n` whose decimal representation contains only binary digits (`0` and `1`).

### Example 1:
```
Input: n = 3
Output: 111
Explanation: 111 is divisible by 3 and contains only '0' and '1'.
```

### Example 2:
```
Input: n = 55
Output: 110
Explanation: 110 is divisible by 55 and contains only '0' and '1'.
```

---

## Solution (BFS with Remainder Pruning)

This problem can be modeled as finding the **shortest path in a state graph using BFS**, where each state represents `(remainder, string_representation)` modulo `n`.

### Key Insight
1. **Generating Binary Strings in Order:**
   - BFS generates binary numbers in increasing order of length and value (`"1"`, `"10"`, `"11"`, `"100"`, `"101"`, etc.).
   - The first binary string $S$ whose value is divisible by $n$ (i.e. $S \pmod n == 0$) is guaranteed to be the **smallest valid multiple**.

2. **Remainder State Space & Pruning (`isVis`):**
   - The number of possible remainders modulo $n$ is at most $n$ (from $0$ to $n-1$).
   - If two different binary strings $S_1$ and $S_2$ produce the same remainder $R = S \pmod n$, appending any digit $d \in \{'0', '1'\}$ to both will yield identical next remainders:
     $$\text{Next Remainder} = (R \times 10 + d) \pmod n$$
   - Since BFS explores shorter strings first, the first time remainder $R$ is encountered, it represents the optimal (shortest) prefix. Any future string with the same remainder can be safely ignored.
   - We use a boolean array `isVis` of size `n` to track visited remainders, reducing the time complexity from exponential $O(2^L)$ to **$O(n)$**.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$ — Each remainder $0 \dots n-1$ is pushed into the queue at most once.
- **Space Complexity:** $\mathcal{O}(n)$ — For the `isVis` array and the BFS queue storing at most $n$ states.

---

## Code (C++)

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;

class GetMinimumMultipleOfBinaryDigit {
public:
    int solve(int n) {
        queue<pair<int, string>> q;
        q.push({1 % n, "1"});
        vector<bool> isVis(n, false);
        
        while (!q.empty()) {
            auto [rem, s] = q.front(); 
            q.pop();

            if (rem == 0) return stoi(s);
            isVis[rem] = true;

            int leftRem = (rem * 10 + 0) % n;
            int rightRem = (rem * 10 + 1) % n;

            if (!isVis[leftRem]) q.push({leftRem, s + "0"});
            if (!isVis[rightRem]) q.push({rightRem, s + "1"});
        }

        return -1;
    }
};
```
