# Count of Smaller Numbers After Self

**Link:** https://leetcode.com/problems/count-of-smaller-numbers-after-self/

## Problem
Given an integer array nums, return a new counts array where counts[i] is the number of smaller elements to the right of nums[i]. For example, for [5, 2, 6, 1], the answer is [2, 1, 1, 0].

## Solution
Use a Fenwick Tree (Binary Indexed Tree). Process the array from right to left. Offset values to handle negatives. For each number, query the BIT for the prefix sum of elements smaller than it (count of smaller elements already inserted to the right). Then update the BIT at that position.

## Code
```cpp
class Solution {
    vector<int> bit;
    int n;

    void update(int i) {
        for (; i < n; i += i & (-i)) bit[i]++;
    }

    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }

public:
    vector<int> countSmaller(vector<int>& nums) {
        int offset = 10001;
        n = 20002 + 1;
        bit.assign(n, 0);

        vector<int> result(nums.size());
        for (int i = nums.size() - 1; i >= 0; i--) {
            int pos = nums[i] + offset;
            result[i] = query(pos - 1);
            update(pos);
        }
        return result;
    }
};
```
