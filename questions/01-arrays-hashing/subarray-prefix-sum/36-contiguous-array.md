# Contiguous Array

**Link:** https://leetcode.com/problems/contiguous-array/

## Problem

Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of `0` and `1`.

## Solution

### Core Idea

This problem can be transformed into finding the largest subarray with a sum equal to `0`. 
By treating every `0` in the array as `-1` and every `1` as `1`, a subarray has an equal number of `0`s and `1`s if and only if the sum of its elements (with this mapping) is `0`.

To find the largest subarray with a sum of `0` in O(N) time:
1. Maintain a running prefix sum (`csum`).
2. Store the first occurrence of each prefix sum in a hash map `umap` as `{prefix_sum -> index}`.
3. Seed `umap[0] = -1` to correctly handle subarrays starting at index `0`.
4. At each index `i`, check if `csum` has been seen before:
   - If it has, the subarray from `umap[csum] + 1` to `i` has a sum of `0`. Its length is `i - umap[csum]`. We update our maximum length `res`.
   - If it has not, we store `umap[csum] = i`.

**Time Complexity:** O(N) — Single pass through the array.  
**Space Complexity:** O(N) — To store the prefix sums in the hash map.

## Code

### Approach 1: Prefix Sum + Hash Map — O(n) time, O(n) space

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        int n = nums.size();

        unordered_map<int,int> umap;

        umap[0] = -1; int res = 0; int csum = 0;
        for(int i=0; i<n; i++) {
            // Map 0 to -1 and 1 to 1
            // then problem becomes get max subarray with 0 sum
            csum += nums[i] == 0 ? -1: 1;

            if(umap.count(csum)) {
                res = max(res, i-umap[csum]);
            }
            else {
                umap[csum] = i;
            }
        }

        return res;
    }
};
```
