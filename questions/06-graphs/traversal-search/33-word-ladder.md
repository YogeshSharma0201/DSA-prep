# Word Ladder

**Link:** [Word Ladder - LeetCode](https://leetcode.com/problems/word-ladder/)

## Problem

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
- Every adjacent pair of words differs by single character.
- Every `si` for `1 <= i <= k` is in `wordList`. (Note: `beginWord` does not need to be in `wordList` initially).
- `sk == endWord`.

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

---

## Solution (Graph BFS / Shortest Path)

### Intuition
This problem can be modeled as finding the **shortest path in an unweighted graph**:
- **Nodes:** Words in `wordList` (plus `beginWord`).
- **Edges:** An undirected edge connects two words if they differ by exactly **1 character**.
- **Goal:** Find the shortest path length from `beginWord` to `endWord`.

Because edge weights are unweighted (each transformation step cost = 1), **Breadth-First Search (BFS)** guarantees finding the shortest transformation sequence.

### Algorithm
1. Insert all words from `wordList` and `beginWord` into a hash set `uset` for O(1) lookup.
2. If `endWord` is not in `uset`, return `0` immediately.
3. Build an adjacency graph `adj`:
   - For each word $s$, iterate through each of its $L$ character positions.
   - Try substituting characters `'a'` through `'z'`. If the modified word exists in `uset`, add a directed/undirected edge `t -> s`.
4. Perform BFS starting from `beginWord` initialized at distance `1`:
   - Dequeue `(distance, word)`.
   - If `word == endWord`, return `distance`.
   - For all neighbors in `adj[word]` that have not been visited, mark them visited and push `(distance + 1, neighbor)` into the queue.
5. If BFS completes without finding `endWord`, return `0`.

---

## Complexity Analysis

- **Time Complexity:** O(N * L * 26) where $N$ is the number of words in `wordList` and $L$ is the length of each word. Building the graph takes O(N * L * 26) operations, and BFS traverses nodes and edges in O(V + E) time.
- **Space Complexity:** O(N * L) for storing the `uset`, adjacency list `adj`, BFS queue, and visited set `isVis`.

---

## Code

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> uset(wordList.begin(), wordList.end());
        uset.insert(beginWord);
        
        if(!uset.count(endWord)) return 0;

        unordered_map<string, vector<string>> adj;

        for(auto s : uset) {
            string t = s;
            for(int i = 0; i < s.size(); i++) {
                for(int c = 'a'; c <= 'z'; c++) {
                    if(c == t[i]) continue;
                    s[i] = c;
                    if(uset.count(s)) {
                        adj[t].push_back(s);
                    } 
                }
                s[i] = t[i];
            }
        }

        queue<pair<int, string>> q;
        q.push({1, beginWord});
        unordered_set<string> isVis;
        isVis.insert(beginWord);

        while(!q.empty()) {
            auto [d, str] = q.front(); q.pop();

            if(str == endWord) return d;

            for(auto as : adj[str]) {
                if(!isVis.count(as)) {
                    isVis.insert(as);
                    q.push({d + 1, as});
                }
            }
        }
        
        return 0;
    }
};
```
