# Reconstruct Itinerary

**Link:** https://leetcode.com/problems/reconstruct-itinerary/

## Problem
You are given a list of airline `tickets` where `tickets[i] = [from_i, to_i]` represent the departure and arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a person who departs from `"JFK"`, so the itinerary must begin with `"JFK"`. If there are multiple valid itineraries, return the itinerary that has the smallest lexical order when read as a single string.

- For example, the itinerary `["JFK", "LGA"]` has a smaller lexical order than `["JFK", "LGB"]`.

You must use all tickets once and only once. All airports are represented by 3 uppercase letters.

## Solution
This is a classic **Eulerian Path** problem on a directed graph, which can be solved using **Hierholzer's Algorithm** with DFS:

1. **Lexicographical Order & Adjacency List**:
   - Sort `tickets` in **descending order**. When pushed into the adjacency list `adj[from]`, the lexically smallest target airport will be positioned at the **back** of `adj[from]`.
   - This allows O(1) removal of the lexically smallest neighbor using `.back()` and `.pop_back()`.
2. **Post-Order DFS (Hierholzer's Algorithm)**:
   - Start DFS from `"JFK"`.
   - While `adj[curr]` has remaining outgoing edges, pop the last node `next` and recursively visit `dfs(next)`.
   - Once all outgoing edges from `curr` are processed, append `curr` to `res` (post-order insertion).
3. **Reversal**:
   - Reversing `res` gives the exact Eulerian path starting at `"JFK"`.

### Complexity
- **Time Complexity:** O(E log E) where $E$ is the number of tickets (due to sorting the tickets). The DFS traversal visits each edge exactly once in O(E) time.
- **Space Complexity:** O(V + E) to store the adjacency list map and recursion stack.

## Code
```cpp
class Solution {
public:
    void dfs(string curr, unordered_map<string, vector<string>>& adj, vector<string>& res) {
        // We sorted in descending order so that we
        // can easily remove lexically lower nodes from the end
        while(adj[curr].size()) {
            string next = adj[curr].back();
            adj[curr].pop_back();
            dfs(next, adj, res);
        }
        res.push_back(curr);
    }

    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, vector<string>> adj;

        // sorting in descending order
        sort(tickets.rbegin(), tickets.rend());

        for(auto ticket : tickets) {
            // adj list will also be in descending order
            // as tickets are in descending order
            adj[ticket[0]].push_back(ticket[1]);
        }

        vector<string> res;
        dfs("JFK", adj, res);
        reverse(res.begin(), res.end());

        return res;
    }
};
```
