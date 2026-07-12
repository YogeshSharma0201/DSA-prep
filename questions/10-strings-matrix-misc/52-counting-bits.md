# Counting Bits

**Link:** https://leetcode.com/problems/counting-bits

## Problem
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i. The result should be computed in O(n) time and O(n) space.

## Solution
Use DP based on the observation that even numbers have the same number of set bits as their half (right shift by 1), and odd numbers have one more set bit than their half. So dp[i] = dp[i >> 1] + (i & 1), building up the answer for all values from 0 to n.

## Code
```cpp
vector<int> countBits(int n) {
    if(n==0) return {0};
    vector<int> dp = {0,1};

    int idx = 0, j = 2;
    for(int i=2; i<=n; i++) {
        if(idx == j) {
            idx = 0;
            j = i;
        }
        dp.push_back(1+dp[idx++]);
    }

    return dp;
}
```

## Alternative Solution (Simpler DP)
Same recurrence as above, expressed directly with division and modulo instead of bit shift/mask: `t[i] = t[i/2] + i%2`, since `i/2` drops the least significant bit and `i%2` tells whether that dropped bit was set.

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> t(n+1);
        t[0] = 0;

        for(int i = 1; i<=n; ++i)
            t[i] = t[i/2] + i%2;

        return t;
    }
};
```
