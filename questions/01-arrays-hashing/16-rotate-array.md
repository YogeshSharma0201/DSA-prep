# Rotate Array

**Link:** https://leetcode.com/problems/rotate-array/

## Problem
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

**Example 1:**
```
Input:  nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

**Example 2:**
```
Input:  nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
```

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

## Solution

### The Reverse Trick (O(n) time, O(1) space)

Key observation: rotating right by `k` moves the last `k` elements to the front.

**Why three reverses work** — walk through `[1,2,3,4,5,6,7]`, `k = 3`:

| Step | Operation | Result |
|------|-----------|--------|
| Start | — | `[1, 2, 3, 4, 5, 6, 7]` |
| 1 | Reverse entire array | `[7, 6, 5, 4, 3, 2, 1]` |
| 2 | Reverse first `k` elements | `[5, 6, 7, 4, 3, 2, 1]` |
| 3 | Reverse last `n-k` elements | `[5, 6, 7, 1, 2, 3, 4]` ✓ |

**Intuition:**
- Reversing the whole array puts the last `k` elements at the front, but in reverse order.
- Reversing the first `k` elements restores their correct order.
- Reversing the remaining `n-k` elements restores their correct order.

**Edge case:** `k %= n` handles `k >= n`. Rotating by `n` is a no-op, so only the remainder matters.

## Code
```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k %= nums.size();

        reverse(nums, 0, nums.size() - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.size() - 1);
    }

    void reverse(vector<int>& nums, int l, int r) {
        while (l < r) {
            swap(nums[l], nums[r]);
            l++;
            r--;
        }
    }
};
```
