# Next Permutation

**Link:** https://leetcode.com/problems/next-permutation/

## Problem
Given an array of integers nums, rearrange the numbers into the lexicographically next greater permutation. If no such arrangement exists (the array is in descending order), rearrange to the smallest possible order (ascending). The replacement must be done in place with only constant extra memory.

## Solution
Scan from right to find the first index i where nums[i] < nums[i+1] — this is the pivot. Then find the rightmost element in the suffix that is just greater than nums[i] (walk right from i+1 while next element is still greater), swap it with nums[i]. Finally sort (or reverse) everything after index i to get the smallest possible suffix.

## Code
```cpp
void nextPermutation(vector<int>& nums) {
    int idx = 0;
    for (int i = nums.size() - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            int sIdx = i + 1;
            while (sIdx + 1 < nums.size() && nums[sIdx + 1] > nums[i]) {
                sIdx++;
            }
            int temp = nums[i];
            nums[i] = nums[sIdx];
            nums[sIdx] = temp;
            idx = i + 1;
            break;
        }
    }

    sort(nums.begin() + idx, nums.end());
}
```
