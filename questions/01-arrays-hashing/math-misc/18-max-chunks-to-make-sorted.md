# Max Chunks To Make Sorted

**Link:** https://leetcode.com/problems/max-chunks-to-make-sorted/

## Problem

You are given an integer array `arr` of length `n` that represents a permutation of the integers in the range `[0, n - 1]`.

We split `arr` into some number of **chunks** (i.e., contiguous partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return the *maximum* number of chunks we can make to sort the array.

## Solution

### Core Idea

Since the array is a permutation of the integers from `0` to `n - 1`, the sorted version of the array would have the element `i` at index `i`.
As we iterate through the array, we track the maximum value seen so far, `maxValue`. 
At any index `i`, if `maxValue == i`, it means that all elements seen so far (from index `0` to `i`) are less than or equal to `i`. Because the array is a permutation of `0` to `n - 1`, these elements must be exactly the set of numbers `[0, i]` in some order. 
Therefore, we can sort this prefix as a chunk and place it in its correct sorted position. We greedily make a chunk boundary here and increment our answer.

**Time:** O(n) — we iterate through the array once  
**Space:** O(1) — only a few variables are used

## Code

### Approach 1: Track Max Value — O(n) time, O(1) space

```cpp
class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        int ans = 0;
        int maxValue = -1;

        for (int i = 0; i < arr.size(); ++i)
        {
            maxValue = max(arr[i], maxValue);
            if (maxValue == i)
            {
                ans++;
            }
        }

        return ans;
    }
};
```
