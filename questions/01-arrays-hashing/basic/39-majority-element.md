# Majority Element

**Link:** https://leetcode.com/problems/majority-element/description/

## Problem
Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**
```
Input: nums = [3,2,3]
Output: 3
```

**Example 2:**
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

## Solution
Use Boyer-Moore Voting Algorithm to find the majority element in `O(n)` time complexity and `O(1)` space complexity.
- Maintain a candidate element `x` and a frequency/weight counter `f`.
- Iterate through the array:
  - If the counter `f` becomes `0`, pick the current element as the new candidate `x` and set `f = 1`.
  - If the current element is equal to `x`, increment `f`.
  - Otherwise, decrement `f`.
- Since the majority element appears more than `⌊n / 2⌋` times, it will always remain as the candidate at the end of the iteration.

## Code
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int x = nums[0], f = 0;

        for(int i=0; i<nums.size(); i++) {
            if(nums[i] == x) {
                f++;
            }
            else if(f==0){
                x = nums[i];
                f = 1;
            }
            else {
                f--;
            }
        }
        return x;
    }
};
```
