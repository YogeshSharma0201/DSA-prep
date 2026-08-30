# Letter Combinations of a Phone Number

**Link:** https://leetcode.com/problems/letter-combinations-of-a-phone-number/

## Problem
Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

- 2 -> "abc"
- 3 -> "def"
- 4 -> "ghi"
- 5 -> "jkl"
- 6 -> "mno"
- 7 -> "pqrs"
- 8 -> "tuv"
- 9 -> "wxyz"

---

## Solution (Backtracking)

### Approach
1. **Digit-to-Letter Mapping**:
   - Map each digit ('2'-'9') to its corresponding string of letters.
2. **Backtracking DFS**:
   - At each digit index `idx`:
     - Iterate through all characters corresponding to `digits[idx]`.
     - Append the character to `path`, recurse to `idx + 1`, and then backtrack by popping `path.pop_back()`.
   - Base Case: When `idx == digits.size()`, append the accumulated string `path` to the result list `res`.
3. **Edge Case**:
   - If the input string `digits` is empty, return an empty vector `[]`.

### Complexity
- **Time Complexity:** O(4^n * n) — Where $n$ is the length of `digits`. In the worst case (e.g., digits 7 and 9), each digit maps to 4 letters, yielding $4^n$ combinations of length $n$.
- **Space Complexity:** O(n) — Recursion call stack and `path` storage (excluding the result list).

---

## Code

```cpp
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string numm[10] = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    void solve(string& digits, int idx, string& path, vector<string>& res) {
        if (idx == digits.size()) {
            res.push_back(path);
            return;
        }

        for (int i = 0; i < numm[digits[idx] - '0'].size(); i++) {
            path.push_back(numm[digits[idx] - '0'][i]);
            solve(digits, idx + 1, path, res);
            path.pop_back();
        }
    }

    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;

        string path = "";
        solve(digits, 0, path, res);
        
        return res;
    }
};
```
