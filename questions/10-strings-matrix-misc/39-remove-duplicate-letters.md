# Remove Duplicate Letters

**Link:** https://leetcode.com/problems/remove-duplicate-letters

## Problem
Given a string `s`, remove duplicate letters so that every letter appears once and only once. Return the result such that the result is the smallest in lexicographical order among all possible results.

## Solution
Use a greedy approach with a monotonic stack. For each character, if it's already in the stack skip it. Otherwise pop stack elements that are larger than the current character and will appear later. Push the current character and mark it as in the stack.

## Code
```cpp
string removeDuplicateLetters(string s) {
    vector<int> count(26, 0);
    vector<bool> inStack(26, false);
    for (char c : s) count[c - 'a']++;
    string stack;
    for (char c : s) {
        count[c - 'a']--;
        if (inStack[c - 'a']) continue;
        while (!stack.empty() && stack.back() > c && count[stack.back() - 'a'] > 0) {
            inStack[stack.back() - 'a'] = false;
            stack.pop_back();
        }
        stack += c;
        inStack[c - 'a'] = true;
    }
    return stack;
}
```
