# Search in Rotated Sorted Array II

**Link:** https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

## Problem
There is an integer array `nums` sorted in non-decreasing order (not necessarily with distinct values).
Before being passed to your function, `nums` is rotated at an unknown pivot index.

Given the array `nums` after the rotation and an integer `target`, return `true` if `target` is in `nums`, or `false` if it is not in `nums`.

Must run with the best possible time complexity.

## Solution
We can perform a single-pass binary search to find the target. However, since the array **contains duplicates**, we need to handle the case where `nums[l] == nums[mid] == nums[r]`, which introduces ambiguity about which half of the array is sorted.

1. **Handling Duplicates (Ambiguity):**
   - If `nums[l] == nums[mid] && nums[mid] == nums[r]`, we cannot determine if the left or right half is sorted (e.g., in `[1, 0, 1, 1, 1]`, `mid` is index 2 (`1`), and `l` and `r` are also `1`).
   - To resolve this, we simply shrink the boundaries: `l++` and `r--`. This reduces the search space but preserves correctness.
2. **Left Half is Sorted (`nums[l] <= nums[mid]`):**
   - If the target lies within this sorted range (`nums[l] <= target < nums[mid]`), we search the left half: `r = mid - 1`.
   - Otherwise, we search the right half: `l = mid + 1`.
3. **Right Half is Sorted (`nums[l] > nums[mid]`):**
   - If the target lies within this sorted range (`nums[mid] < target <= nums[r]`), we search the right half: `l = mid + 1`.
   - Otherwise, we search the left half: `r = mid - 1`.

## Parallels with Search in Rotated Sorted Array I

| Feature | Search in Rotated Sorted Array I (Unique) | Search in Rotated Sorted Array II (Duplicates) |
| :--- | :--- | :--- |
| **Worst-case Time** | $O(\log n)$ | $O(n)$ (when all elements are identical and we search for a different element) |
| **Pivot Identification** | Possible in $O(\log n)$ time. | Not possible in $O(\log n)$ worst-case time due to flat regions. |
| **Binary Search Approach** | Can be solved in 2 passes (Pass 1: find pivot; Pass 2: standard binary search on mapped indices) or a single-pass. | Must be solved in a single-pass; finding the pivot first is inefficient. |
| **Ambiguity Resolution** | None needed. `nums[l] == nums[mid] == nums[r]` can only happen when the range has collapsed ($l = r$). | When `nums[l] == nums[mid] == nums[r]`, we must shrink the search window linearly (`l++`, `r--`). |

## Code
```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n - 1;

        while (l <= r) {
            int mid = l + (r - l) / 2;

            if (nums[mid] == target) return true;

            // Handle ambiguity when left, mid, and right are all equal
            if (nums[l] == nums[mid] && nums[mid] == nums[r]) {
                l++;
                r--;
            }
            // Left half is sorted
            else if (nums[l] <= nums[mid]) {
                // Target lies in the sorted left half
                if (nums[l] <= target && target < nums[mid]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            // Right half is sorted
            else {
                // Target lies in the sorted right half
                if (nums[mid] < target && target <= nums[r]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }

        return false;
    }
};
```
