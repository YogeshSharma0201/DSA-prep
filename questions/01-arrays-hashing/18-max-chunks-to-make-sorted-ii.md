# Max Chunks To Make Sorted II

**Link:** https://leetcode.com/problems/max-chunks-to-make-sorted-ii/

## Problem

Given an integer array `arr`, split it into some number of **chunks** (contiguous partitions), sort each chunk individually, and concatenate them. The result must equal the fully sorted array. Return the **maximum** number of chunks.

Elements may repeat.

## Solution

### Core Idea

Sort a copy of the array. Walk through both arrays together, maintaining a **balance map** that tracks the net count difference between what we've seen in `sorted[0..i]` vs `input[0..i]`. When the map is empty, the multiset of elements seen so far is identical in both arrays — meaning this prefix can stand alone as a valid chunk.

### Why it works

At any index `i`, if `input[0..i]` and `sorted[0..i]` contain exactly the same elements (same multiset), then sorting `input[0..i]` in isolation produces `sorted[0..i]` — a valid chunk boundary. We greedily count every such boundary to maximize chunks.

The map tracks this by incrementing for each `sorted[i]` and decrementing for each `input[i]`. An empty map means the two windows are balanced.

**Time:** O(n log n) — dominated by the initial sort  
**Space:** O(n)

## Code

### Approach 1: Sorted Copy + Balance Map — O(n log n) time, O(n) space

```cpp
class Solution {
public:
    int maxChunksToSorted(vector<int>& input) {
        vector<int> tem(input);
        sort(tem.begin(), tem.end());

        unordered_map<int, int> umap;

        int chunks = 0;
        for (int i = 0; i < input.size(); i++) {
            umap[tem[i]]++;
            umap[input[i]]--;
            if (umap[input[i]] == 0)
                umap.erase(input[i]);
            if (umap[tem[i]] == 0)
                umap.erase(tem[i]);

            if (umap.size() == 0)
                chunks++;
        }

        return chunks;
    }
};
```

### Approach 2: Max-prefix / Min-suffix — O(n) time, O(n) space

A chunk boundary is valid after index `i` if the maximum of everything to the left is ≤ the minimum of everything to the right. Precompute `minRight`, then do a single left-to-right pass tracking the running `maxLeft`.

```cpp
class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        int n = arr.size();
        vector<int> minRight(n);

        minRight[n - 1] = arr[n - 1];
        for (int i = n - 2; i >= 0; i--)
            minRight[i] = min(arr[i], minRight[i + 1]);

        int chunks = 0, maxLeft = INT_MIN;
        for (int i = 0; i < n - 1; i++) {
            maxLeft = max(maxLeft, arr[i]);
            if (maxLeft <= minRight[i + 1])
                chunks++;
        }

        return chunks + 1; // last chunk is always valid
    }
};
```
