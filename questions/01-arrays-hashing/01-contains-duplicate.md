# Contains Duplicate

**Link:** https://leetcode.com/problems/contains-duplicate/

## Problem
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and `false` if every element is distinct. The array can contain negative numbers and zero. A single pass through the array is sufficient.

## Solution
Use an unordered map (hash set) to track elements seen so far. For each element, check if it already exists in the map. If it does, return `true` immediately. If the loop completes without a match, return `false`.

## Code
```cpp
bool containsDuplicate(vector<int>& nums) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        if (mp.find(nums[i]) != mp.end()) return true;
        mp[nums[i]] = i;
    }
    return false;
}
```
