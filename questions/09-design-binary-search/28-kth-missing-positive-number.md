# Kth Missing Positive Number

**Link:** https://leetcode.com/problems/kth-missing-positive-number/

## Problem
Given a sorted array of distinct positive integers and an integer k, return the k-th missing positive number.

## Solution
`arr[i] - i - 1` gives the count of missing positive numbers before index `i` (since without any missing, `arr[i]` would equal `i+1`). Binary search for the first index where this count >= k. After the loop, two cases:
- `arr[l] - l - 1 >= k`: the k-th missing is before `arr[l]`, answer = `k + l`
- `arr[l] - l - 1 < k`: the k-th missing is past the entire array, answer = `k + l + 1`

Both cases collapse to `k + (arr[l] - l - 1 < k ? l+1 : l)`.

## Code
```cpp
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int n = arr.size();
        int l = 0, r = n-1;

        while(l < r) {
            int mid = (l+r) >> 1;

            if(arr[mid] - mid - 1 < k) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }

        return k + (arr[l] - l - 1 < k ? l+1 : l);
    }
};
```
