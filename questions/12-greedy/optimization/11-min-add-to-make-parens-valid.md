# Minimum Add to Make Parentheses Valid / Minimum Number of Swaps to Make the String Balanced

## Problem 1 — Minimum Add to Make Parentheses Valid

**Link:** https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

### Problem Description
Given a string s of '(' and ')' parentheses, return the minimum number of parentheses you must add to make the string valid (every '(' is matched with a ')' and vice versa).

### Solution
Track open (unmatched '(' count) and close (unmatched ')' count). For each '(', increment open. For each ')', if open > 0 decrement open (it matches), else increment close (unmatched ')'). The answer is open + close.

### Code
```cpp
class Solution {
public:
    int minAddToMakeValid(string s) {
        int open = 0, close = 0;

        for(int i=0; i<s.size(); i++) {
            if(s[i] == '(') open++;
            else {
                if(open > 0) open--;
                else close++;
            }
        }
        
        return open+close;
    }
};
```

---

## Problem 2 — Minimum Number of Swaps to Make the String Balanced

**Link:** https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/

### Problem Description
You are given a 0-indexed string `s` of even length `n`. The string consists of exactly `n / 2` opening brackets `'['` and `n / 2` closing brackets `']'`.
Return the minimum number of swaps to make the string balanced.

### Solution
Track open (unmatched `'['` count) and close (unmatched `']'` count). Each swap can fix 2 mismatched pairs of brackets at once by swapping an opening bracket from the right with a closing bracket on the left. The number of swaps required is `(open + 1) / 2`.

### Code
```cpp
class Solution {
public:
    int minSwaps(string s) {
        int open = 0, close = 0;

        for(int i=0; i<s.size(); i++) {
            if(s[i] == '[') open++;
            else {
                if(open > 0) open--;
                else close++;
            }
        }
        
        return (open+1)/2;
    }
};
```
