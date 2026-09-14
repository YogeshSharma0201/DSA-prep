# Extra Characters in a String

**Link:** [Extra Characters in a String - LeetCode](https://leetcode.com/problems/extra-characters-in-a-string/)

## Problem Description

You are given a 0-indexed string `s` and a dictionary of words `dictionary`. You have to break `s` into one or more non-overlapping substrings such that each substring is present in `dictionary`. There may be some extra characters in `s` which are not present in any of the substrings.

Return the **minimum** number of extra characters left over if you break up `s` optimally.

---

## Solution: Dynamic Programming (Memoization) + Trie

### Key Intuition
- We want to partition the string `s` starting at index `idx` such that the total number of extra (unmatched) characters is minimized.
- **State Transition / Choice at index `idx`:**
  1. **Option 1 (Skip current character):** Treat `s[idx]` as an extra character. We pay $1$ extra character cost and recurse on `idx + 1`.
  2. **Option 2 (Match a word starting at `idx` using Trie):** Traverse the Trie starting at node `head` for characters `s[idx...i]`. Whenever a node marks `isEnd == true`, it indicates a valid dictionary word `s[idx...i]`. We can jump to index `i + 1` with $0$ extra cost for this segment, and recurse on `i + 1`.
- Dynamic programming memoization array `dp[idx]` stores the minimum extra characters for suffix `s[idx...]`.

### Complexity Analysis
- **Time Complexity:**
  - **Trie Construction:** $\mathcal{O}(D \cdot L)$ where $D$ is the number of words in dictionary and $L$ is the max length of a word.
  - **DP Traversal:** $\mathcal{O}(N^2)$ where $N$ is the length of string `s`. At each index `idx` ($0 \le idx < N$), we explore at most $N - idx$ characters in the Trie.
  - **Total Time Complexity:** $\mathcal{O}(D \cdot L + N^2)$.
- **Space Complexity:**
  - **Trie Space:** $\mathcal{O}(D \cdot L \times 26)$ nodes.
  - **DP Memoization + Recursion Stack:** $\mathcal{O}(N)$.
  - **Total Space Complexity:** $\mathcal{O}(D \cdot L + N)$.

---

## Code (C++)

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <climits>
#include <algorithm>
using namespace std;

struct TNode {
    bool isEnd = false;
    TNode* child[26] = {NULL};

    TNode() {
    }
};

class Solution {
    TNode* head;
public:
    void insert(string& s) {
        TNode* curr = head;
        int i = 0;
        while(i < s.size()) {
            int idx = s[i] - 'a';
            if(curr->child[idx] == NULL) {
                curr->child[idx] = new TNode();
            }
            curr = curr->child[idx];
            i++;
        }
        curr->isEnd = true;
    }

    int solve(int idx, string& s, vector<int>& dp) {
        int n = s.size();
        if(idx == n) {
            return 0;
        }

        if(dp[idx] != -1) return dp[idx];

        int minChar = INT_MAX;

        // Skip current char as extra character
        minChar = min(minChar, 1 + solve(idx + 1, s, dp));

        // Search for matching dictionary words starting at idx using Trie
        TNode* curr = head;
        int i = idx;
        while(i < n && curr->child[s[i] - 'a'] != NULL) {
            curr = curr->child[s[i] - 'a'];
            if(curr->isEnd) {
                minChar = min(minChar, solve(i + 1, s, dp));
            }
            i++;
        }

        return dp[idx] = minChar;
    }

    int minExtraChar(string s, vector<string>& dictionary) {
        head = new TNode();
        // Insert all words into Trie
        for(auto& w : dictionary) {
            insert(w);
        }

        vector<int> dp(s.size(), -1);

        return solve(0, s, dp);
    }
};
```
