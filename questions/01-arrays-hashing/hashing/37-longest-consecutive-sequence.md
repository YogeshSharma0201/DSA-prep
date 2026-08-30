# Longest Consecutive Sequence

**Link:** https://leetcode.com/problems/longest-consecutive-sequence/

## Problem

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

## Solution

### Core Idea

To achieve O(n) time, we can use a hash set to store all the numbers. This allows O(1) lookups.

To avoid redundant checks and avoid timeouts:
1. We populate a hash set with all numbers from the array to eliminate duplicates and enable O(1) lookups.
2. We iterate over the unique numbers in the set.
3. For each number `num`, we check if it is the **start of a sequence**. We can do this by checking if `num - 1` is in the set.
   - If `num - 1` is present, `num` is *not* the start of a sequence, so we skip it.
   - If `num - 1` is not present, `num` is the start of a sequence. We then increment `num` and count how many consecutive elements (`num + 1`, `num + 2`, ...) exist in the set.
4. We update the maximum length `maxs` with the length of the current sequence.

By only starting sequences from numbers that do not have a predecessor in the set, each element in the set is visited at most twice (once in the outer loop, and at most once in the inner `while` loop). This keeps the overall time complexity linear.

**Time Complexity:** O(N) — Each number is processed at most a constant number of times.  
**Space Complexity:** O(N) — To store the unique elements in the hash set.

## Code

### Approach 1: Hash Set (Sequence Start Check) — O(n) time, O(n) space

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int n = nums.size();
        unordered_set<int> set;
        vector<int> dp(n, -1);

        // Using set for duplicates
        for(int i=0; i<n; i++) {
            set.insert(nums[i]);
        }

        int maxs = 0;
        // Iterate from set to prevent checking duplicates
        // which can cause timeout
        for(auto it : set) {
            if(!set.count(it-1)) {
                int num = it, cnt = 1;
                while(set.count(num+1)) {
                    num++;
                    cnt++;
                }
                maxs = max(maxs, cnt);
            }
        }

        return maxs;
    }
};
```
