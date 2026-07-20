# Partition Labels

**Link:** https://leetcode.com/problems/partition-labels/

## Problem
You are given a string s. Partition it into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of each part.

## Solution
Greedy: record the last occurrence index of each character. Scan left to right, tracking the farthest right boundary we must include (end = max of last[s[i]] seen so far). When i reaches end, we have a complete partition — record its size and start a new partition.

## Code
```cpp
vector<int> partitionLabels(string s) {
    int last[26] = {};
    for (int i = 0; i < (int)s.size(); i++) last[s[i]-'a'] = i;

    vector<int> res;
    int start = 0, end = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        end = max(end, last[s[i]-'a']);
        if (i == end) {
            res.push_back(end - start + 1);
            start = i + 1;
        }
    }
    return res;
}
```
