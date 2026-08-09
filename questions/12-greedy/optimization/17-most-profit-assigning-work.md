# Most Profit Assigning Work

**Link:** https://leetcode.com/problems/most-profit-assigning-work/

## Problem
You have `n` jobs, where `difficulty[i]` is the difficulty of the `i`th job and `profit[i]` is the profit of the `i`th job.

You also have `m` workers where `worker[i]` is the ability of the `i`th worker (i.e., the `i`th worker can only complete a job with difficulty at most `worker[i]`).

Every worker can be assigned at most one job, but one job can be completed multiple times. Return the maximum profit we can achieve after assigning the workers to the jobs.

## Solution
Greedy with Sorting / Two Pointers:
1. Pair each job's difficulty with its profit (`{difficulty[i], profit[i]}`).
2. Sort the jobs in ascending order of difficulty and sort the `worker` array in ascending order of ability.
3. Iterate through each worker. Maintain a pointer `j` to the hardest job the current worker can perform, updating `maxPTillNow` to be the maximum profit among all jobs with difficulty $\le \text{worker}[i]$.
4. Since workers are sorted, the jobs available to subsequent workers are a superset of those available to earlier workers, so `j` only moves forward.
5. Add `maxPTillNow` (if the worker can complete at least one job) to the total profit.

## Code
```cpp
class Solution {
public:
    int maxProfitAssignment(vector<int>& difficulty, vector<int>& profit, vector<int>& worker) {
        int jobsn = difficulty.size();
        vector<pair<int,int>> prodif(jobsn);

        for(int i=0; i<jobsn; i++) {
            prodif[i] = {difficulty[i], profit[i]};
        }

        sort(prodif.begin(), prodif.end());
        sort(worker.begin(), worker.end());

        int tollP = 0, maxPTillNow = prodif[0].second;
        int j = 0;

        for(int i=0; i<worker.size(); i++) {
            while(j+1 < jobsn && prodif[j+1].first <= worker[i]) {
                j++;
                maxPTillNow = max(maxPTillNow, prodif[j].second);
            }

            if(prodif[j].first <= worker[i]) tollP += maxPTillNow;
        }

        return tollP;
    }
};
```
