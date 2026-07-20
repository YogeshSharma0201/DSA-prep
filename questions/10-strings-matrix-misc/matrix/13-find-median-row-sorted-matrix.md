# Find Median in Row-wise Sorted Matrix

**Link:** https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1

## Problem
Given an r x c matrix where each row is sorted, find the median of all the r*c elements. The total number of elements is always odd.

## Solution
Binary search on the answer. For a given mid value, count how many elements in the matrix are <= mid (using upper_bound on each row). The median is the smallest value where this count > (r*c)/2.

## Code
```cpp
int median(vector<vector<int>>& matrix, int r, int c) {
    int lo = 1, hi = 1e9, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int count = 0;
        for (int i = 0; i < r; i++)
            count += upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();
        if (count > (r * c) / 2) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    return ans;
}
```

## Alternative Approach (Min-Heap)
We can also solve this by finding the $k$-th smallest element in the matrix where $k = \frac{r \times c}{2} + 1$, similar to [Kth Smallest Element in a Sorted Matrix](file:///d:/Projects/DSA/questions/08-backtracking-heaps/heaps/11-kth-smallest-sorted-matrix.md).

1. Initialize a min-heap of size $r$ with the first element of each row: `(matrix[i][0], i, 0)`.
2. Pop the minimum element `(val, row, col)`, and push the next element in the same row `(matrix[row][col+1], row, col+1)` if it exists.
3. Repeat this pop-push process $k$ times. The last popped element is the median.

### Comparison of Approaches

| Metric | Binary Search (Current Solution) | Min-Heap Approach |
| :--- | :--- | :--- |
| **Time Complexity** | $O(r \log c \cdot \log(\text{Range}))$ | $O(r + (r \times c) \log r)$ |
| **Space Complexity** | $O(1)$ | $O(r)$ |
| **Trade-offs** | **Faster for large matrices**. If $r \times c \approx 10^6$, Binary Search does $\approx 3 \times 10^5$ operations whereas Heap does $\approx 5 \times 10^6$ operations. | **Range Independent**. Best when value range is extremely large, arbitrary, or uses floating-point values where binary search bounds are difficult to set. |
