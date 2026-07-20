# Minimum Cost to Hire K Workers

**Link:** https://leetcode.com/problems/minimum-cost-to-hire-k-workers/

## Problem
There are n workers, each with a quality and a minimum wage expectation. You must hire exactly k workers and pay them such that each worker's pay is at least their minimum wage and pay is proportional to quality. Find the minimum total wage to hire k workers.

## Solution
Sort workers by their wage-to-quality ratio. For each worker considered as the "captain" (highest ratio in the group), the total cost is `ratio * sum_of_k_lowest_qualities`. Use a max-heap of size k to maintain the k smallest qualities seen so far and their running sum. As each new worker is considered, add their quality; if heap exceeds size k, remove the largest to maintain optimality.

## Code
```cpp
class Solution {
public:
    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        int n = quality.size();
        vector<pair<double,int>> workers(n);
        for (int i = 0; i < n; i++)
            workers[i] = {(double)wage[i] / quality[i], quality[i]};
        sort(workers.begin(), workers.end());

        priority_queue<int> maxHeap; // max-heap to keep k smallest qualities
        double qualSum = 0, ans = DBL_MAX;

        for (auto& [ratio, q] : workers) {
            maxHeap.push(q);
            qualSum += q;
            if ((int)maxHeap.size() > k) {
                qualSum -= maxHeap.top();
                maxHeap.pop();
            }
            if ((int)maxHeap.size() == k)
                ans = min(ans, ratio * qualSum);
        }
        return ans;
    }
};
```
