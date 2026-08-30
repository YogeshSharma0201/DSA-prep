# Minimum Number of Bottles Visible

**Link:** https://www.geeksforgeeks.org/dsa/minimum-number-of-bottles-visible-when-a-bottle-can-be-enclosed-inside-another-bottle/

## Problem
Given $N$ bottles of different sizes. A bottle can be enclosed inside another bottle if the size of the outer bottle is strictly greater than the inner bottle, and the outer bottle does not already contain any other bottle. Find the minimum number of visible bottles.

## Solution
This is a classic greedy problem. 

**Key Observation:**
- If there are multiple bottles of the same size, none of them can be enclosed in one another. Thus, if the maximum frequency of any bottle size is $M$, we will have at least $M$ visible bottles at the end.
- Since any smaller bottle can be nested inside a strictly larger one, it is always possible to nest all other bottles such that only $M$ bottles remain visible.
- Therefore, the answer is simply the **maximum frequency** of any element in the array.

We can implement this using two different approaches:
1. **Greedy Simulation (with Priority Queue):** Sort the array and simulate the nesting. Keep track of the currently visible bottles in a min-heap (implemented using a max-heap with negative values). For each bottle, if it is strictly larger than the smallest visible bottle, we nest the smaller one inside it (pop the smaller one) and mark the new bottle as visible.
2. **Max Frequency Count (Optimal):** Sort the array and find the maximum frequency of any element by counting consecutive duplicates. This runs in O(N log N) time and O(1) space.

## Code

### Solution 1: Greedy Simulation using Priority Queue
```cpp
class MinimumBottleVisible {
public:
     int count(vector<int> input) {
          priority_queue<int> pq;

          sort(input.begin(), input.end());

          for(int i=0; i<input.size(); i++) {
               if(!pq.empty() && -pq.top() < input[i]) pq.pop();
               pq.push(-input[i]);
          }

          return pq.size();
     }
};
```

### Solution 2: Max Frequency Count
```cpp
class MinimumBottleVisible {
public:
    int count(vector<int> input) {
        sort(input.begin(), input.end());

        int ans = 1, freq = 1;
        for (int i = 1; i < input.size(); i++) {
            if (input[i] == input[i - 1]) {
                freq++;
            } else {
                ans = max(ans, freq);
                freq = 1;
            }
        }
        ans = max(ans, freq);

        return ans;
    }
};
```
