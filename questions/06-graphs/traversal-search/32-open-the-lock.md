# Open the Lock

**Link:** [Open the Lock - LeetCode](https://leetcode.com/problems/open-the-lock/)

## Problem

You have a lock with 4 circular wheels. Each wheel has 10 slots: `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'`. The wheels wrap around: `'9'` turns to `'0'` and `'0'` turns to `'9'`. Each move consists of turning one wheel by one slot forward or backward.

The lock starts at `'0000'`. You are given a list of `deadends`. If the lock reaches any combination in `deadends`, it gets stuck and cannot turn further.

Given a `target` combination, return the **minimum total number of turns** required to open the lock, or `-1` if it is impossible.

---

## Solution (Breadth-First Search - BFS)

This problem can be modeled as finding the **shortest path in an unweighted graph**, where:
- **Nodes** represent lock combinations (strings of length 4, total $10^4 = 10,000$ states).
- **Edges** represent valid single wheel turns. Each state has 8 adjacent states (4 wheels $\times$ 2 direction turns).
- **Obstacles** are the `deadends` combinations.

### Algorithm
1. Store all `deadends` in a hash set/map `dmap` for O(1) lookup.
2. If `'0000'` is in `deadends`, returning `-1` immediately since we cannot start.
3. Use a `queue` for BFS, starting with `(0, "0000")` representing `(distance, state)`.
4. Maintain a hash map `dist` to track visited states and their shortest distance from `'0000'`.
5. For each state dequeued, generate all 8 valid adjacent states:
   - If an adjacent state is a deadend or has already been visited, skip it.
   - Otherwise, record its distance `d + 1`, push it into the queue, and if it equals `target`, return `d + 1`.
6. If the queue becomes empty without reaching `target`, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** O(V + E) = O(10^4 + 8 * 10^4) = O(1) (bounded by $10,000$ states and $80,000$ transitions).
- **Space Complexity:** O(V + D) for the BFS queue, `dist` hash map, and `deadends` set.

---

## Code

```cpp
class Solution {
    int dir[2] = {-1, 1};
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_map<string, int> dist, dmap;

        queue<pair<int, string>> pq;
        pq.push({0, "0000"});

        for(string str : deadends) 
            dmap[str]++;

        if(dmap["0000"] > 0) return -1;
        if(target == "0000") return 0;

        while(!pq.empty()) {
            auto [d, s] = pq.front(); pq.pop();

            dist[s] = d;

            for(int i = 0; i < 4; i++) {
                string nextS = s;
                
                for(int dx : dir) {
                    nextS[i] = (s[i] - '0' + dx + 10) % 10 + '0';

                    if(dmap.count(nextS) || dist.count(nextS)) continue;

                    dist[nextS] = d + 1;
                    pq.push({d + 1, nextS});
                    if(nextS == target)
                        return d + 1;
                }              
            }
        }

        return dist.count(target) ? dist[target] : -1;
    }
};
```
