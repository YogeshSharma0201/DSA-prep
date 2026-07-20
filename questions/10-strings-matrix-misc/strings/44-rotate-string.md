# Check if String is Rotation

**Link:** https://leetcode.com/problems/rotate-string

## Problem
Given strings `s` and `goal`, return true if and only if `s` can become `goal` after some number of rotations. A rotation shifts the leftmost character to the rightmost position.

## Solution
Concatenate `s` with itself to get `s+s`. If `goal` is a rotation of `s`, then `goal` must appear as a substring of `s+s`. Check this using the built-in find function. Also ensure lengths are equal.

## Code
```cpp
bool rotateString(string s, string goal) {
    if (s.size() != goal.size()) return false;
    return (s + s).find(goal) != string::npos;
}
```
