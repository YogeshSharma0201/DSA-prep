# Split Array Largest Sum

**Link:** https://leetcode.com/problems/split-array-largest-sum/

## Problem
Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum.

## Solution
Binary search on the possible largest sum (capacity). Binary search works because the feasibility predicate is monotonic: if a capacity `cap` allows splitting into ≤ k subarrays, then any larger capacity also works. The `check` function greedily verifies feasibility for a given capacity.

## Code
```cpp
class Solution {
public:
    int check(vector<int>& nums, int cap, int k) {
        int curr = 0, countK = 0;

        for(int i=0; i<nums.size(); i++) {
            if(nums[i] > cap) return false;

            curr += nums[i];
            if(curr > cap) {
                countK++;
                curr = nums[i];
            }
        }

        if(curr > 0) countK++;
        
        return countK <= k;
    }

    int splitArray(vector<int>& nums, int k) {
        int lo = *min_element(nums.begin(), nums.end());
        int ri = accumulate(nums.begin(), nums.end(), 0);

        while(lo < ri) {
            int mid = (lo+ri) >> 1;

            if(check(nums, mid, k)) {
                ri = mid;
            }
            else {
                lo = mid+1;
            }
        }

        return lo;
    }
};
```
