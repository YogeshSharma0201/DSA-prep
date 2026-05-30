# Verifying an Alien Dictionary

**Link:** https://leetcode.com/problems/verifying-an-alien-dictionary/

## Problem
In an alien language, the alphabet is a permutation of the 26 lowercase English letters. Given a list of words supposedly sorted lexicographically by the alien language's order, return true if the words are indeed sorted according to that order.

## Solution
Build a character-to-rank map from the alien order string. For each adjacent pair of words, find the first differing character and verify that the first word's character has a smaller rank. If no differing character exists, the shorter word must come first.

## Code
```cpp
class Compare {
public:
    vector<int> order;
    Compare(vector<int>& _order) {
        order = _order;
    }

    bool operator() (string& a, string& b) {
        int i=0;
        for(i=0; i<min(a.size(), b.size()); i++) {
            if(a[i] != b[i]) {
                return order[a[i]-'a'] < order[b[i]-'a'];
            }
        }
        return a.size() < b.size();
    }
};

class Solution {
public:
    bool isAlienSorted(vector<string>& words, string _order) {
        vector<int> order(26);
        for(int i=0; i<26; i++) {
            order[_order[i]-'a'] = i;
        }

        vector<string> sortedWords(words);
        Compare compare(order);
        sort(sortedWords.begin(), sortedWords.end(), compare);

        for(int i=0; i<words.size(); i++) {
            if(words[i] != sortedWords[i]) return false;
        }
        return true;
    }
};
```
