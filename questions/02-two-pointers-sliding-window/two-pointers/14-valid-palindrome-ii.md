# Valid Palindrome II

**Link:** https://leetcode.com/problems/valid-palindrome-ii/

## Problem

Given a string `s`, return `true` if the string can be a palindrome after deleting at most one character from it.

**Example 1:**
```
Input: s = "aba"
Output: true
```

**Example 2:**
```
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
```

**Example 3:**
```
Input: s = "abc"
Output: false
```

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Solution

The problem can be solved in $O(N)$ time complexity using a **two-pointer** approach.

### Core Idea

1. Initialize two pointers: `l` at the beginning (`0`) and `r` at the end (`s.size() - 1`) of the string.
2. Compare characters at `l` and `r`. If they match, move both pointers inward (`l++` and `r--`).
3. If they mismatch, we are allowed at most **one character deletion**. We can skip either `s[l]` or `s[r]` and check if the remaining substring forms a valid palindrome:
   - Check if `s[l + 1 ... r]` is a palindrome.
   - Check if `s[l ... r - 1]` is a palindrome.
4. If either of these checks is `true`, then the string is a valid palindrome. Otherwise, it is not.

### Recursive Implementation Details

The provided solution implements this approach recursively by keeping track of a `count` representing the number of deleted characters:
- **Base Case:** If `l >= r`, the substring is a palindrome, so we return `true`.
- **Match Case:** If `s[l] == s[r]`, we recursively check `isValidPal(s, l + 1, r - 1, count)`.
- **Mismatch Case:**
  - If `count == 0` (no deletions have been made yet), we branch and try both possible deletions:
    - Skip the left character: `isValidPal(s, l + 1, r, 1)`
    - Skip the right character: `isValidPal(s, l, r - 1, 1)`
    - Return `true` if either branch succeeds.
  - If `count == 1` (a deletion has already been made), we cannot delete another character. Thus, we return `false`.

---

### Complexity Analysis
- **Time Complexity:** $O(N)$ — In the worst case, we traverse the string once. When a mismatch is found, we check two substrings of length $N$, which takes $O(N)$ time.
- **Space Complexity:** $O(N)$ due to recursion stack space in the worst case (can be optimized to $O(1)$ auxiliary space with an iterative approach).

## Code

```cpp
class Solution {
public:
    bool isValidPal(string& s, int l, int r, int count) {
        if(l>=r) return true;
        else if(s[l] == s[r]) {
            return isValidPal(s, l+1, r-1, count);
        }
        else if(count==0) {
            return isValidPal(s, l+1, r , 1) 
                || isValidPal(s, l, r-1, 1);
        }
        else {
            return false;
        }
    }

    bool validPalindrome(string s) {
        return isValidPal(s, 0, s.size()-1, 0);
    }
};
```
