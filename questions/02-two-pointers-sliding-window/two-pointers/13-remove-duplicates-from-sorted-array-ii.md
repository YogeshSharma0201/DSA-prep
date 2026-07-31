# Remove Duplicates from Sorted Array II

**Link:** https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/

## Problem
Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead place the result in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, the first `k` elements of `nums` should hold the final result.

Return `k` after placing the final result in the first `k` slots of `nums`.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

## Solution
Use a two-pointer approach where `i` represents the write pointer (the position where the next valid element should be placed) and `j` represents the read pointer (iterating through the array).

Since each unique element can appear at most twice, the first two elements are always allowed. For subsequent elements, we only write the element if it is different from the element at `i-1` or `i-2`. This ensures that no element is written more than twice in the modified prefix of the array.

## Code
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int i=0;
        for(int j=0; j<nums.size(); j++) {
            if(i< 2 || nums[j] != nums[i-1] || nums[j] != nums[i-2])
                swap(nums[j], nums[i++]);
        }

        return i;
    }
};
```
