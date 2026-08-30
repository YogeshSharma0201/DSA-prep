# K-diff Pairs in an Array

**Link:** [K-diff Pairs in an Array - LeetCode](https://leetcode.com/problems/k-diff-pairs-in-an-array/)

## Problem
Given an array of integers `nums` and an integer `k`, return the number of unique k-diff pairs in the array. A k-diff pair is a pair `(nums[i], nums[j])` where `i != j` and `abs(nums[i] - nums[j]) == k`. Pairs are considered unique by their values, not indices.

---

## Solution Overview

Sort the array first to enable two-pointer traversal. After sorting, we can find pairs where `nums[right] - nums[left] == k` without searching backward.

---

### Approach 1: Two Pointers with Explicit Left & Right Pointers

Use `l` (left pointer) starting at `0` and `r` (right pointer) starting at `1`.
- If `l == r` or `nums[r] - nums[l] < k`, advance `r++`.
- If `nums[r] - nums[l] > k`, advance `l++`.
- If `nums[r] - nums[l] == k`, increment `count`, advance `l++`, and skip duplicate elements for `l`.

#### Complexity Analysis
- **Time Complexity:** O(N log N) due to sorting. The two-pointer traversal takes O(N) time.
- **Space Complexity:** O(1) auxiliary space.

#### Code
```cpp
class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int l = 0, r = 1, count = 0;

        while (r < nums.size()) {
            if (l == r || nums[r] - nums[l] < k) {
                r++;
            } else if (nums[r] - nums[l] > k) {
                l++;
            } else {
                count++;
                l++;
                while (l < nums.size() && nums[l] == nums[l - 1]) l++;
            }
        }

        return count;
    }
};
```

---

### Approach 2: Two Pointers (For-loop for Right Pointer with Duplicate Skipping)

Iterate `i` from `0` to `n-1` as the right boundary pointer `nums[i]` while keeping track of the left pointer `l`.
- Advance `l` using `while (l < i && nums[i] - nums[l] > k)` to shrink the difference if it exceeds `k`.
- If `l < i && nums[i] - nums[l] == k`, a valid pair is found: increment `ret`, advance `l`, and skip duplicate values `nums[l] == nums[l-1]`.

#### Complexity Analysis
- **Time Complexity:** O(N log N) for sorting + O(N) for linear two-pointer scan.
- **Space Complexity:** O(1) auxiliary space.

#### Code
```cpp
class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        int l = 0, ret = 0;
        for(int i = 0; i < n; i++) {
            while(l < i && nums[i] - nums[l] > k) l++;
            if(l < i && nums[i] - nums[l] == k) {
                ret++;
                l++;

                while(l < n && nums[l] == nums[l-1]) l++;
            }
        }
        return ret;
    }
};
```

