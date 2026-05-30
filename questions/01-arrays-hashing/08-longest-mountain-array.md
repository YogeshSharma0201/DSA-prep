# Longest Mountain in Array

**Link:** https://leetcode.com/problems/longest-mountain-in-array/

## Problem
Given an integer array `arr`, return the length of the longest subarray that is a "mountain". A mountain subarray has elements that strictly increase to a peak and then strictly decrease. The mountain must have at least one element on each side of the peak, so the minimum valid mountain length is 3.

## Solution
Iterate through the array tracking a current streak length (`currS`) and a `peakCheck` flag. When a valley or plateau is detected (element is not strictly part of an ongoing slope), update the max if a peak was seen, then reset. Set `peakCheck = true` when a strict peak (`arr[i] > arr[i-1] && arr[i] > arr[i+1]`) is found. At the end, do a final check in case the mountain ends at the last element.

## Code
```cpp
int longestMountain(vector<int>& arr) {
    int maxS = 0;
    int currS = 0;
    bool peakCheck = false;

    for (int i = 0; i < arr.size(); i++) {
        if (i == 0) {
            if (arr.size() > 1 && arr[i+1] != arr[i]) currS = 1;
        }
        else if (i == arr.size() - 1) {
            if (arr[i-1] != arr[i]) currS++;
        }
        else {
            if ((arr[i] <= arr[i-1] && arr[i] < arr[i+1])
             || (arr[i] < arr[i-1] && arr[i] <= arr[i+1])) {
                if (peakCheck) maxS = max(currS + 1, maxS);
                currS = 1;
                peakCheck = false;
            }
            else if (arr[i+1] != arr[i]) {
                currS++;
            }
            if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
                peakCheck = true;
            }
        }
        if (peakCheck) maxS = max(currS, maxS);
    }

    return maxS;
}
```
