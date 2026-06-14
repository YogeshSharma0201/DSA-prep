# Set Mismatch

**Link:** https://leetcode.com/problems/set-mismatch/

## Problem
Given an integer array `nums` representing a set `[1, n]` where one number is duplicated and one is missing, return `[duplicate, missing]`.

## Solution — Cyclic sort
Place each number at index `nums[i] - 1` by swapping. After sorting, the first position where `nums[index] ≠ index + 1` reveals the duplicate (the value sitting there) and the missing number (index + 1).

## Code
```cpp
vector<int> findErrorNums(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        while (nums[i] != nums[nums[i] - 1]) {
            int correctIndex = nums[i] - 1;
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        }
    }

    vector<int> res;
    for (int index = 0; index < nums.size(); index++) {
        if (nums[index] != index + 1) {
            res = {nums[index], index + 1};
            break;
        }
    }

    return res;
}
```
