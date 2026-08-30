# Subsets II

**Link:** https://leetcode.com/problems/subsets-ii/

## Problem
Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

---

## Solution (Backtracking with Duplicate Skipping)

### Approach
1. **Sort the Array**:
   - Sorting groups identical elements together, allowing us to easily identify and skip duplicate choices.
2. **Backtracking Decision Tree**:
   - At each step (`idx`):
     - **Exclude choice (Skip all occurrences)**: Find the next index with a distinct value `nextDistinct` and recurse with `dfs(nextDistinct, ...)`. This ensures we don't generate duplicate branches.
     - **Include choice**: Include `nums[idx]` in `currPath` and recurse to `idx + 1` with `dfs(idx + 1, ...)`, then backtrack by popping `nums[idx]`.
   - When `idx == nums.size()`, append `currPath` to `res`.

### Complexity
- **Time Complexity:** O(n * 2^n) — Sorting takes O(n log n) and generating subsets takes O(n * 2^n) time.
- **Space Complexity:** O(n) — Recursion call stack and `currPath` storage (excluding the result list).

---

## Code

```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    void dfs(int idx, vector<int>& nums, vector<int>& currPath, vector<vector<int>>& res) {
        int n = nums.size();

        if (idx == n) {
            res.push_back(currPath);
            return;
        }

        // In simple subset question we do:
        // 1. Skip 
        // 2. Include
        // In case of duplicates we just need to skip all duplicates as well
        // to prevent duplicate subsets
        int nextDistinct = idx + 1;
        while (nextDistinct < nums.size() && nums[nextDistinct] == nums[idx]) {
            nextDistinct++;
        }

        dfs(nextDistinct, nums, currPath, res);
        
        currPath.push_back(nums[idx]);
        dfs(idx + 1, nums, currPath, res);
        currPath.pop_back(); // Backtrack
    }

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> currPath;
        vector<vector<int>> res;

        dfs(0, nums, currPath, res);

        return res;
    }
};
```
