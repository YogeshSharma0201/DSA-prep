# Shortest Subarray with Sum at Least K

**Link:** https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/

## Problem
Given an integer array (which may contain negative numbers) and an integer k, return the length of the shortest non-empty subarray whose sum is at least k. If no such subarray exists, return -1.

## Solution
Compute prefix sums. Use a monotonic deque of `(prefix, index)` pairs maintained in increasing order of prefix value. For each index i, pop from the front while `prefix[i] - deque.front().prefix >= k` to find valid subarrays and update the minimum length. Then pop from the back while `prefix[i] <= deque.back().prefix` to maintain the monotonic invariant, and push the current prefix.

## Code

**Old `search()` (right-search template, right-biased mid):**
```cpp
int search(vector<pair<long long,int>>& arr, long long num) {
    int lo = 0, hi = arr.size()-1;
    int mid;

    while(lo < hi) {
        mid = (lo+hi+1)>>1;          // right-biased mid to avoid infinite loop

        if(arr[mid].first <= num) {
            lo = mid;                 // right-search: lo tracks last valid position
        }
        else {
            hi = mid-1;
        }
    }

    return arr[lo].first <= num ? lo : -1;  // validate lo before returning
}
```

**New `search()` (left-search template, inverted condition, return `lo - 1`):**
```cpp
int search(vector<pair<long long,int>>& arr, long long num) {
    // Goal: last index where arr[idx].first <= num
    // Equivalent: first index where arr[idx].first > num, return lo - 1
    int lo = 0, hi = arr.size();             // hi = size (past-the-end, always > num conceptually)
    while (lo < hi) {
        int mid = (lo + hi) >> 1;            // left-biased mid (standard left-search)
        if (arr[mid].first > num) hi = mid;  // inverted condition: first false
        else                      lo = mid + 1;
    }
    return lo - 1;  // lo-1 is last index where arr[idx].first <= num; -1 if none
}

int shortestSubarray(vector<int>& nums, int k) {
    vector<pair<long long,int>> arr;
    arr.push_back({0, -1});

    int n = nums.size();
    long long pre = 0;
    int res = INT_MAX>>1;
    for(int i=0; i<n; i++) {
        pre += nums[i];

        int idx = search(arr, pre-k);
        if(idx != -1) {
            res = min(res, i-arr[idx].second);
        }

        while(arr.size() && arr.back().first >= pre) {
            arr.pop_back();
        }
        arr.push_back({pre, i});
    }

    return res == INT_MAX>>1 ? -1 : res;
}
```
