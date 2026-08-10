# Kth Largest Element in an Array

**Link:** https://leetcode.com/problems/kth-largest-element-in-an-array/

## Problem
Given an integer array and an integer k, return the k-th largest element in the array. Note that it is the k-th largest in sorted order, not the k-th distinct element. Aim for better than O(n log n) time complexity.

---

## Evolution & Key Modifications

### Why the Naive / Initial Approach Fails (TLE)
The standard QuickSelect using **Lomuto Partitioning** with a deterministic pivot (`nums[hi]`) has two critical failure modes on LeetCode:

1. **Deterministic Pivot Degradation ($O(n^2)$ on sorted data):**
   - Picking a fixed pivot like `nums[hi]` causes worst-case $O(n^2)$ partitions on sorted or reverse-sorted inputs.
   - **Fix (Modification 1 - Randomized Pivot):** Randomly pick an index in `[lo, hi]` to guarantee expected $O(n)$ average runtime on arbitrary ordering.

2. **The Duplicate Elements Trap (TLE on `[1, 1, ..., 1]`):**
   - Even with a randomized pivot, Lomuto partition checks `if (nums[i] >= pivot) swap(...)`.
   - When all elements are identical, **every** element matches `>= pivot`. The partition boundary shifts by only $1$ each step ($N \to N-1 \to N-2 \dots$), resulting in $O(n^2)$ time and causing **Time Limit Exceeded (TLE)**.
   - **Fix (Modification 2 - 3-Way / Dutch National Flag Partitioning):** Partition the array into 3 distinct regions: `> pivot`, `== pivot`, and `< pivot`. If the target index falls in the `== pivot` region, the algorithm returns in $O(1)$ immediately without further recursion.

---

## 1. Old / Initial Code (Standard Lomuto QuickSelect)
> ⚠️ **Fails on LeetCode:** Gives TLE on duplicate-heavy and adversarial test cases ($O(n^2)$ worst case).

```cpp
class Solution {
public:
    int partition(vector<int>& nums, int lo, int hi) {
        int pivot = nums[hi], p = lo;
        for (int i = lo; i < hi; i++) {
            if (nums[i] >= pivot) {
                swap(nums[i], nums[p++]);
            }
        }
        swap(nums[p], nums[hi]);
        return p;
    }

    int quickSelect(vector<int>& nums, int lo, int hi, int k) {
        int p = partition(nums, lo, hi);
        if (p == k) return nums[p];
        return p > k ? quickSelect(nums, lo, p - 1, k)
                     : quickSelect(nums, p + 1, hi, k);
    }

    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, 0, nums.size() - 1, k - 1);
    }
};
```

---

## 2. Latest Optimized Code (3-Way QuickSelect + Random Pivot)
> ✅ **Accepted:** Handles sorted arrays and duplicate-heavy inputs in expected $O(n)$ time and $O(1)$ extra space.

```cpp
class Solution {
public:
    int quickSelect(vector<int>& nums, int lo, int hi, int k) {
        if (lo >= hi) return nums[lo];

        // Modification 1: Random pivot selection (prevents sorted array worst-case)
        int randIdx = lo + rand() % (hi - lo + 1);
        int pivot = nums[randIdx];

        // Modification 2: 3-Way Partitioning (Dutch National Flag)
        int lt = lo;      // boundary for > pivot (descending order)
        int gt = hi;      // boundary for < pivot
        int i = lo;

        while (i <= gt) {
            if (nums[i] > pivot) {
                swap(nums[i++], nums[lt++]);
            } else if (nums[i] < pivot) {
                swap(nums[i], nums[gt--]); // Note: don't increment i, inspect swapped element
            } else {
                i++;
            }
        }

        // Subarray layout:
        // nums[lo .. lt-1] > pivot
        // nums[lt .. gt]   == pivot
        // nums[gt+1 .. hi] < pivot

        if (k < lt) {
            return quickSelect(nums, lo, lt - 1, k);
        } else if (k > gt) {
            return quickSelect(nums, gt + 1, hi, k);
        } else {
            // Target index k lies in [lt, gt] (all equal to pivot) -> O(1) early exit!
            return pivot;
        }
    }

    int findKthLargest(vector<int>& nums, int k) {
        return quickSelect(nums, 0, nums.size() - 1, k - 1);
    }
};
```

---

## Complexity Analysis

| Metric | Old Approach (Lomuto) | Latest Approach (3-Way + Random) |
| :--- | :--- | :--- |
| **Average Time** | $O(n)$ | $O(n)$ |
| **Worst-case Time (Duplicates)** | $O(n^2)$ ❌ (TLE) | $O(n)$ ✅ |
| **Worst-case Time (Adversarial)** | $O(n^2)$ ❌ (TLE) | $O(n)$ Expected ✅ |
| **Space Complexity** | $O(n)$ recursion stack | $O(\log n)$ recursion stack |
