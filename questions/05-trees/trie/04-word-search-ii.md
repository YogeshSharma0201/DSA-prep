# Word Search II

**Link:** [Word Search II - LeetCode](https://leetcode.com/problems/word-search-ii/)

## Problem Description

Given an `m x n` `board` of characters and a list of strings `words`, return *all words on the board*.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

---

## Solution: Trie + Grid DFS (Backtracking)

### Key Intuition
- **Naive Approach:** Running standard Word Search DFS for every single word in `words` across all grid cells leading to redundant grid traversals.
- **Trie Optimization:**
  1. Build a **Trie** containing all target `words`.
  2. Perform **DFS/Backtracking** from each cell `(i, j)` on the board, simultaneously traversing the Trie along with grid paths.
  3. If at any step `curr->child[ch] == NULL`, it means no word in the dictionary shares this prefix. We prune the DFS branch immediately!
  4. When `curr->isEnd == true` is reached, insert the constructed `path` into a set `res` (using `unordered_set` avoids duplicate results if a word can be formed via multiple paths).
  5. Backtrack grid cell visited state `isVisited[x][y] = false` and pop character from `path`.

### Complexity Analysis
- **Time Complexity:**
  - **Trie Construction:** $\mathcal{O}(W \cdot L)$ where $W$ is the number of words and $L$ is the max length of a word.
  - **Grid DFS:** Worst-case time is $\mathcal{O}(M \cdot N \cdot 4^L)$, but effectively heavily pruned by the Trie structure.
  - **Total Time Complexity:** $\mathcal{O}(W \cdot L + M \cdot N \cdot 4^{\min(L, M \cdot N)})$.
- **Space Complexity:**
  - **Trie Space:** $\mathcal{O}(W \cdot L \times 26)$.
  - **Recursion Stack + Path + Visited Grid:** $\mathcal{O}(L + M \cdot N)$.
  - **Total Space Complexity:** $\mathcal{O}(W \cdot L + M \cdot N)$.

---

## Code (C++)

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

struct TNode {
    bool isEnd = false;
    TNode* child[26] = {NULL};

    TNode() {
    }
};

class Solution {
    TNode* head;

    void insert(string& s) {
        TNode* curr = head;
        int i = 0;
        while(i < s.size()) {
            int idx = s[i] - 'a';
            if(curr->child[idx] == NULL) {
                curr->child[idx] = new TNode();
            }
            curr = curr->child[idx];
            i++;
        }
        curr->isEnd = true;
    }

    int dir[4][2] = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    
    // Insert word in result when encountering isEnd = true
    void dfs(int x, int y, TNode* curr, string& path, unordered_set<string>& res, vector<vector<char>>& board, vector<vector<bool>>& isVisited) {
        int m = board.size(), n = board[0].size();

        int ch = board[x][y] - 'a';
        if(curr->child[ch] == NULL) return; // Prefix is not in the Trie (Pruning)
        isVisited[x][y] = true;

        curr = curr->child[ch];
        path.push_back(board[x][y]);
        if(curr->isEnd) {
            res.insert(path);
        }

        for(auto di : dir) {
            int dx = x + di[0];
            int dy = y + di[1];

            if(dx < 0 || dx >= m || dy < 0 || dy >= n || isVisited[dx][dy]) 
                continue;

            dfs(dx, dy, curr, path, res, board, isVisited);
        }

        isVisited[x][y] = false;
        path.pop_back();
    }

public:
    // DFS on each cell with Trie to search words efficiently
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        head = new TNode();

        // Insert all words into Trie
        for(auto& w : words) {
            insert(w);
        }

        unordered_set<string> res;
        string path = "";

        int m = board.size(), n = board[0].size();
        vector<vector<bool>> isVisited(m, vector<bool>(n, false));

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                dfs(i, j, head, path, res, board, isVisited);
            }
        }

        vector<string> ret;
        for(auto& it : res) 
            ret.push_back(it);

        return ret;
    }
};
```
