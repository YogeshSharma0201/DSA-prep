# Job Sequencing Problem

**Link:** https://www.geeksforgeeks.org/job-sequencing-problem/

## Problem
Given a set of N jobs where each job has a deadline and a profit if completed before the deadline, schedule jobs to maximize total profit. Each job takes one unit of time and only one job can be scheduled at a time.

## Solution
Greedy: sort jobs in decreasing order of profit. For each job, try to assign it to the latest available time slot at or before its deadline using a slot array. If a slot is found, mark it used and add the profit.

## Code
```cpp
pair<int,int> jobSequencing(vector<int>& id, vector<int>& deadline,
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
