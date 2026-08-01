# Merge Sorted Arrays without Extra Space

**Link:** https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1

## Problem
Given two sorted arrays arr1[] and arr2[] of sizes m and n, merge them in sorted order without using extra space. After merging, arr1[] should contain the first m smallest elements and arr2[] should contain the last n elements.

---

## Approach 1: Swap and Sort (Most Intuitive)

### Concept
Since both arrays are already sorted, the smallest elements should end up in `arr1` and the largest in `arr2`. 
We can iterate from the end of `arr1` (largest elements) and the beginning of `arr2` (smallest elements). If an element in `arr1` is larger than an element in `arr2`, we swap them. We continue this until we find an element in `arr1` that is smaller than or equal to the element in `arr2`.
Finally, we sort both arrays to restore their individual sorted order.

### Code
```cpp
void mergeArrays(vector<int>& a, vector<int>& b) {
    int i = a.size() - 1;
    int j = 0;
    
    // Swap out-of-order elements between the two arrays
    while (i >= 0 && j < b.size()) {
        if (a[i] > b[j]) {
            swap(a[i], b[j]);
            i--; 
            j++;
        } else {
            break;
        }
    }
    
    // Sort both arrays to restore sorted order
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
}
```

### Complexity
- **Time Complexity:** \(O(n \log n + m \log m)\)
  - The swapping loop runs at most \(\min(n, m)\) times, which is \(O(\min(n, m))\).
  - Sorting both arrays takes \(O(n \log n + m \log m)\).
- **Space Complexity:** \(O(1)\) auxiliary space (excluding recursion stack space for sorting).

---

## Approach 2: The Gap Method (Shell Sort variant)

### Concept
Based on Shell Sort. We start with a gap of \(\text{ceil}((n + m) / 2)\) across the combined virtual array. We compare elements at index `i` and `j` (where `j = i + gap`). If `arr[i] > arr[j]`, we swap them. We reduce the gap by half in each iteration until the gap becomes 0.

### Code
```cpp
void merge(vector<long long>& arr1, vector<long long>& arr2, int n, int m) {
    int gap = (n + m + 1) / 2;
    while (gap > 0) {
        int i = 0, j = gap;
        while (j < n + m) {
            long long& a = (i < n) ? arr1[i] : arr2[i - n];
            long long& b = (j < n) ? arr1[j] : arr2[j - n];
            if (a > b) swap(a, b);
            i++; 
            j++;
        }
        gap = (gap == 1) ? 0 : (gap + 1) / 2;
    }
}
```

### Complexity
- **Time Complexity:** \(O((n + m) \log(n + m))\)
  - The outer loop runs \(O(\log(n + m))\) times as the gap is halved.
  - The inner loop does \(O(n + m)\) comparisons.
- **Space Complexity:** \(O(1)\) auxiliary space.

---

## Comparison and Recommendations

* **Approach 1 (Swap and Sort)** is highly recommended in actual interview settings because it is:
  1. Extremely easy to write, memorize, and explain.
  2. Very efficient in practice, as `std::sort` on almost-sorted or partially-sorted arrays runs extremely fast.
* **Approach 2 (Gap Method)** is a classic academic solution but harder to write bug-free under pressure due to the virtual indexing across both arrays.

