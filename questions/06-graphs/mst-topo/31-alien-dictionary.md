# Alien Dictionary (Foreign Dictionary)

**Links:** 
- [LeetCode 269 - Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- [NeetCode - Foreign Dictionary](https://neetcode.io/problems/foreign-dictionary)

## Problem Description

There is a new alien language that uses the Latin alphabet. However, the order among the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are **sorted lexicographically** according to the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** according to the alien language's rules. If there is no solution, return `""`. If there are multiple valid orders, return **any of them**.

### Constraints & Rules:
1. Lexicographical order between two adjacent words $a$ and $b$ is determined **ONLY by their first mismatching character** ($a[j] \neq b[j]$), giving a directed edge $a[j] \to b[j]$.
2. Invalid Prefix Rule: If word $b$ is a prefix of word $a$ (e.g. $a = \text{"abc"}$, $b = \text{"ab"}$) and $a$ appears **before** $b$, then the dictionary is **invalid** $\to$ return `""`.
3. All unique characters present anywhere in `words` **must be included** in the output string.

---

## Key Edge Cases & Common Pitfalls

1. **Break After First Mismatch:** When comparing adjacent words `a` and `b`, you **MUST `break`** after finding the first mismatching character `a[j] != b[j]`. Characters after the first mismatch do *not* establish valid order rules and adding edges for them creates **false cycles**.
2. **Disconnected / Leaf Characters:** All unique characters across all words must be present in the final output. Collect all unique characters first so zero-indegree or isolated nodes are included.
3. **Cycle Detection:** If the graph contains a directed cycle (e.g. `a -> b -> a`), return `""`.

---

## Solution 1: DFS-based (3-State Array Cycle Detection)

### Algorithm
1. Collect all unique characters in `visited` map (state initialized to `0 = Unvisited`).
2. Build adjacency list `adj` by comparing adjacent words `words[i]` and `words[i+1]`.
   - Check invalid prefix condition: `if (a.size() > b.size() && a.substr(0, minLen) == b) return "";`
   - Find first mismatch `a[j] != b[j]`, insert directed edge `a[j] -> b[j]`, and **`break`**.
3. Run DFS for all unique characters. Use 3-state tracking (`0 = Unvisited`, `1 = Visiting`, `2 = Visited`) for cycle detection.
4. Push node to result list when exiting DFS (post-order), then reverse the result string.

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(C + V + E)$ where $C$ is total number of characters in all words, $V \le 26$ unique letters, and $E \le N - 1$ edges. Overall $\mathcal{O}(C)$.
- **Space Complexity:** $\mathcal{O}(V + E) = \mathcal{O}(1)$ since $V \le 26$.

### Code (C++)

```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> visited; // 0 = Unvisited, 1 = Visiting, 2 = Visited

public:
    string foreignDictionary(vector<string>& words) {
        // 1. Initialize visited map for ALL unique characters present in words
        for (const string& word : words) {
            for (char c : word) {
                visited[c] = 0;
            }
        }

        // 2. Build graph by comparing adjacent words
        int n = words.size();
        for (int i = 0; i < n - 1; i++) {
            const string& a = words[i];
            const string& b = words[i + 1];

            int minLen = min(a.size(), b.size());

            // Invalid prefix rule: e.g., a = "abc", b = "ab" ("abc" cannot precede "ab")
            if (a.size() > b.size() && a.substr(0, minLen) == b) {
                return "";
            }

            for (int j = 0; j < minLen; j++) {
                if (a[j] != b[j]) {
                    adj[a[j]].insert(b[j]);
                    break; // CRITICAL: Stop immediately after the FIRST mismatch!
                }
            }
        }

        // 3. DFS to find Topological Sort & detect cycles
        string ret;
        for (auto& pair : visited) {
            char ch = pair.first;
            if (visited[ch] == 0) {
                if (dfs(ch, ret)) {
                    return ""; // Cycle detected
                }
            }
        }

        reverse(ret.begin(), ret.end());
        return ret;
    }

private:
    bool dfs(char ch, string& result) {
        if (visited[ch] == 2) return false;
        if (visited[ch] == 1) return true; // Cycle detected!

        visited[ch] = 1; // Mark as visiting (on current path)

        for (char neighbor : adj[ch]) {
            if (dfs(neighbor, result)) {
                return true;
            }
        }

        visited[ch] = 2; // Mark as visited (fully processed)
        result.push_back(ch);
        return false;
    }
};
```

---

## Solution 2: BFS-based (Kahn's Algorithm)

### Algorithm
1. Calculate `inDegree` for all unique characters.
2. Enqueue all characters with `inDegree == 0`.
3. Process nodes with BFS: pop `u`, append `u` to result string, and decrement `inDegree[v]` for all neighbors `v`. Enqueue `v` when `inDegree[v] == 0`.
4. If `result.size() != total_unique_characters`, a **cycle exists** $\to$ return `""`.

### Code (C++)

```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <algorithm>
using namespace std;

class SolutionBFS {
public:
    string foreignDictionary(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;

        // Initialize inDegree for all unique characters
        for (const string& w : words) {
            for (char c : w) {
                inDegree[c] = 0;
            }
        }

        // Build graph
        int n = words.size();
        for (int i = 0; i < n - 1; i++) {
            const string& a = words[i];
            const string& b = words[i + 1];
            int minLen = min(a.size(), b.size());

            if (a.size() > b.size() && a.substr(0, minLen) == b) {
                return "";
            }

            for (int j = 0; j < minLen; j++) {
                if (a[j] != b[j]) {
                    if (adj[a[j]].find(b[j]) == adj[a[j]].end()) {
                        adj[a[j]].insert(b[j]);
                        inDegree[b[j]]++;
                    }
                    break; // CRITICAL: Stop after first mismatch
                }
            }
        }

        // Push all nodes with inDegree 0
        queue<char> q;
        for (auto& p : inDegree) {
            if (p.second == 0) {
                q.push(p.first);
            }
        }

        string result = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            result.push_back(u);

            for (char v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        return result.size() == inDegree.size() ? result : "";
    }
};
```
