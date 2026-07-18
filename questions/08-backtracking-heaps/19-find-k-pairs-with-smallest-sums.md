# Find K Pairs with Smallest Sums

**Link:** https://leetcode.com/problems/find-k-pairs-with-smallest-sums

## Problem
You are given two integer arrays `input1` and `input2` sorted in ascending order and an integer `k`.
Define a pair `(u, v)` which consists of one element from `input1` and one element from `input2`.
Return the `k` pairs with the smallest sums.

## Solution
We can use a priority queue (which acts as a min-heap by pushing negative values) to keep track of the pairs with the smallest sums.

### Approach 1 (With Visited Array / Matrix)
Start by pushing the first pair `(0, 0)` into the priority queue. To avoid processing the same indices multiple times, we maintain a 2D boolean `isVis` array of size `(k+1) x (k+1)` since we never need to go beyond index `k` in either array. Whenever we pop a pair `(i, j)`, we add it to the result and push `(i+1, j)` and `(i, j+1)` if they are within bounds and haven't been visited.

### Approach 2 (Space Optimized - Moving in One Direction)
> [!NOTE]
> We can save `isVis` array space by moving in one direction on `input2` only when popping elements from the queue and pre-loading the queue with `input1` elements.
>
> Specifically, we pre-load the priority queue with all `(i, 0)` pairs (where `i` goes from `0` to `min(input1.size(), k)`).
> Then, when popping `(i, j)`, we only need to push the next pair along the `input2` direction, which is `(i, j+1)`. This avoids duplicate exploration without needing any visited set or 2D array.

## Code

### Solution 1: With Visited Matrix
```cpp
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& input1, vector<int>& input2, int k) {
        priority_queue<pair<int, pair<int,int>>> pq; // max-heap
        
        // We won't need greater that k elements from any array
        // This optimisation helps to fit the memory constraints
          vector<vector<bool>> isVis(k+1, vector<bool>(k+1, 0));
          pq.push({-input1[0]-input2[0], {0,0}});

          vector<vector<int>> res;
          while(!pq.empty() && res.size() < k) {
               auto it = pq.top(); pq.pop();
                // cout<<it.first<<" "<<it.second.first<<" "<<it.second.second<<endl;
               if(isVis[it.second.first][it.second.second]) continue;
               isVis[it.second.first][it.second.second] = true;

               res.push_back({input1[it.second.first],input2[it.second.second]});

               if(it.second.first+1 < input1.size())
                pq.push({-input1[it.second.first+1]-input2[it.second.second], {it.second.first+1,it.second.second}});

               if(it.second.second+1 < input2.size()) 
                pq.push({-input1[it.second.first]-input2[it.second.second+1], {it.second.first,it.second.second+1}});
          }

          return res;
    }
};
```

### Solution 2: Space Optimized (Without Visited Matrix)
```cpp
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& input1, vector<int>& input2, int k) {
        priority_queue<pair<int, pair<int,int>>> pq; // max-heap

        for(int i=0; i<k && i < input1.size(); i++)
            pq.push({-input1[i]-input2[0], {i,0}});

        vector<vector<int>> res;
        while(!pq.empty() && res.size() < k) {
            auto it = pq.top(); pq.pop();
                // cout<<it.first<<" "<<it.second.first<<" "<<it.second.second<<endl;

            res.push_back({input1[it.second.first],input2[it.second.second]});     

            if(it.second.second+1 < input2.size())  {
                pq.push({-input1[it.second.first]-input2[it.second.second+1], {it.second.first,it.second.second+1}});
            }                
          }

          return res;
    }
};
```
