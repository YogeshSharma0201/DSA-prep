# Two Sum

**Link:** https://leetcode.com/problems/two-sum/

## Problem
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Each input has exactly one solution, and the same element cannot be used twice. The returned indices can be in any order.

## Solution
Use a hash map to store each number and its index as you iterate. For each element, compute its complement (`target - nums[i]`) and check if that complement already exists in the map. If it does, return the stored index and the current index immediately. This runs in O(n) time and O(n) space.

## Code
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}
```
