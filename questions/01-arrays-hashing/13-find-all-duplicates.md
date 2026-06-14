# Find All Duplicates in an Array

**Link:** https://leetcode.com/problems/find-all-duplicates-in-an-array/

## Problem
Given an integer array `nums` of length `n` where all integers are in the range `[1, n]` and each integer appears once or twice, return an array of all integers that appear twice. The solution must run in O(n) time and use only O(1) extra space (not counting the output).

## Solution
Use the array as a sign-based visited marker. For each element, compute `idx = abs(nums[i]) - 1` and negate `nums[idx]`. If we arrive at an index that is already negative, it means we have visited it before, so `idx + 1` is a duplicate — add it to the result. This works in-place in O(n) time.

## Code
```cpp
vector<int> findDuplicates(vector<int>& nums) {
    vector<int> ret;
    for (int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;
        if (nums[idx] < 0) {
            ret.push_back(idx + 1);
        } else {
            nums[idx] = -nums[idx];
        }
    }
    return ret;
}
```

---

## Solution 2 — Cyclic sort
Place each number at index `nums[i] - 1` by swapping. After sorting, any position where `nums[index] ≠ index + 1` holds a duplicate (the number sitting there appears twice).

```cpp
vector<int> findDuplicates(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        while (nums[i] != nums[nums[i] - 1]) {
            int correctIndex = nums[i] - 1;
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        }
    }

    vector<int> duplicates;
    for (int index = 0; index < nums.size(); index++) {
        if (nums[index] != index + 1) {
            duplicates.push_back(nums[index]);
        }
    }

    return duplicates;
}
```
