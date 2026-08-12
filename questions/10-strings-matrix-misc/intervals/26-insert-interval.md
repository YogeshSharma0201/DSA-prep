# Insert Interval

**Link:** https://leetcode.com/problems/insert-interval/

## Problem
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` after the insertion.

---

## Solution 1: Optimal Linear Scan — $\mathcal{O}(n)$ (Recommended)

### Approach (3-Phase Scan)
Since `intervals` is already sorted, we can process all intervals in 3 sequential phases:
1. **Phase 1 (Before Overlap):** Add all intervals that end *before* `newInterval` starts (`intervals[i][1] < newInterval[0]`).
2. **Phase 2 (Overlapping & Merging):** For all intervals that overlap with `newInterval` (`newInterval[1] >= intervals[i][0]`), expand `newInterval` to cover the entire overlap:
   $$\text{newInterval}[0] = \min(\text{newInterval}[0], \text{intervals}[i][0])$$
   $$\text{newInterval}[1] = \max(\text{newInterval}[1], \text{intervals}[i][1])$$
   Once all overlapping intervals are merged, push `newInterval` into `res`.
3. **Phase 3 (After Overlap):** Add all remaining intervals that start *after* `newInterval` ends.

### Complexity
- **Time Complexity:** $\mathcal{O}(n)$ — Single linear pass over the intervals.
- **Space Complexity:** $\mathcal{O}(n)$ — For storing the result.

### Code

```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int n = intervals.size(), i = 0;
        vector<vector<int>> res;

        // Case 1: No overlapping case before the merged interval
        // Compare ending point of current interval to starting point of newInterval
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }

        // Case 2: Overlapping case - continuously merge into newInterval
        while (i < n && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);

        // Case 3: No overlapping - add all remaining intervals after newInterval
        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }

        return res;
    }
};
```

---

## Solution 2: Insert, Sort & Merge — $\mathcal{O}(n \log n)$

> **Key Insight:** It is difficult to insert the new interval directly into its correct place because there are many edge cases to handle manually (e.g., overlapping multiple existing intervals, non-overlapping, strictly smaller than the first interval, strictly larger than the last interval, or spanning across the entire range).
>
> A straightforward alternative is:
> 1. **Insert** `newInterval` into the `intervals` list.
> 2. **Sort** all intervals by their start time.
> 3. **Merge** overlapping intervals in a single pass (identical to the standard *Merge Intervals* algorithm).

### Complexity
- **Time Complexity:** $\mathcal{O}(n \log n)$ — Dominated by sorting $n + 1$ intervals.
- **Space Complexity:** $\mathcal{O}(n)$ — For storing the merged output.

### Code

```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int n = intervals.size();
        
        intervals.push_back(newInterval);
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> ret;

        int startIdx = intervals[0][0], endIdx = intervals[0][1];
        for (int i = 1; i < n + 1; i++) {
            if (intervals[i][0] <= endIdx) {
                endIdx = max(endIdx, intervals[i][1]);
            }
            else {
                ret.push_back({startIdx, endIdx});
                startIdx = intervals[i][0];
                endIdx = intervals[i][1];
            }
        }
        ret.push_back({startIdx, endIdx});

        return ret;
    }
};
```
