# Find First and Last Position of Element in Sorted Array

**Link:** https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

## Problem
Given a sorted integer array and a target, return the starting and ending index of the target. If not found, return `[-1, -1]`. Must run in O(log n).

## Solution
Run the left-search template (see [00-binary-search-template.md](00-binary-search-template.md)) twice:
1. `search(nums, target)` → first position where `nums[pos] >= target` (≡ `lower_bound(target)`)
2. If `nums[idx1] != target`, the target is absent — return `{-1, -1}`
3. `search(nums, target+1)` → first position where `nums[pos] >= target+1` (≡ `lower_bound(target+1)`), then decrement by 1 if that position holds a value greater than target → last occurrence

## Code
```cpp
class Solution {
public:
    // Left-search: first index where nums[pos] >= target
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (nums[mid] < target) l = mid + 1;  // mid is definitely < target; exclude
            else                    r = mid;        // mid might be the answer; keep
        }
        return l;
    }

    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.size() == 0) return {-1, -1};

        int idx1 = search(nums, target);         // first occurrence (lower_bound)

        if (nums[idx1] != target) return {-1, -1};

        int idx2 = search(nums, target + 1);     // first pos after all target values (lower_bound of target+1)
        if (nums[idx2] > target) idx2--;         // step back to last occurrence of target

        return {idx1, idx2};
    }
};
```
