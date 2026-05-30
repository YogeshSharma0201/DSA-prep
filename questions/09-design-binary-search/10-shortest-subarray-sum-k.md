# Shortest Subarray with Sum at Least K

**Link:** https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/

## Problem
Given an integer array (which may contain negative numbers) and an integer k, return the length of the shortest non-empty subarray whose sum is at least k. If no such subarray exists, return -1.

## Solution
Compute prefix sums. Use a monotonic deque of `(prefix, index)` pairs maintained in increasing order of prefix value. For each index i, pop from the front while `prefix[i] - deque.front().prefix >= k` to find valid subarrays and update the minimum length. Then pop from the back while `prefix[i] <= deque.back().prefix` to maintain the monotonic invariant, and push the current prefix.

## Code
```cpp
int search(vector<pair<long long,int>>& arr, long long num) {
    int lo = 0, hi = arr.size()-1;
    int mid;

    while(lo < hi) {
        mid = (lo+hi+1)>>1;

        if(arr[mid].first <= num) {
            lo = mid;
        }
        else {
            hi = mid-1;
        }
    }

    return arr[lo].first <= num ? lo : -1;
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
