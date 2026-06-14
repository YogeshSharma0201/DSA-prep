# Single Number II

**Link:** https://leetcode.com/problems/single-number-ii/description/

## Problem
Given an integer array `nums` where every element appears exactly three times except for one element which appears exactly once, return that single element. The solution must run in O(n) time and use only O(1) extra space.

## Solution
For each of the 32 bit positions, sum up how many numbers have that bit set, then take mod 3. If the result is 1, the unique number has that bit set. Since every triple of duplicates contributes 0 mod 3 to each bit, only the unique number's bits survive. OR the surviving bits back into the result.

## Code
```cpp
int singleNumber(vector<int>& input) {
    int ret = 0;

    for (int i = 0; i < 32; i++) {
        int sum = 0;
        for (int j = 0; j < input.size(); j++) {
            sum += (input[j] >> i) & 1;
            sum %= 3;
        }

        ret |= (sum << i);
    }

    return ret;
}
```
