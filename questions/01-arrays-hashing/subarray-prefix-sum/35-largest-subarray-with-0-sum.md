# Largest Subarray with 0 Sum

**Link:** https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1

## Problem
Given an array having both positive and negative integers. The task is to compute the length of the largest subarray with sum equal to 0.

## Solution
We can solve this problem in O(N) time and O(N) space using prefix sum and hashing.
As we traverse the array, we keep track of the running prefix sum. If the same prefix sum has been seen before at some index `j`, it means the sum of the elements between `j + 1` and the current index `i` is 0.
To find the **largest** subarray, we should store only the *first* occurrence of each prefix sum in a hash map.

> [!IMPORTANT]
> **Why Two-Pointer / Sliding Window cannot be used:**
> A two-pointer sliding window cannot be used because the array can contain negative numbers. In a sliding window, we expand or contract the window based on a monotonic relation (e.g., if the window sum is too small we expand, if it's too large we contract). With negative numbers present, adding elements can decrease the sum and removing elements can increase the sum. Thus, it is not clear when to move the left and right pointers, and the search space does not possess the monotonicity property needed for a two-pointer approach.

## Code

```cpp
class Solution {
  public:
    int maxLen(vector<int>& arr, int n) {
        unordered_map<int, int> mp; // {prefix_sum -> first_occurrence_index}
        mp[0] = -1; // Seed to handle subarrays starting from index 0
        
        int max_len = 0;
        int sum = 0;
        
        for (int i = 0; i < n; i++) {
            sum += arr[i];
            
            if (mp.find(sum) != mp.end()) {
                max_len = max(max_len, i - mp[sum]);
            } else {
                mp[sum] = i;
            }
        }
        
        return max_len;
    }
};
```
