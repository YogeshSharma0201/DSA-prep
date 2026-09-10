# Implement Trie (Prefix Tree)

**Link:** [LeetCode 208](https://leetcode.com/problems/implement-trie-prefix-tree/)

## Problem
A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the `Trie` class:
- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

## Solution
Use a tree-like node structure `TNode` where each node contains:
1. An array of child pointers of size 26 (for lowercase English letters 'a' through 'z'), initialized to `NULL`.
2. A boolean flag `isEnd` indicating whether the node represents the end of a complete word.

- **`insert(word)`**: Traverse character by character from the root node (`head`). If a child pointer for character `c` (index `c - 'a'`) does not exist, allocate a new `TNode`. Move to the child node. After processing all characters of `word`, set `isEnd = true`.
- **`search(word)`**: Traverse character by character. If at any step the child pointer for character `c` is `NULL`, return `false`. If traversal completes, return `curr->isEnd`.
- **`startsWith(prefix)`**: Traverse character by character following the prefix characters. If any child pointer is `NULL`, return `false`. If any child pointer is `NULL`, return `false`. If traversal completes successfully for all characters of `prefix`, return `true`.

### Complexity
- **Time Complexity:** 
  - `insert`: $O(L)$ where $L$ is the length of the word.
  - `search`: $O(L)$ where $L$ is the length of the word.
  - `startsWith`: $O(P)$ where $P$ is the length of the prefix.
- **Space Complexity:** $O(N \times L)$ total space across all nodes, where $N$ is the number of words inserted and $L$ is the average word length.

## Code
```cpp
struct TNode {
    TNode *child[26] = {NULL};
    bool isEnd = false;

    TNode() {
    }
};

class Trie {
    TNode *head;
public:
    Trie() {
        head = new TNode();
    }
    
    void insert(string word) {
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
        TNode *curr = head;

        int i = 0;
        while(i<word.size()) {
            int idx = word[i] - 'a';
            if(curr->child[idx] == NULL) return false;
            curr = curr->child[idx];
            i++;
        }

        return curr->isEnd;
    }
    
    bool startsWith(string prefix) {
        TNode *curr = head;

        int i = 0;
        while(i<prefix.size()) {
            int idx = prefix[i] - 'a';
            if(curr->child[idx] == NULL) return false;
            curr = curr->child[idx];
            i++;
        }

        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```
