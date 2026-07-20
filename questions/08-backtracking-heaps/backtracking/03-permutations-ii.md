# Permutations II

**Link:** https://leetcode.com/problems/permutations-ii/

## Problem
Given a collection of numbers that might contain duplicates, return all possible unique permutations in any order. Duplicate numbers must not produce duplicate permutation sequences in the result.

## Solution
Sort the array from the current index before iterating to group duplicates together. Skip an element if it equals the previous element at the same recursion level (`nums[i] == nums[i-1]` and `i != idx`), ensuring each distinct value is only placed at a given position once. Swap-based backtracking is used to build permutations in-place.

## Code
```cpp
void solve(int idx, vector<int> nums, vector<int>& currP, vector<vector<int>>& res) {
    if(idx >= nums.size()) {
        res.push_back(currP);
        return;
    }
    sort(nums.begin()+idx, nums.end());

    for(int i=idx; i<nums.size(); i++) {
        if(i == idx || nums[i] != nums[i-1]) {
            swap(nums[i], nums[idx]);
            currP.push_back(nums[idx]);

            solve(idx+1, nums, currP, res);

            swap(nums[i], nums[idx]);
            currP.pop_back();
        }
    }
}

vector<vector<int>> permuteUnique(vector<int>& nums) {
    sort(nums.begin(), nums.end());

    vector<int> currP;
    vector<vector<int>> res;

    solve(0, nums, currP, res);

    return res;
}
```
