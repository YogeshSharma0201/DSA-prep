# Smallest Range Covering Elements from K Lists

**Link:** https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/

## Problem
You have `k` lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the `k` lists.

We define the range `[a, b]` is smaller than range `[c, d]` if `b - a < d - c` or `(b - a == d - c and a < c)`.

## Solution

### Approach 1: Min-Heap (K-Pointer)
Generalize the multi-pointer approach used in [Minimize the Absolute Difference](file:///d:/Projects/DSA/questions/02-two-pointers-sliding-window/two-pointers/11-minimize-the-absolute-difference.md). 
Maintain a min-heap containing one element from each of the `k` lists (initialized with the first element of each list). Also track the running maximum of the elements currently in the heap (`curMax`). At each step:
1. Pop the minimum element from the heap (`curMin`).
2. Update the minimum range if the current range `[curMin, curMax]` is smaller.
3. Push the next element from the same list as the popped element into the heap and update `curMax`.
4. If any list is exhausted, stop.

### Approach 2: Merge + Sliding Window
1. Merge all `k` sorted lists into a single sorted array `arr` of pairs `(value, list_index)` using a min-heap.
2. Use a sliding window with a frequency map to find the shortest window `[l, r]` in `arr` that contains at least one element from all `k` lists (i.e. `umap.size() == k`).

## Code

### Code (Approach 1: Min-Heap)
```cpp
class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        // Min-Heap: stores (value, list index, element index)
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> minHeap;
        int curMax = numeric_limits<int>::min();

        // Initialize the heap with the first element of each list
        for (int i = 0; i < nums.size(); i++) {
            minHeap.push({nums[i][0], i, 0});
            curMax = max(curMax, nums[i][0]);
        }
        // Track the smallest range
        vector<int> smallRange = {0, INT_MAX};

        while (!minHeap.empty()) {
            // Get the minimum element from the heap
            vector<int> curr = minHeap.top();
            minHeap.pop();
            int curMin = curr[0], listIdx = curr[1], elemIdx = curr[2];

            // Update the smallest range if a better one is found
            if (curMax - curMin < smallRange[1] - smallRange[0]) {
                smallRange[0] = curMin;
                smallRange[1] = curMax;
            }

            // Move to the next element in the same list
            if (elemIdx + 1 < nums[listIdx].size()) {
                int nextVal = nums[listIdx][elemIdx + 1];
                minHeap.push({nextVal, listIdx, elemIdx + 1});
                curMax = max(curMax, nextVal);
            } else {
                // If any list is exhausted, stop
                break;
            }
        }
        return smallRange;
    }
};
```

### Code (Approach 2: Merge + Sliding Window)
```cpp
class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        vector<pair<int,int>> arr;

        priority_queue<pair<int,pair<int,int>>> pq;
        for(int i=0; i<nums.size(); i++) {
            pq.push({-nums[i][0], {i,0}});
        }
        while(!pq.empty()) {
            auto [n, idx] = pq.top(); pq.pop();

            arr.push_back({-n, idx.first});
            if(idx.second+1 < nums[idx.first].size()) {
                pq.push({-nums[idx.first][idx.second+1], {idx.first, idx.second+1}});
            }
        }

        unordered_map<int,int> umap;
        int l = 0, r = 0;
        int resl = 0, resr = 0;
        int minSize = INT_MAX>>1;
        while(l<= r && r < arr.size()) {
            umap[arr[r].second]++;
            
            while(umap.size() == nums.size()) {
                if(arr[r].first-arr[l].first+1 < minSize) {
                    minSize = arr[r].first-arr[l].first+1;
                    resl = l;
                    resr = r;
                }
                umap[arr[l].second]--;
                if(umap[arr[l].second] == 0) umap.erase(arr[l].second);
                l++;
            }
            r++;
        }

        return {arr[resl].first, arr[resr].first};
    }
};
```
