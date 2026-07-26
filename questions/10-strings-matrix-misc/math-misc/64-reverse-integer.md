# Reverse Integer

**Link:** https://leetcode.com/problems/reverse-integer/

## Problem
Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

Assume the environment does not allow you to store 64-bit integers (either signed or unsigned).

## Solution
To reverse the digits of the integer:
1. Extract digits of `x` one-by-one using modulo `10` and division `10`, and store them in a vector.
2. Reconstruct the reversed integer. Before performing each multiplication and addition, check if multiplying the current result by `10` would exceed `INT_MAX` or be less than `INT_MIN`. If it does, return `0` to prevent 32-bit overflow.

## Code
```cpp
class Solution {
public:
    int reverse(int x) {        
        vector<int> v;
        int r;
        while(x) {
            r = x%10;
            x /= 10;
            v.push_back(r); 
        }
        
        int num = 0;
        for(int n : v) {
            if(1LL*num*10 > INT_MAX || 1LL*num*10 < INT_MIN ) return 0;
            num *= 10;
            num += n;
        }
        
        return num;
    }
};
```
