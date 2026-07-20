# Find Median from Data Stream

**Link:** https://leetcode.com/problems/find-median-from-data-stream

## Problem
Design a data structure that supports adding integers from a data stream and finding the median of all elements seen so far. Both `addNum` and `findMedian` must be efficient.

## Solution
Maintain two heaps: a max-heap (`lo`) for the lower half and a min-heap (`hi`) for the upper half. After each insertion, rebalance so that `lo` has the same size as `hi` or exactly one more. The median is either the top of `lo` (odd total) or the average of both tops (even total).

## Code
```cpp
class MedianFinder {
public:
    priority_queue<int> lo;                          // max-heap (lower half)
    priority_queue<int, vector<int>, greater<int>> hi; // min-heap (upper half)

    MedianFinder() {}

    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top());
        lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top());
            hi.pop();
        }
    }

    double findMedian() {
        if (lo.size() > hi.size())
            return lo.top();
        return (lo.top() + hi.top()) / 2.0;
    }
};
```
