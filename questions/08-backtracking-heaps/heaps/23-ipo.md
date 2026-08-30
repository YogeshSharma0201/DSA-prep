# IPO

**Link:** https://leetcode.com/problems/ipo/

## Problem
Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most `k` distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most `k` distinct projects.

You are given `n` projects where the `i-th` project has a pure profit `profits[i]` and a minimum capital of `capital[i]` is needed to start it.

Initially, you have `w` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most `k` distinct projects from given projects to maximize your final capital, and return the final maximized capital.

---

## Solution (Greedy with Max-Heap)

### Approach
1. **Sort Projects by Capital**:
   - Pair each project's required capital with its profit: `(capital[i], profits[i])`.
   - Sort the pairs in ascending order of capital required.
2. **Greedy Selection via Max-Heap**:
   - Maintain a max-heap of profits for all projects that we can currently afford (i.e., `capital <= current_capital`).
   - In each of the `k` iterations:
     - Push all newly affordable projects into the max-heap.
     - If the max-heap is empty, we cannot afford any more projects, so break early.
     - Greedily pick the project with the highest profit (`pq.top()`), add its profit to current capital, and pop it from the heap.
3. **Complexity**:
   - **Time Complexity:** O(n log n + k log n) — O(n log n) to sort the projects and at most $n$ insertions and $k$ removals from the priority queue.
   - **Space Complexity:** O(n) — to store project pairs and the priority queue.

---

## Code

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        int n = profits.size();
        vector<pair<int, int>> pc(n);
        for (int i = 0; i < n; i++) {
            pc[i] = {capital[i], profits[i]};
        }

        // Sort projects by required capital in ascending order
        sort(pc.begin(), pc.end());

        // Max-heap to store available project profits
        priority_queue<pair<int, int>> pq;

        int ans = w, idx = 0, cnt = 0;
        
        while ((!pq.empty() || idx < n) && cnt++ < k) {
            // Push all affordable projects to the max-heap
            while (idx < n && pc[idx].first <= ans) {
                pq.push({pc[idx].second, idx++});
            }

            if (pq.empty()) break;

            // Pick the project that yields the maximum profit
            ans += pq.top().first;
            pq.pop();
        }

        return ans;
    }
};
```
