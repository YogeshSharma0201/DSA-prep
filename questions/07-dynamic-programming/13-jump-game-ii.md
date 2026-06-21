# Jump Game II

**Link:** https://leetcode.com/problems/jump-game-ii/

## Problem
Given an array of non-negative integers where nums[i] is the maximum jump from index i, return the minimum number of jumps to reach the last index. It is guaranteed you can always reach the last index. You want the fewest jumps possible.

## Solution
Greedy BFS treating each jump as a level. Track the current level's boundary (far) and the farthest reachable index in the next level (farthest). Scan all indices in the current level, updating farthest. When the loop reaches far, increment jumps and advance near and far to the next level. Repeat until far reaches the last index.

## Code
```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int near = 0, far = 0, jumps = 0;

        while (far < nums.size() - 1) {
            int farthest = 0;
            for (int i = near; i <= far; i++) {
                farthest = max(farthest, i + nums[i]);
            }
            near = far + 1;
            far = farthest;
            jumps++;
        }

        return jumps;
    }
};
```
