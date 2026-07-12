# Minimum Deletions to Make Character Frequencies Unique

**Link:** https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique

## Problem
A string s is called "good" if there are no two different characters with the same frequency. Given a string s, return the minimum number of characters you need to delete to make s good.

## Solution
Count frequencies of all characters and sort them in descending order. Maintain a set of used frequencies. For each frequency, repeatedly decrement it while it's already in the used set (each decrement counts as one deletion), stopping at 0. Add the final frequency to the used set.

## Code
```cpp
class Solution {
public:
    int minDeletions(string s) {
        vector<int> freq(26, 0);
        for (char c : s) freq[c - 'a']++;

        sort(freq.rbegin(), freq.rend());
        set<int> used;
        int deletions = 0;

        for (int f : freq) {
            if (f == 0) break;
            while (f > 0 && used.count(f)) {
                f--;
                deletions++;
            }
            if (f > 0) used.insert(f);
        }
        return deletions;
    }
};
```
