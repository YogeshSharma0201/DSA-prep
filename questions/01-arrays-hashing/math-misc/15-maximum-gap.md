# Maximum Gap

**Link:** https://leetcode.com/problems/maximum-gap/

## Problem
Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form. If the array contains fewer than two elements, return 0. Must run in O(n) time and O(n) space.

## Solution

### Core Idea
Use **bucket sort**. The key insight is that the maximum gap must always span across bucket boundaries — it can never be the largest difference between two elements sitting inside the same bucket.

### Why the max gap must cross bucket boundaries

**Step 1 — Average gap argument.**
In the sorted array there are `n-1` consecutive pairs. Their gaps sum to exactly `max - min`. So:

```
average gap = (max - min) / (n - 1)
```

The maximum gap is always >= the average gap, so:

```
max gap >= (max - min) / (n - 1)
```

**Step 2 — Bucket width.**
Set bucket width to approximately this average:

```
bucketSize = (max - min) / (n - 1)   (integer floor, at least 1)
```

**Step 3 — Within-bucket differences are smaller.**
Any two elements in the same bucket differ by at most `bucketSize - 1` (integer elements, bucket covers a half-open interval of width `bucketSize`). This is strictly less than `bucketSize`.

From Step 1, `max gap >= bucketSize`. So no within-bucket pair can produce the maximum gap — the max gap must be between elements in different buckets.

**Step 4 — What to track.**
Since the max gap spans bucket boundaries, we only need each bucket's local `min` and `max`. Then sweep non-empty buckets in order:

```
gap = currentBucket.min - previousBucket.max
```

---

> **Note on the "empty bucket" claim:** The pigeonhole principle says *n items into n-1 containers means at least one container holds 2+ items* — not that one is empty. Saying "at least one bucket is empty" is incorrect here; the algorithm works purely because within-bucket gaps are always < bucket width ≤ max gap.

## Code
```cpp
int maximumGap(vector<int>& nums) {
    int n = nums.size();
    if (n < 2) return 0;

    int minVal = *min_element(nums.begin(), nums.end());
    int maxVal = *max_element(nums.begin(), nums.end());

    if (minVal == maxVal) return 0;

    int bucketSize = max(1, (maxVal - minVal) / (n - 1));
    int bucketCount = (maxVal - minVal) / bucketSize + 1;

    vector<int> bMin(bucketCount, INT_MAX);
    vector<int> bMax(bucketCount, INT_MIN);

    for (int num : nums) {
        int idx = (num - minVal) / bucketSize;
        bMin[idx] = min(bMin[idx], num);
        bMax[idx] = max(bMax[idx], num);
    }

    int maxGap = 0, prevMax = minVal;

    for (int i = 0; i < bucketCount; i++) {
        if (bMin[i] == INT_MAX) continue; // empty bucket
        maxGap = max(maxGap, bMin[i] - prevMax);
        prevMax = bMax[i];
    }

    return maxGap;
}
```
