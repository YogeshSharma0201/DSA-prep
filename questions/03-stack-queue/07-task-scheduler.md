# Task Scheduler

**Link:** https://leetcode.com/problems/task-scheduler/

## Problem
Given a list of CPU tasks and a non-negative cooling interval n, find the minimum number of intervals needed to execute all tasks. Between two identical tasks, at least n intervals must pass. During idle intervals the CPU does nothing.

## Solution
Use a max priority queue (max-heap) ordered by task frequency. Process tasks in cycles of length n+1. In each cycle, greedily pick the highest-frequency available tasks (up to n+1 of them), decrement their counts, and re-add those with remaining work to the heap. If fewer than n+1 tasks fill the cycle, add idle slots for the remainder — unless the queue is now empty (last cycle can be shorter).

## Code
```cpp
int leastInterval(vector<char>& tasks, int n) {
    priority_queue<int> pq;
    vector<int> mp(26, 0);

    for (char t : tasks) {
        mp[t - 'A']++;
    }
    for (int i = 0; i < 26; ++i) {
        if (mp[i]) pq.push(mp[i]);
    }

    int time = 0;
    while (!pq.empty()) {
        vector<int> remain;
        int cycle = n + 1;

        while (cycle && !pq.empty()) {
            int max_freq = pq.top();
            pq.pop();
            if (max_freq > 1) {
                remain.push_back(max_freq - 1);
            }
            ++time;
            --cycle;
        }

        for (int count : remain) {
            pq.push(count);
        }
        if (pq.empty()) break;
        time += cycle; // idle slots
    }
    return time;
}
```
