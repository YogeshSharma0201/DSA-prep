# Find the Duplicate Number

**Link:** https://leetcode.com/problems/find-the-duplicate-number

## Problem
Given an array `nums` containing `n + 1` integers where each integer is in the range `[1, n]`, there is exactly one repeated number. Return that duplicate number without modifying the array and using only O(1) extra space.

## Solution 1 — Floyd's cycle detection
Treat the array as a linked list where `nums[i]` is the next pointer from node `i`. Because a duplicate exists, there must be a cycle. Use Floyd's cycle detection: `hare` moves two steps at a time (`nums[nums[hare]]`) and `tor` moves one step (`nums[tor]`). After they meet inside the cycle, reset `tor` to `nums[0]` and advance both one step at a time — their meeting point is the duplicate.

## Code
```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int hare = nums[0];
        int tor = nums[0];

        do {
            hare = nums[nums[hare]];
            tor = nums[tor];
            //cout<<hare<<" "<<tor<<endl;
        } while (hare != tor);

        tor = nums[0];

        while (hare != tor) {
            hare = nums[hare];
            tor = nums[tor];
            //cout<<hare<<" "<<tor<<endl;
        }

        return tor;
    }
};
```

---

## Solution 2 — Cyclic sort
Place each number at index `nums[i] - 1` by swapping. After sorting, the first position where `nums[index] ≠ index + 1` holds the duplicate (both occurrences tried to land at the same slot).

```cpp
int findDuplicate(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        while (nums[i] != nums[nums[i] - 1]) {
            int correctIndex = nums[i] - 1;
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        }
    }

    for (int index = 0; index < nums.size(); index++) {
        if (nums[index] != index + 1) {
            return nums[index];
        }
    }

    return -1;
}
```
