# Alternate Positive and Negative Numbers

**Link:** https://www.geeksforgeeks.org/problems/alternating-positive-and-negative-numbers/1

## Problem
Given an array of positive and negative numbers, rearrange them alternately (first positive, then negative) without changing the relative order. If there are more of one type, append the extras at the end.

## Solution
Collect all positive and negative numbers separately maintaining order. Then merge them alternately: place positives at even indices and negatives at odd indices. Append the remaining elements at the end.

## Code
```cpp
void rearrange(vector<int>& arr) {
    vector<int> pos, neg;
    for (int x : arr) {
        if (x >= 0) pos.push_back(x);
        else neg.push_back(x);
    }
    int i = 0, pi = 0, ni = 0;
    while (pi < pos.size() && ni < neg.size()) {
        arr[i++] = pos[pi++];
        arr[i++] = neg[ni++];
    }
    while (pi < pos.size()) arr[i++] = pos[pi++];
    while (ni < neg.size()) arr[i++] = neg[ni++];
}
```
