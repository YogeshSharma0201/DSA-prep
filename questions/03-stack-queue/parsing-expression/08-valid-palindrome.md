# Valid Palindrome

**Link:** https://leetcode.com/problems/valid-palindrome/

## Problem
Given a string s, determine if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters. An empty string is considered a valid palindrome.

## Solution
Use two pointers starting from both ends of the string. At each step, skip characters that are not alphanumeric using isalnum(). Compare the lowercase versions of the characters at both pointers. If any mismatch is found, return false. Return true if the pointers meet without finding a mismatch.

## Code
```cpp
bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;

    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;

        if (tolower(s[l]) != tolower(s[r])) return false;
        l++;
        r--;
    }

    return true;
}
```
