# Count Inversions

**Link:** https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1

## Problem
Given an array of N integers, count the number of inversions. An inversion is a pair (i, j) where i < j but arr[i] > arr[j].

## Solution
Use a modified merge sort. During the merge step, whenever an element from the right half is placed before elements from the left half, those elements from the left half all form inversions with it. Count these during merge and accumulate the total.

## Code
```cpp
long long merge(vector<int>& arr, int l, int mid, int r) {
    long long count = 0;
    vector<int> temp;
    int i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            count += (mid - i + 1);
            temp.push_back(arr[j++]);
        }
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = l; k <= r; k++) arr[k] = temp[k - l];
    return count;
}

long long mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return 0;
    int mid = (l + r) / 2;
    long long count = 0;
    count += mergeSort(arr, l, mid);
    count += mergeSort(arr, mid + 1, r);
    count += merge(arr, l, mid, r);
    return count;
}

long long inversionCount(vector<int>& arr) {
    return mergeSort(arr, 0, arr.size() - 1);
}
```
