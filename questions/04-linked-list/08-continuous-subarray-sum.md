# Continuous Subarray Sum

**Link:** https://leetcode.com/problems/continuous-subarray-sum/

## Problem
Given an integer array `nums` and an integer `k`, return `true` if there exists a good subarray — a contiguous subarray of length at least 2 whose sum is a multiple of `k`. Otherwise return `false`.

## Solution
Track the running prefix sum modulo `k`. If the same remainder was seen at an earlier index `j` and the current index `i` satisfies `i - j >= 2`, then the subarray from `j+1` to `i` has a sum divisible by `k`. Store each remainder's first occurrence index in a hashmap, seeding it with `{0: -1}` to handle subarrays starting at index 0.

## Code
```cpp
bool checkSubarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> map;
    map[0] = -1;

    int presum = 0;
    for(int i=0; i<nums.size(); i++) {
        int tem = presum + nums[i];
        if(map.find(tem % k) != map.end() && i-map[tem % k] >= 2) {
            return true;
        }
        if(map.find(tem % k) == map.end()) map[tem % k] = i;
        presum = tem;
    }

    return false;
}
```
