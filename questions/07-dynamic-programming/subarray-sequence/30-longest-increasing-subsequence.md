# Longest Increasing Subsequence

**Link:** [Longest Increasing Subsequence - LeetCode](https://leetcode.com/problems/longest-increasing-subsequence)

## Problem
Given an integer array `nums`, find the length of the longest strictly increasing subsequence. A subsequence is derived by deleting some or no elements without changing the relative order of the remaining elements.

---

## Solution 1: Standard $\mathcal{O}(n^2)$ Dynamic Programming

### Approach
Define `lis[i]` = length of LIS ending at index `i`. For each `i`, look back at all `j < i` where `nums[j] < nums[i]` and take $\max(\text{lis}[j] + 1)$.

```cpp
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size(), maxR = 0;
    vector<int> lis(n, 0);
    for(int i=0; i<n; i++) {
        int maxS = 1;
        for(int j=i-1; j>=0; j--)
            if(nums[j] < nums[i]) maxS = max(lis[j]+1, maxS);
        lis[i] = maxS;
        maxR = max(maxR, maxS);
    }
    return maxR;
}
```
- **Time Complexity:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(n)$

---

## Solution 2: Patience Sorting / Binary Search ($\mathcal{O}(n \log n)$ Optimal)

### Approach
Maintain a `tails` array where `tails[i]` stores the smallest tail of all increasing subsequences of length `i+1`.
For each number:
- If it is strictly greater than all elements in `tails`, append it (LIS grows).
- Otherwise, binary search (`lower_bound`) for the first element $\ge \text{nums}[i]$ and replace it.

```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> lis;
    lis.push_back(nums[0]);
    for(int i=1; i<nums.size(); i++) {
        if(lis[lis.size()-1] < nums[i]) {
            lis.push_back(nums[i]);
        }
        else {
            int idx = lower_bound(lis.begin(), lis.end(), nums[i]) - lis.begin();
            lis[idx] = nums[i];
        }
    }
    return lis.size();
}
```
- **Time Complexity:** $\mathcal{O}(n \log n)$
- **Space Complexity:** $\mathcal{O}(n)$

---

## Solution 3: Priority Queue / Value-Sorting Approach ($\mathcal{O}(n^2)$ or $\mathcal{O}(n \log n)$ with Fenwick Tree)

### Concept & Connection to 2D Matrix LIP
Just like in 2D Matrix Longest Increasing Path, we can process elements in **increasing order of their values** using a **Min-Heap (Priority Queue)**.

1. Store `{nums[i], -i}` in a Min-Heap (or sort by value ascending, index descending for duplicates so identical values don't extend each other).
2. Because we extract elements in increasing value order, any element popped from the heap has a strictly smaller value than future popped elements.
3. For each popped pair `(val, index i)`:
   - Search for previously processed elements at index $j < i$.
   - Transition: `dp[i] = max(dp[i], dp[j] + 1)`.

### Code A: Direct Priority Queue Approach ($\mathcal{O}(n^2)$)
```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        // Min-heap storing {value, -index}
        // -index ensures larger indices are processed first for duplicate values
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        for (int i = 0; i < n; i++) {
            pq.push({nums[i], -i});
        }

        vector<int> dp(n, 1);
        int maxLIS = 0;

        while (!pq.empty()) {
            auto [val, neg_i] = pq.top();
            pq.pop();
            int i = -neg_i;

            // All previously popped elements have smaller value.
            // Check for previous elements with index j < i.
            for (int j = 0; j < i; j++) {
                if (nums[j] < val) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxLIS = max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
};
```
- **Time Complexity:** $\mathcal{O}(n^2)$ — $\mathcal{O}(n \log n)$ heap pops + $\mathcal{O}(n)$ index checks per element.
- **Space Complexity:** $\mathcal{O}(n)$

---

### Code B: Priority Queue + Fenwick Tree / BIT ($\mathcal{O}(n \log n)$)
By pairing the Priority Queue / Value-Sorting order with a **Fenwick Tree (BIT)** over the index range $[0, n-1]$, querying $\max_{j < i} \text{dp}[j]$ takes $\mathcal{O}(\log n)$ time instead of $\mathcal{O}(n)$.

```cpp
class Solution {
public:
    struct FenwickTree {
        int size;
        vector<int> tree;
        FenwickTree(int n) : size(n), tree(n + 1, 0) {}

        void update(int i, int val) {
            for (i++; i <= size; i += i & -i)
                tree[i] = max(tree[i], val);
        }

        int query(int i) {
            int maxV = 0;
            for (i++; i > 0; i -= i & -i)
                maxV = max(maxV, tree[i]);
            return maxV;
        }
    };

    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        // Heap storing {value, -index}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        for (int i = 0; i < n; i++) {
            pq.push({nums[i], -i});
        }

        FenwickTree bit(n);
        int maxLIS = 0;

        while (!pq.empty()) {
            auto [val, neg_i] = pq.top();
            pq.pop();
            int i = -neg_i;

            // Query max DP in index range [0 ... i - 1] in O(log n)
            int currentDP = 1 + bit.query(i - 1);
            bit.update(i, currentDP);

            maxLIS = max(maxLIS, currentDP);
        }

        return maxLIS;
    }
};
```
- **Time Complexity:** $\mathcal{O}(n \log n)$ — Heap sorting $\mathcal{O}(n \log n)$ + Fenwick Tree updates/queries $\mathcal{O}(n \log n)$.
- **Space Complexity:** $\mathcal{O}(n)$

---

## Comparison of Approaches

| Solution | Concept | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- |
| **1. Standard DP** | Lookback over $j < i$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n)$ |
| **2. Patience Sort** | Binary search on active tails | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ |
| **3A. Priority Queue** | Value-sorted topological order | $\mathcal{O}(n^2)$ | $\mathcal{O}(n)$ |
| **3B. PQ + Fenwick Tree** | Value-sorted + Point update / Range max query | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ |
