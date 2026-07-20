# First Missing Positive

**Link:** https://leetcode.com/problems/first-missing-positive/

## Problem
Given an unsorted integer array `nums`, return the smallest positive integer that does not appear in `nums`. Must run in O(n) time and use O(1) auxiliary space.

## Solution — Cyclic sort (index as hash)
Place each number `x` where `1 ≤ x ≤ n` at index `x - 1` by swapping. After the pass, scan for the first index where `nums[index] ≠ index + 1` — that index + 1 is the answer. If every position is correct, the answer is `n + 1`.

## Code
```cpp
int firstMissingPositive(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        while (nums[i] > 0 && nums[i] <= nums.size() && nums[i] != nums[nums[i] - 1]) {
            int correctIndex = nums[i] - 1;
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        }
    }

    for (int index = 0; index < nums.size(); index++) {
        if (nums[index] != index + 1) {
            return index + 1;
        }
    }

    return nums.size() + 1;
}
```
