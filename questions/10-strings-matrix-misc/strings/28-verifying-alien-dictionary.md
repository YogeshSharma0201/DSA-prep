# Verifying an Alien Dictionary

**Link:** https://leetcode.com/problems/verifying-an-alien-dictionary/

## Problem
In an alien language, the alphabet is a permutation of the 26 lowercase English letters. Given a list of words supposedly sorted lexicographically by the alien language's order, return true if the words are indeed sorted according to that order.

## Solutions

### 1. Sorting-based (O(n log n))
Build a character-to-rank map from the alien order string. Sort a copy of words using a custom comparator, then compare with the original.

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

### 2. Adjacent-pair comparison (O(n), optimal)
Instead of sorting, iterate through adjacent pairs and check the alien order directly. This avoids the extra copy and sort.

```cpp
class Solution {
public:
    bool compare(string &a, string &b, vector<int>& _order) {
        for(int i=0; i<min(a.size(), b.size()); i++) {
            if(a[i] != b[i]) {
                return _order[a[i]-'a'] < _order[b[i]-'a'];
            }
        }
        return a.size() <= b.size();
    }

    bool isAlienSorted(vector<string>& words, string order) {
        vector<int> _order(26);
        for(int i=0; i<order.size(); i++) {
            _order[order[i]-'a'] = i;
        }

        for(int i=1; i<words.size(); i++) {
            if(!compare(words[i-1], words[i], _order)) return false;
        }
        return true;
    }
};
```
