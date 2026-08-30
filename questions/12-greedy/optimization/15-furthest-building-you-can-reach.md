# Furthest Building You Can Reach

**Link:** https://leetcode.com/problems/furthest-building-you-can-reach

## Problem
You are given an integer array `heights` representing the heights of buildings, some `bricks`, and some `ladders`.
You start your journey from building `0` and move to the next building by possibly using bricks or ladders.
While moving from building `i` to building `i+1` (0-indexed):
- If the next building's height is **less than or equal to** the current building's height, you do **not** need any ladders or bricks.
- If the next building's height is **greater than** the current building's height, you can either use **one ladder** or `(heights[i+1] - heights[i])` **bricks**.

Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

## Solution
Greedy approach using a Max-Heap (priority queue):
1. We want to use ladders for the largest height differences and bricks for the smaller differences.
2. Iterate through the buildings. For each positive height difference `diff`, first try to use `bricks` and record this jump's size in a max-heap.
3. If we don't have enough bricks for the current jump:
   - If we have no ladders left, we cannot proceed. The current index `i` is the furthest building we can reach.
   - If we have at least one ladder, we check if the largest jump we previously made using bricks (represented by `pq.top()`) is larger than `diff`.
   - If so, we "reclaim" those bricks by replacing that previous jump with a ladder (`ladders--`), and use the reclaimed bricks for the current jump.
   - If not, we simply use a ladder for the current jump (`ladders--`).
4. If we successfully loop through all buildings, return the last index (`heights.size() - 1`).

Time Complexity: O(N log N) where $N$ is the number of buildings (each heap operation takes O(log N)).
Space Complexity: O(N) for the priority queue.

## Code
```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int> pq;

        for(int i=0; i<heights.size()-1; i++) {
            int diff = heights[i+1] - heights[i];

            if(diff <= 0) continue;
            else if(bricks >= diff) {
                bricks -= diff;
                pq.push(diff);
            }
            else if(ladders == 0) {
                return i;
            }
            else {
                if(!pq.empty() && pq.top() > diff) {
                    bricks += pq.top() - diff; pq.pop();
                    ladders--;
                    pq.push(diff);
                }
                else {
                    ladders--;
                }
            }
        }
        return heights.size()-1;
    }
};
```
