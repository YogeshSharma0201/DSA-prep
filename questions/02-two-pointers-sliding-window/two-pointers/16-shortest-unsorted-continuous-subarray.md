# Shortest Unsorted Continuous Subarray

**Link:** https://leetcode.com/problems/shortest-unsorted-continuous-subarray/

## Problem

Given an integer array `nums`, find one continuous subarray such that if you only sort this subarray in non-decreasing order, then the whole array will be sorted in non-decreasing order.

Return the shortest length of such a subarray.

**Example 1:**
```
Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 0
```

**Example 3:**
```
Input: nums = [1]
Output: 0
```

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`

---

## Solution

### Approach: Two-Pass Monotonic Tracking / Two Pointers — O(N) Time, O(1) Space

#### Core Idea:
1. **Right Boundary (`endEle`):**
   - Traverse the array from left to right while maintaining `maxTnow` (the maximum value seen so far).
   - If `nums[i] < maxTnow`, `nums[i]` is out of place relative to a preceding larger element. Thus, index `i` must be within the unsorted subarray.
   - Update `endEle = i` whenever this condition is met.
   - If `endEle == -1` after the first pass, the array is already sorted, so return `0`.

2. **Left Boundary (`startEle`):**
   - Traverse the array from right to left while maintaining `minTnow` (the minimum value seen so far from the end).
   - If `nums[i] > minTnow`, `nums[i]` is out of place relative to a following smaller element. Thus, index `i` must be within the unsorted subarray.
   - Update `startEle = i` whenever this condition is met.

3. **Subarray Length:**
   - The length of the shortest unsorted continuous subarray is `endEle - startEle + 1`.

---

### Complexity Analysis
- **Time Complexity:** $O(N)$ — Two linear scans over the array.
- **Space Complexity:** $O(1)$ — Uses constant auxiliary memory.

---

## Code

```cpp
class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        int n = nums.size();
        int startEle = -1, endEle = -1;

        int maxTnow = nums[0];

        for(int i = 1; i < nums.size(); i++) {
            maxTnow = max(maxTnow, nums[i]);
            if(maxTnow > nums[i]) {
                endEle = i;
            }
        }

        if(endEle == -1) return 0;

        int minTnow = nums[n - 1];
        for(int i = n - 2; i >= 0; i--) {
            minTnow = min(minTnow, nums[i]);
            if(minTnow < nums[i]) {
                startEle = i;
            }
        }

        return endEle - startEle + 1;
    }
};
```
