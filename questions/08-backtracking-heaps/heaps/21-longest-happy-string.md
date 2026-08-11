# Longest Happy String

**Link:** https://leetcode.com/problems/longest-happy-string/

## Problem
A string `s` is called **happy** if it satisfies the following conditions:
- `s` only contains the letters `'a'`, `'b'`, and `'c'`.
- `s` does not contain any of `"aaa"`, `"bbb"`, or `"ccc"` as a substring (i.e., no character appears 3 consecutive times).
- `s` contains at most `a` occurrences of `'a'`, at most `b` occurrences of `'b'`, and at most `c` occurrences of `'c'`.

Given three integers `a`, `b`, and `c`, return the *longest possible happy string*. If there are multiple longest happy strings, return any of them. An empty string is returned if no such string can be made.

---

## Solution
Use a **Greedy approach with a Max-Heap** (`priority_queue` storing `{count, character}`):
1. Always greedily pick the character with the **highest remaining count** to place next.
2. If appending this character would create three consecutive occurrences (i.e., `result.size() >= 2 && result.back() == char1 && result[result.size() - 2] == char1`), temporarily set it aside and pick the **second most frequent character** instead.
3. Append the chosen character, decrement its count, and push it back into the heap if its count > 0.
4. If the most frequent character couldn't be placed and there is no second character available, break and return the result.

---

## Code
```cpp
#include <iostream>
#include <string>
#include <queue>
#include <vector>

using namespace std;

class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        // Priority queue (max-heap) to store characters and their remaining counts
        priority_queue<pair<int, char>> pq;
        if (a > 0) pq.push({a, 'a'});
        if (b > 0) pq.push({b, 'b'});
        if (c > 0) pq.push({c, 'c'});

        string result = "";

        while (!pq.empty()) {
            // Get the character with the highest count
            auto [count1, char1] = pq.top();
            pq.pop();

            // Check if the last two characters in result are the same as char1
            if (result.size() >= 2 && result.back() == char1 && result[result.size() - 2] == char1) {
                if (pq.empty()) break;  // No valid alternative character left

                // Get the second most frequent character
                auto [count2, char2] = pq.top();
                pq.pop();

                // Append the second character to avoid 3 consecutive duplicates
                result += char2;
                count2--;

                if (count2 > 0) pq.push({count2, char2});

                // Push the highest frequency character back for later turns
                pq.push({count1, char1});
            } else {
                // No repetition conflict; append the highest frequency character
                result += char1;
                count1--;

                if (count1 > 0) pq.push({count1, char1});
            }
        }

        return result;
    }
};
```

---

## Complexity
- **Time Complexity:** $\mathcal{O}((a + b + c) \log 3) = \mathcal{O}(a + b + c)$, since the heap contains at most 3 elements.
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space (excluding the output string).
