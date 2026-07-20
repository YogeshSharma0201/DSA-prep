# Minimum Limit of Balls in a Bag

**Link:** https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag

## Problem
You have bags of balls where `nums[i]` is the number of balls in bag i. In one operation you can split a bag into two bags. Given `maxOperations`, find the minimum possible value of the maximum number of balls in any bag after the operations.

## Solution
Binary search on the answer (the maximum bag size limit). For a given limit `mid`, the number of operations needed to split a bag of size `s` is `ceil(s / mid) - 1`, computed as `(s + mid - 1) / mid - 1`. Check if the total operations required is at most `maxOperations`. Binary search for the smallest valid limit.

## Code
```cpp
class Solution {
public:
    bool check(vector<int>& nums, int k, int maxOperations) {
        int totalOps = 0;
        // Notice the ceiling method without using ceil method
        // (x + y - 1) / y
        for(int i=0; i<nums.size(); i++) {
            totalOps += max((nums[i] + k -1)/ k - 1, 0);
        }

        return maxOperations >= totalOps;
    }

    int minimumSize(vector<int>& nums, int maxOperations) {
        int l = 1, r = 0;

        for(int i=0; i<nums.size(); i++) {
            r = max(r, nums[i]);
        }

        while(l < r) {
            int mid = (l + r) >> 1;

            if(check(nums, mid, maxOperations)) {
                r = mid;
            }
            else {
                l = mid+1;
            }
        }

        return l;
    }
};
```
