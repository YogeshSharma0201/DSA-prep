# Subarray Sums Divisible by K

**Link:** https://leetcode.com/problems/subarray-sums-divisible-by-k/

## Problem
Given an integer array `nums` and an integer `k`, return the number of non-empty subarrays whose sum is divisible by `k`.

## Solution — Prefix sum remainder frequency map
A subarray `nums[i+1..j]` has sum divisible by `k` iff `prefixSum[j] % k == prefixSum[i] % k` (since `(currPSum - xPSum) % k == 0` means their remainders match). So walk the array maintaining a running prefix sum, normalize its remainder with `(psum % k + k) % k` to handle negative sums, and count how many earlier prefix sums share that same remainder — each one closes a valid subarray ending at the current index. Seed the map with `{0: 1}` for the empty prefix so subarrays starting at index 0 are counted correctly.

## Code
```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        int psum = 0;
        unordered_map<int,int> umap;
        umap[0] = 1;

        int cnt = 0;
        for(int i=0; i<nums.size(); i++) {
            psum += nums[i];

            int mod = (psum%k + k)%k; // handle negatives

            cnt += umap[mod];
            umap[mod]++;
        }

        return cnt;
    }
};
```
