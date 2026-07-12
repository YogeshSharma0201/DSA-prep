# Find the Most Competitive Subsequence

**Link:** https://leetcode.com/problems/find-the-most-competitive-subsequence/

## Problem
Given an integer array nums and a positive integer k, return the most competitive subsequence of nums of size k. A subsequence a is more competitive than b if at the first differing position, a has a smaller number. Essentially, find the lexicographically smallest subsequence of length k.

## Solution
Use a monotonic stack. Iterate through nums: while the stack is non-empty, the current element is smaller than the top, and there are enough remaining elements to still fill k slots after popping, pop the stack. Push the current element if the stack size is less than k. Return the stack.

## Code
```cpp
vector<int> mostCompetitive(vector<int>& A, int k) {
    vector<int> stack;
    for (int i = 0; i < A.size(); ++i) {
        while (!stack.empty() && stack.back() > A[i] && stack.size() - 1
                + A.size() - i >= k)
            stack.pop_back();
        if (stack.size() < k)
            stack.push_back(A[i]);
    }
    return stack;
}
```
