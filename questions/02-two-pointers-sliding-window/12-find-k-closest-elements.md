# Find K Closest Elements

**Link:** https://leetcode.com/problems/find-k-closest-elements/

## Problem
Given a sorted integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.

An integer `a` is closer to `x` than an integer `b` if:
- $|a - x| < |b - x|$, or
- $|a - x| == |b - x|$ and $a < b$

**Example 1:**
- **Input:** `arr = [1,2,3,4,5]`, `k = 4`, `x = 3`
- **Output:** `[1,2,3,4]`

**Example 2:**
- **Input:** `arr = [1,2,3,4,5]`, `k = 4`, `x = -1`
- **Output:** `[1,2,3,4]`

## Solution
Since the array is already sorted, the $k$ closest elements will form a contiguous subarray. We can use a two-pointer approach starting from both ends of the array to narrow down the window to size $k$:

1. Initialize `left = 0` and `right = arr.size() - 1`.
2. While the size of the window `[left, right]` is greater than or equal to `k` (i.e., `right - left >= k`):
   - Compare the distance of `arr[left]` and `arr[right]` from `x`.
   - If `arr[left]` is further from `x` than `arr[right]` (i.e., `x - arr[left] > arr[right] - x`), we exclude `arr[left]` by incrementing `left`.
   - Otherwise (if `arr[right]` is further from `x` or they are equidistant, where the smaller element at `left` is preferred), we exclude `arr[right]` by decrementing `right`.
3. Once the window size becomes exactly $k$, the elements from `left` to `right` are the $k$ closest elements. We collect and return them.

## Code
```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int left = 0, right = arr.size()-1;
        while(right-left >=k)
        {
            if(x-arr[left] > arr[right] -x)
                left++;
            else
                right--;
        }
        vector<int> ans;
        for(int i = left; i<=right; i++)
            ans.push_back(arr[i]);
        return ans;
    }
};
```
