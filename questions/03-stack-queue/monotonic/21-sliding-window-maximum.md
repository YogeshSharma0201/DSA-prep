# Sliding Window Maximum

**Link:** https://leetcode.com/problems/sliding-window-maximum

## Problem
Given an array `nums` and a sliding window of size `k`, return an array of the maximum values in each position of the sliding window as it moves from left to right.

## Solution
Use a monotonic deque (double-ended queue) storing indices. Maintain the deque so that elements are decreasing. Remove elements outside the window from the front. Remove smaller elements from the back before adding a new element. The front always holds the index of the current window's maximum.

## Code
```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}
```
