# Pairs of Songs With Total Durations Divisible by 60

**Link:** https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/

## Problem
You are given a list of integers `time` representing the durations of songs in seconds. Return the number of pairs of songs `(i, j)` such that `i < j` and `(time[i] + time[j]) % 60 == 0`.

## Solution
This is a variation of the Two Sum problem using modulo arithmetic:
1. **Modulo remainders:** The sum of two numbers `a` and `b` is divisible by 60 if and only if `(a % 60 + b % 60) % 60 == 0`.
2. **Frequency Map:** Create a frequency array `times` of size 60 to store the count of song durations with each remainder `0` through `59`.
3. **Counting Pairs:**
   - For remainders `i` from `1` to `29`, a song with remainder `i` must be paired with a song with remainder `60 - i`. The number of pairs formed by these remainders is `times[i] * times[60 - i]`.
   - For the special cases of remainder `0` and `30` (where they pair with themselves): the number of ways to choose 2 songs from a pool of size `n` is given by the combination formula `nC2 = n * (n - 1) / 2`.
4. Use `1LL` to avoid integer overflow during multiplication.

## Code
```cpp
class Solution {
public:
    int numPairsDivisibleBy60(vector<int>& time) {
        vector<int> times(60, 0);

        for(auto t : time) {
            times[t%60]++;
        }

        int pairs = 0;
        for(int i=1; i<30; i++) {
            if(times[i] == 0) continue;
            
            pairs += times[i]*times[60-i];
        }
        // For zero and 30, we create the pairs within themselves
        // nC2 = n!/(2! * (n-2)!) = n*(n-1) / 2 
        pairs += times[30]*1LL * (times[30]-1)/2; 
        pairs += times[0]*1LL*(times[0]-1)/2;
        return pairs;
    }
};
```
