# Subarray Sum Equals K

**Link:** https://leetcode.com/problems/subarray-sum-equals-k/

## Problem

Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Example 1:**
```
Input: nums = [1,1,1], k = 2
Output: 2
```

**Example 2:**
```
Input: nums = [1,2,3], k = 3
Output: 2
```

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Solution

Since the array can contain negative numbers, we cannot use a standard two-pointer sliding window approach. Instead, we use **Prefix Sums** combined with a **Hash Map**.

### Core Idea: Prefix Sum + Hash Map

Let $P[i]$ be the prefix sum of elements from index `0` to `i`:
$$P[i] = \sum_{x=0}^{i} nums[x]$$

The sum of any subarray from index `j` to `i` (where $j \le i$) is:
$$\text{Sum}(nums[j..i]) = P[i] - P[j-1]$$

We want to find the number of subarrays whose sum is exactly $k$:
$$P[i] - P[j-1] = k \implies P[j-1] = P[i] - k$$

Thus, at any index `i` with a running prefix sum `csum` (which is $P[i]$):
1. The number of valid subarrays ending at `i` is equal to the number of times the prefix sum `csum - k` (which is $P[j-1]$) has occurred so far.
2. We store the frequencies of all previous prefix sums in a hash map `umap`.
3. We initialize `umap[0] = 1` to account for subarrays starting from index `0` whose sum is exactly $k$ (i.e., when $P[i] = k$, then $P[i] - k = 0$).

---

### Complexity Analysis
- **Time Complexity:** O(N) — We iterate through the array of size $N$ once, performing O(1) average-time hash map lookups.
- **Space Complexity:** O(N) — To store the prefix sums in the hash map.

## Code

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> umap;

        int csum = 0; int tot = 0;
        umap[0] = 1;
        for(int i=0; i<nums.size(); i++) {
            csum += nums[i];
            tot += umap[csum-k];
            umap[csum]++;
        }
        return tot;
    }
};
```
