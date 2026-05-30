# Jump Game

**Link:** https://leetcode.com/problems/jump-game/

## Problem
Given an array of non-negative integers where nums[i] represents the maximum jump length from index i, determine if you can reach the last index starting from index 0. You do not have to use the maximum jump length at each position.

## Solution
Greedy approach: track the maximum index reachable so far. Iterate through each index; if the current index exceeds maxReach, it is unreachable so return false. Otherwise update maxReach = max(maxReach, i + nums[i]). If the loop completes without returning false, return true.

## Code
```cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < (int)nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}
```
