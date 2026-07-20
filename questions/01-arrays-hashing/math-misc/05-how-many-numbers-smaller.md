# How Many Numbers Are Smaller Than the Current Number

**Link:** https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/

## Problem
Given an array `nums`, for each `nums[i]` find how many numbers in the array are strictly smaller than it. Return the answer as an array where `result[i]` is the count of numbers smaller than `nums[i]`. The array can contain duplicates.

## Solution
Sort a copy of the array. In a sorted array, the first occurrence of a number at index `i` means exactly `i` elements are smaller than it. Build a hash map from each unique value to its first sorted index. Then for each original element, look up its count in the map. Using a map handles duplicates correctly since only the first occurrence is recorded.

## Code
```cpp
vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
    unordered_map<int, int> mp;
    vector<int> copy(nums);
    sort(copy.begin(), copy.end());

    for (int i = 0; i < copy.size(); i++) {
        if (mp.find(copy[i]) == mp.end()) {
            mp[copy[i]] = i;
        }
    }

    vector<int> ret(nums.size());
    for (int i = 0; i < nums.size(); i++) {
        ret[i] = mp[nums[i]];
    }
    return ret;
}
```
