# Top K Frequent Elements

**Link:** https://leetcode.com/problems/top-k-frequent-elements

## Problem
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

## Solution
Count frequencies using a hash map. Use a min-heap of size k: for each unique element push (frequency, element) and pop if size exceeds k. The remaining k elements are the top-k frequent. Alternatively, use bucket sort where bucket index = frequency.

## Code
```cpp
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int x : nums) freq[x]++;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> minHeap;
    for (auto& [num, cnt] : freq) {
        minHeap.push({cnt, num});
        if (minHeap.size() > k) minHeap.pop();
    }
    vector<int> result;
    while (!minHeap.empty()) { result.push_back(minHeap.top().second); minHeap.pop(); }
    return result;
}
```
