# Max Value of Equation

**Link:** https://leetcode.com/problems/max-value-of-equation/

## Problem
Given an array of points sorted by x-coordinate and an integer `k`, find the maximum value of `yi + yj + |xi - xj|` where `|xi - xj| <= k` and `i < j`. Since points are sorted by x-coordinate, `|xi - xj| = xj - xi`.

---

## Solutions

### Mathematical Transformation
Rewrite the target expression:
$$y_i + y_j + (x_j - x_i) = (y_i - x_i) + (y_j + x_j)$$
For each point $j = (x_j, y_j)$, we want to find a previous point $i$ such that $x_j - x_i \le k$ that maximizes $(y_i - x_i)$.

---

### Approach 1: Max-Heap / Priority Queue — O(N log N) Time, O(N) Space
- Maintain a Max-Heap (`priority_queue<pair<int, int>>`) storing pairs `(y_i - x_i, x_i)`.
- For each point $j$:
  1. Pop elements from heap whose $x_j - x_i > k$.
  2. If heap is not empty, `pq.top()` gives the maximum $(y_i - x_i)$ within valid range $k$. Update answer with `points[j][1] + pq.top().first + points[j][0]`.
  3. Push current point $(y_j - x_j, x_j)$ into the heap.

---

### Approach 2: Monotonic Deque — O(N) Time, O(N) Space (Optimal)
- Use a `deque<pair<int, int>>` storing `(y_i - x_i, x_i)` in strictly decreasing order of $(y_i - x_i)$.
- For each point $j$:
  1. Remove expired elements from the front where $x_j - x_{front} > k$.
  2. If deque is not empty, candidate max is `dq.front().first + y_j + x_j`.
  3. Maintain decreasing order by popping elements from back while `(y_j - x_j) >= dq.back().first`.
  4. Push $(y_j - x_j, x_j)$ to back.

---

## Code

### Approach 1: Max-Heap / Priority Queue (Clean O(N log N))

```cpp
class Solution {
public:
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        priority_queue<pair<int,int>> pq; // stores {yi - xi, xi}

        int maxV = -(INT_MAX >> 1);
        for (int i = 0; i < points.size(); i++) {
            // Remove points out of distance k
            while (!pq.empty() && points[i][0] - pq.top().second > k) {
                pq.pop();
            }

            // Top of pq has max (yi - xi) within range k
            if (!pq.empty()) {
                maxV = max(maxV, points[i][1] + pq.top().first + points[i][0]);
            }

            // Push current point {yi - xi, xi}
            pq.push({points[i][1] - points[i][0], points[i][0]});
        }

        return maxV;
    }
};
```

### Approach 2: Monotonic Deque (Optimal O(N))

```cpp
class Solution {
public:
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        deque<pair<int, int>> dq; // stores {yi - xi, xi} in decreasing order of (yi - xi)
        int maxV = INT_MIN;

        for (auto& pt : points) {
            int x = pt[0], y = pt[1];

            // Remove elements out of window k
            while (!dq.empty() && x - dq.front().second > k) {
                dq.pop_front();
            }

            // Update max value
            if (!dq.empty()) {
                maxV = max(maxV, y + x + dq.front().first);
            }

            // Maintain monotonic decreasing order
            while (!dq.empty() && (y - x) >= dq.back().first) {
                dq.pop_back();
            }

            dq.push_back({y - x, x});
        }

        return maxV;
    }
};
```

