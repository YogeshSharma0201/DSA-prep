# Quick Sort

**Link:** https://www.geeksforgeeks.org/problems/quick-sort/1

## Problem
Given an array, sort it in ascending order using the QuickSort algorithm.

## Solution
Pick the last element of the current range as the pivot. Use the Lomuto partition scheme: walk `j` through the range, and whenever an element is `<= pivot`, swap it into position `i` (the boundary of the "smaller than pivot" region) and advance `i`. After the walk, the pivot's final sorted position is `i-1`. Recurse on the left `[low, p-1]` and right `[p+1, high]` sub-ranges.

## Code
```cpp
class Solution {
  public:
    void quickSort(vector<int>& arr, int low, int high) {
        if(low >= high) return;

        int p = partition(arr, low, high);
        quickSort(arr, low, p-1);
        quickSort(arr, p+1, high);
    }

    int partition(vector<int>& arr, int low, int high) {
        int x = arr[high];
        int i=low, j=low;
        while(j<=high) {
            if(arr[j] <= x) {
                swap(arr[i++], arr[j]);
            }
            j++;
        }
        return i-1;
    }
};
```
