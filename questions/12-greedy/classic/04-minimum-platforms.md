# Minimum Number of Platforms

**Link:** https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaystation/

## Problem
Given arrival and departure times of all trains at a railway station, find the minimum number of platforms required so that no train waits.

## Solution
Sort arrivals and departures separately. Use two pointers: if the next arrival is before or at the next departure, a new platform is needed (increment count and advance arrival pointer); otherwise a train has left (decrement count and advance departure pointer). Track the maximum platforms needed at any point.

## Code
```cpp
int findMinPlatforms(vector<int>& arr, vector<int>& dep, int n) {
    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());

    int platforms = 1, maxPlatforms = 1;
    int i = 1, j = 0;
    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms++;
            i++;
        } else {
            platforms--;
            j++;
        }
        maxPlatforms = max(maxPlatforms, platforms);
    }
    return maxPlatforms;
}
```
