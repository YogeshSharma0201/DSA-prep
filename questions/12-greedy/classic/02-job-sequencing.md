# Job Sequencing Problem

**Link:** https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1

## Problem
Given a set of N jobs where each job has a deadline and a profit if completed before the deadline, schedule jobs to maximize total profit. Each job takes one unit of time and only one job can be scheduled at a time.

## Solution

### Approach 1: Min-Heap / Priority Queue (Greedy by Deadline) — O(N log N) Time, O(N) Space
1. Pair each job's deadline and profit, then sort jobs in ascending order of deadlines.
2. Maintain a min-heap (`priority_queue<int, vector<int>, greater<>>`) to store the profits of currently selected jobs.
3. For each job, push its profit into the min-heap.
4. If the size of the min-heap exceeds the current job's deadline, pop the smallest profit from the heap (since we can schedule at most `deadline` jobs up to this time, dropping the lowest profit job is optimal).
5. The remaining elements in the min-heap represent the optimal job schedule. Heap size gives the maximum count of jobs, and the sum of elements gives the total profit.

### Approach 2: Slot Array (Greedy by Profit) — O(N log N + N * max_deadline) Time
1. Sort all jobs in decreasing order of profit.
2. For each job, try to assign it to the latest available time slot at or before its deadline using a slot array.
3. If a free slot is found, mark it used and add the profit.

### Approach 3: Disjoint Set / DSU (Optimized Slot Finding) — O(N log N + N * α(M)) Time, O(M) Space
1. Sort jobs in decreasing order of profit.
2. Maintain a `parent` array of size `max_deadline + 1` initialized such that `parent[i] = i`. `parent[i]` points to the latest available slot $\le i$.
3. For each job with deadline `d`, find `availableSlot = findParent(min(max_deadline, d))`.
4. If `availableSlot > 0`, schedule the job at `availableSlot` and union it with `availableSlot - 1` by setting `parent[availableSlot] = findParent(availableSlot - 1)`.
5. If `availableSlot == 0`, no free slot is available $\le d$, so skip the job.
*This optimizes slot finding from linear search $O(M)$ to almost $O(1)$ time using Path Compression.*

## Code

### Approach 1: Min-Heap / Priority Queue (Optimal - O(N log N))

```cpp
class Solution {
  public:
    vector<int> jobSequencing(vector<int> &deadline, vector<int> &profit) {
        int n = deadline.size();
        vector<pair<int, int>> arr(n);
        for (int i = 0; i < n; i++) {
            arr[i] = {deadline[i], profit[i]};
        }
        
        // Sort jobs based on deadline in ascending order
        sort(arr.begin(), arr.end());
        
        // Min-heap to store profits of selected jobs
        priority_queue<int, vector<int>, greater<>> pq;
        
        for (int i = 0; i < n; i++) {
            pq.push(arr[i].second);
            // If number of jobs selected exceeds the deadline, remove the job with minimum profit
            if (pq.size() > arr[i].first) {
                pq.pop();
            }
        }
        
        int cnt = pq.size(), sum = 0;
        while (!pq.empty()) {
            sum += pq.top();
            pq.pop();
        }
        
        return {cnt, sum};
    }
};
```

### Approach 2: Slot Array (Greedy by Profit)

```cpp
pair<int, int> jobSequencing(vector<int>& id, vector<int>& deadline,
                            vector<int>& profit, int n) {
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b) {
        return profit[a] > profit[b];
    });

    int maxDeadline = *max_element(deadline.begin(), deadline.end());
    vector<int> slot(maxDeadline + 1, -1);
    int totalProfit = 0, jobCount = 0;

    for (int i : idx) {
        for (int t = min(maxDeadline, deadline[i]); t >= 1; t--) {
            if (slot[t] == -1) {
                slot[t] = id[i];
                totalProfit += profit[i];
                jobCount++;
                break;
            }
        }
    }
    return {jobCount, totalProfit};
}
```

### Approach 3: Disjoint Set / DSU (Greedy by Profit + Path Compression)

```cpp
class Solution {
  public:
    int findParent(int node, vector<int>& parent) {
        if (node == parent[node]) return node;
        return parent[node] = findParent(parent[node], parent);
    }

    vector<int> jobSequencing(vector<int> &deadline, vector<int> &profit) {
        int n = deadline.size();
        vector<pair<int, int>> jobs(n);
        int maxDeadline = 0;
        for (int i = 0; i < n; i++) {
            jobs[i] = {profit[i], deadline[i]}; // {profit, deadline}
            maxDeadline = max(maxDeadline, deadline[i]);
        }

        // Sort jobs by profit in descending order
        sort(jobs.rbegin(), jobs.rend());

        // DSU parent array: parent[i] stores the latest available slot <= i
        vector<int> parent(maxDeadline + 1);
        for (int i = 0; i <= maxDeadline; i++) {
            parent[i] = i;
        }

        int cnt = 0, totalProfit = 0;
        for (int i = 0; i < n; i++) {
            int availableSlot = findParent(jobs[i].second, parent);

            if (availableSlot > 0) {
                // Schedule job at availableSlot and point it to the next available slot (availableSlot - 1)
                parent[availableSlot] = findParent(availableSlot - 1, parent);
                cnt++;
                totalProfit += jobs[i].first;
            }
        }

        return {cnt, totalProfit};
    }
};
```


