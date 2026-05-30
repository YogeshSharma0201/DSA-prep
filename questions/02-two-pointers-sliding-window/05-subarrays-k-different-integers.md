# Subarrays with K Different Integers

**Link:** https://leetcode.com/problems/subarrays-with-k-different-integers/

## Problem
Given an integer array nums and an integer k, return the number of subarrays that contain exactly k different integers. A subarray is a contiguous part of the array.

## Solution
Use the identity: exactly(K) = atMost(K) - atMost(K-1). The atMost function uses a sliding window with two pointers. Two separate windows (sub1 and sub2) are maintained — sub1 for atMost(K) using a stricter shrink condition (any element exceeds count 1 OR distinct > K), and sub2 for atMost(K-1). The count contributed by each right index is k - l + 1.

## Code
```cpp
int subarraysWithKDistinct(vector<int>& nums, int K) {
    unordered_map<int, int> sub1, sub2;
    int n = nums.size();
    int k = 0, l = 0;

    int ret = 0;
    for (int i = 0; i < n; i++) {
        sub1[nums[i]]++;
        sub2[nums[i]]++;

        while (sub1[nums[k]] > 1 || sub1.size() > K) {
            sub1[nums[k]]--;
            if (sub1[nums[k]] == 0) sub1.erase(nums[k]);
            k++;
        }
        while (sub2.size() > K) {
            sub2[nums[l]]--;
            if (sub2[nums[l]] == 0) sub2.erase(nums[l]);
            l++;
        }

        if (sub1.size() == K) {
            ret += k - l + 1;
        }
    }

    return ret;
}
```
