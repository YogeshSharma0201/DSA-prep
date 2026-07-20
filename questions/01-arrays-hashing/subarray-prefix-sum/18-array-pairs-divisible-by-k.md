# Check if Array Pairs Are Divisible by K

**Link:** https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/

## Problem
Given an integer array `arr` of even length and an integer `k`, return `true` if the array can be divided into pairs such that the sum of each pair is divisible by `k`.

## Solution — Remainder frequency map
A pair `(a, b)` is divisible by `k` iff `(a % k + b % k) % k == 0`, meaning their remainders must sum to `k` (or both be 0). Count the frequency of each remainder using `(x % k + k) % k` to normalize negatives. Then for each remainder `r`, its required complement is `(k - r) % k`. Two conditions must hold:

- `freq[r] == freq[complement]` — counts must match so every element can be paired
- If `r == complement` (i.e. `r == 0` or `r == k/2`), the count must be even since elements in this group pair among themselves

The `% k` in `(k - it.first) % k` handles `r = 0` correctly: `(k - 0) % k = 0`.

## Code
```cpp
bool canArrange(vector<int>& input, int k) {
    unordered_map<int, int> umap;
    int n = input.size();

    for (int i = 0; i < n; i++) {
        umap[(input[i] % k + k) % k]++;
    }

    for (auto it : umap) {
        int rem = (k - it.first) % k; // (k-0)%k = 0 handles the r=0 self-pair case
        if (umap[rem] != it.second || (it.first == rem && it.second % 2))
            return false;
    }
    return true;
}
```
