# Single-Threaded CPU

**Link:** https://leetcode.com/problems/single-threaded-cpu/

## Problem
Given `n` tasks where `tasks[i] = [enqueueTime_i, processingTime_i]`. You have a single-threaded CPU that can process at most one task at a time and will act according to the following rules:
- If the CPU is idle and no tasks are available to process, the CPU remains idle.
- If the CPU is idle and there are available tasks, the CPU will choose the one with the **shortest processing time**. If multiple tasks have the same shortest processing time, it will choose the task with the **smallest original index**.
- Once a task is started, the CPU will process the entire task without stopping.
- Return the order in which the CPU will process the tasks.

---

## Optimized Solution

### Key Findings & Improvements
1. **Natural Lexicographical Sorting with `push_back(i)`**:
   - By simply appending the original index `i` into each `tasks[i] = {enqueueTime, processingTime, i}`, standard `std::sort(tasks.begin(), tasks.end())` automatically sorts by `enqueueTime` first.
   - **Key Finding**: If two tasks have the exact same `enqueueTime` and `processingTime`, `std::vector`'s default `<` operator checks element-by-element lexicographically, naturally sorting by `originalIndex` without requiring any custom comparator.
2. **`std::pair<int, int>` with `greater<>` Min-Heap**:
   - Storing `{processingTime, originalIndex}` in a min-heap eliminates the need for custom comparator lambdas and `decltype(cmp)` boilerplate.
   - `std::pair` comparisons naturally compare `first` (processing time) first, and automatically tie-break using `second` (original index).
3. **Direct CPU Idle Advance**:
   - If the CPU is idle and `pq` is empty, we directly jump `currT = tasks[idx][0]` instead of repeatedly pushing/popping.

### Code (Optimized)
```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n = tasks.size();
        for (int i = 0; i < n; ++i) {
            tasks[i].push_back(i); // {enqueueTime, processingTime, originalIndex}
        }
        
        // Naturally sorts by enqueueTime -> processingTime -> originalIndex
        sort(tasks.begin(), tasks.end());
        
        // Min-heap storing: {processingTime, originalIndex}
        // Defaults to sorting by processingTime first, tie-breaking by originalIndex
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<int> ans;
        long long currT = 0;
        int idx = 0;
        
        while (idx < n || !pq.empty()) {
            // If CPU is idle, advance time directly to the next task's enqueueTime
            if (pq.empty() && currT < tasks[idx][0]) {
                currT = tasks[idx][0];
            }
            
            // Push all tasks available at current time
            while (idx < n && tasks[idx][0] <= currT) {
                pq.push({tasks[idx][1], tasks[idx][2]});
                idx++;
            }
            
            // Process the shortest task
            auto [procTime, origIdx] = pq.top();
            pq.pop();
            currT += procTime;
            ans.push_back(origIdx);
        }
        
        return ans;
    }
};
```

---

## Original Solution

```cpp
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        vector<int> index(tasks.size(), 0);
        iota(index.begin(), index.end(), 0);

        auto cmp = [&](int a1, int b1) {
            vector<int>& a = tasks[a1];
            vector<int>& b = tasks[b1];
            if(a[1] == b[1]) return a1 > b1;
            return a[1] > b[1];
        };

        priority_queue<int, vector<int>, decltype(cmp)> pq(cmp);

        sort(index.begin(), index.end(), [&](int a1, int b1) {
            vector<int>& a = tasks[a1];
            vector<int>& b = tasks[b1];
            if(a[0] == b[0]) return a[1] == b[1] ? a1 < b1 : a[1] < b[1];
            return a[0] < b[0];
        });

        vector<int> ans;
        long long currT = 0, idx = 0;
        
        while(!pq.empty() || idx < index.size()) {
            if(pq.empty()) {
                pq.push(index[idx++]);
            }
            else {
                int t = pq.top(); pq.pop();
                currT = max(currT, tasks[t][0]*1LL) + tasks[t][1];

                while(idx < tasks.size() && tasks[index[idx]][0] <= currT)
                    pq.push(index[idx++]);

                ans.push_back(t);
            }
        }

        return ans;
    }
};
```
