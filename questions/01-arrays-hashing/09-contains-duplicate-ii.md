# Contains Duplicate II

**Link:** https://leetcode.com/problems/contains-duplicate-ii

## Problem
Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` such that `nums[i] == nums[j]` and `abs(i - j) <= k`. In other words, find a duplicate pair within a window of size `k`.

## Solution
Use a hash map to store each number's most recently seen index. For each element, check if it exists in the map and whether the distance from its last occurrence to the current index is at most `k`. If so, return `true`. Otherwise update the map with the current index. This runs in O(n) time and O(n) space.

## Code
```cpp
bool containsNearbyDuplicate(vector<int>& nums, int k) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        if (mp.find(nums[i]) != mp.end() && i - mp[nums[i]] <= k) {
            return true;
        }
        mp[nums[i]] = i;
    }
    return false;
}
```
