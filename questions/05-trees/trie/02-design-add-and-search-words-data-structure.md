# Design Add and Search Words Data Structure

**Link:** [Design Add and Search Words Data Structure - LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

## Problem Description

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:
- `WordDictionary()` Initializes the object.
- `void addWord(word)` Adds `word` to the data structure, it can be matched later.
- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

---

## Solution: Trie with Wildcard DFS Search

### Key Intuition
- Use a Trie structure `TNode` with child array of size 26 for lowercase English letters `'a'` to `'z'` and a boolean flag `isEnd`.
- Insertion (`addWord`) is a standard Trie insert.
- Search (`search` / `searchInternal`):
  - When encountering a regular character `c`, navigate to `curr->child[c - 'a']`.
  - When encountering the wildcard character `'.'`: test all 26 possible non-null child nodes recursively (DFS/Backtracking). If any child branch succeeds, return `true`.
  - When the end of the word (`i == word.size()`) is reached, return `curr->isEnd`.

### Complexity Analysis
- **Time Complexity:**
  - `addWord`: $\mathcal{O}(M)$ where $M$ is the length of the word.
  - `search`: $\mathcal{O}(M)$ for words without dots. For words containing dots, worst-case time is $\mathcal{O}(26^M)$ (bounded by the number of nodes in the Trie).
- **Space Complexity:** $\mathcal{O}(N \cdot M)$ total space across all Trie nodes, where $N$ is the number of words added and $M$ is the average word length.

---

## Code (C++)

```cpp
#include <string>
#include <vector>
using namespace std;

struct TNode {
    TNode *child[26] = {NULL};
    bool isEnd = false;

    TNode() {
    }
};

class WordDictionary {
    TNode *head;
public:
    WordDictionary() {
        head = new TNode();
    }
    
    void addWord(string word) {
        TNode *curr = head;

        int i = 0;
        while(i < word.size()) {
            int idx = word[i] - 'a';
            if(curr->child[idx] == NULL) {
                curr->child[idx] = new TNode();
            }
            curr = curr->child[idx];
            i++;
        }
        curr->isEnd = true;
    }
    
    bool search(string word) {
        return searchInternal(word, head, 0);
    }

    bool searchInternal(string& word, TNode* curr, int i = 0) {
        if(i == word.size()) return curr->isEnd;

        if(word[i] == '.') {
            for(int j = 0; j < 26; j++) {
                if(curr->child[j] && searchInternal(word, curr->child[j], i + 1))
                    return true;
            }
            return false;
        }
        else {
            int idx = word[i] - 'a';
            if(curr->child[idx] == NULL) return false;
            return searchInternal(word, curr->child[idx], i + 1);
        }
    }
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary* obj = new WordDictionary();
 * obj->addWord(word);
 * bool param_2 = obj->search(word);
 */
```
