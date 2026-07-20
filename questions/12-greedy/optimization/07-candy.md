# Candy

**Link:** https://leetcode.com/problems/candy/

## Problem
There are n children standing in a line. Each child is assigned a rating. You must give each child at least 1 candy. Children with a higher rating than their neighbors must receive more candies than those neighbors. Find the minimum total number of candies needed.

## Solution
Two-pass greedy. First pass left-to-right: if ratings[i] > ratings[i-1], give child i one more than child i-1, else give 1. Second pass right-to-left: if ratings[i] > ratings[i+1], ensure child i has more than child i+1 by taking max of current and right+1. Sum the final candy array.

## Code
```cpp
int candy(vector<int>& ratings) {
    int n = ratings.size();
    vector<int> candies(n, 1);
    for (int i = 1; i < n; i++)
        if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1] + 1;
    for (int i = n-2; i >= 0; i--)
        if (ratings[i] > ratings[i+1]) candies[i] = max(candies[i], candies[i+1] + 1);
    return accumulate(candies.begin(), candies.end(), 0);
}
```
