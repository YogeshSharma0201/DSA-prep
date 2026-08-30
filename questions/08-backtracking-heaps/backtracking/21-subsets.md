# Subsets

**Link:** https://leetcode.com/problems/subsets/

## Problem
Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

---

## Solution (Backtracking / Pick & Don't Pick)

### Approach
- We use a recursive backtracking approach where at each index `idx`, we make two choices:
  1. **Exclude** `nums[idx]`: Recurse to `idx + 1` without adding `nums[idx]` to current subset (`path`).
  2. **Include** `nums[idx]`: Add `nums[idx]` to `path`, recurse to `idx + 1`, and then backtrack by popping `nums[idx]`.
- When `idx == nums.size()`, we have made a decision for every element, so we append the current `path` to the result list `res`.

### Complexity
- **Time Complexity:** O(n * 2^n) — There are $2^n$ subsets and each subset can take up to O(n) time to copy.
- **Space Complexity:** O(n) — For the recursion call stack and `path` array (excluding the returned result array).

---

## Code

```cpp
#include <vector>

using namespace std;

class Solution {
public:
    void solve(vector<int>& nums, int idx, vector<int>& path, vector<vector<int>>& res) {
        if (idx == nums.size()) {
            res.push_back(path);
            return;
        }

        // Choice 1: Exclude nums[idx]
        solve(nums, idx + 1, path, res);

        // Choice 2: Include nums[idx]
        path.push_back(nums[idx]);
        solve(nums, idx + 1, path, res);
        path.pop_back(); // Backtrack
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        solve(nums, 0, path, res);
        
        return res;
    }
};
```
