# Missing Number

**Link:** https://leetcode.com/problems/missing-number/

## Problem
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the one number in the range that is missing from the array. The array has exactly one number missing and every other number in `[0, n]` appears exactly once.

## Solution 1 — Sum formula
Compute the expected sum of all integers from `0` to `n` using the formula `n*(n+1)/2`. Subtract the actual sum of the array from this expected sum. The difference is the missing number. This runs in O(n) time and O(1) space.

## Code
```cpp
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int x : nums) actual += x;
    return expected - actual;
}
```

---

## Solution 2 — Cyclic sort
The range is `[0, n]` so each number `x` belongs at index `x` — but index `n` has no slot, so skip numbers equal to `n`. Place everything else in-place, then scan for the first index where `nums[i] ≠ i`; that index is the missing number. If all positions match, `n` is missing.

```cpp
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int i = 0;
    while (i < n) {
        int correctIndex = nums[i];
        if (nums[i] < n && i != correctIndex) {
            swap(nums[i], nums[nums[i]]);
        } else {
            i++;
        }
    }

    i = 0;
    while (i < n) {
        if (nums[i] != i) break;
        i++;
    }
    return i;
}
```
