# K-th Smallest Prime Fraction

**Link:** https://leetcode.com/problems/k-th-smallest-prime-fraction/

## Problem
Given a sorted array of prime numbers including 1, and an integer k, return the k-th smallest fraction formed by `arr[i] / arr[j]` where `i < j`. The result should be returned as a two-element array `[arr[i], arr[j]]`.

## Solution
Use a min-heap initialized with `(arr[0]/arr[j], 0, j)` for every valid `j`. Repeatedly pop the smallest fraction; for the popped entry `(val, i, j)`, push the next fraction in the same column: `(arr[i+1]/arr[j], i+1, j)`. After k pops, the last popped entry gives the answer.

## Code
```cpp
class Solution {
public:
    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
        int n = arr.size();
        // min-heap: (fraction value, numerator index, denominator index)
        using T = tuple<double, int, int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        for (int j = 1; j < n; j++)
            pq.push({(double)arr[0] / arr[j], 0, j});

        for (int count = 0; count < k - 1; count++) {
            auto [val, i, j] = pq.top(); pq.pop();
            if (i + 1 < j)
                pq.push({(double)arr[i+1] / arr[j], i+1, j});
        }

        auto [val, i, j] = pq.top();
        return {arr[i], arr[j]};
    }
};
```
