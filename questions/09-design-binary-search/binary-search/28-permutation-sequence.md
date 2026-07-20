# Permutation Sequence

**Link:** https://leetcode.com/problems/permutation-sequence/

## Problem
Given `n` and `k`, return the `k`-th permutation sequence of `[1, 2, ..., n]` in lexicographic order.

## Solution
Use the factorial number system. There are `(n-1)!` permutations starting with each digit. For each position, check how many full groups of `(n-1)!` fit before `k`:
- If `k > (n-1)!`, skip this digit (`k -= (n-1)!`) and check the next
- Otherwise, this digit is the one to place — remove it from the pool and recurse with the remaining digits and reduced `k`

This avoids generating all permutations and runs in O(n²) due to the `erase` at each level.

## Code
```cpp
class Solution {
public:
    int fact(int n) {
        int prod = 1;
        while (n) prod *= n--;
        return prod;
    }

    string perm(vector<int>& nums, int k) {
        if (nums.size() == 1) return to_string(nums[0]);

        int n = nums.size();
        int remfac = fact(n - 1);  // permutations per group (each starting digit has remfac perms)

        for (int i = 0; i < n; i++) {
            if (k > remfac) {
                k -= remfac;       // this digit's group is entirely before k; skip it
            } else {
                // k falls within this digit's group; place it and recurse
                int temp = nums[i];
                nums.erase(nums.begin() + i);
                return to_string(temp) + perm(nums, k);
            }
        }
        return "";
    }

    string getPermutation(int n, int k) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) nums[i] = i + 1;  // pool: [1, 2, ..., n]
        return perm(nums, k);
    }
};
```
