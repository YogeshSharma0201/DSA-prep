# Partition Labels

**Link:** https://leetcode.com/problems/partition-labels/

## Problem
You are given a string s. Partition it into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of each part.

## Solution
Greedy: record the last occurrence index of each character. Scan left to right, tracking the farthest right boundary we must include (end = max of last[s[i]] seen so far). When i reaches end, we have a complete partition — record its size and start a new partition.

## Code
```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        int n = s.size();
        vector<int> rM(26, -1);

        for(int i=s.size()-1; i>=0; i--) {
            if(rM[s[i]-'a'] == -1) rM[s[i]-'a'] = i;
        }

        int maxRight = -1;
        int lastidx = 0;
        vector<int> res;

        for(int i=0;i<n;i++) {
            maxRight = max(maxRight, rM[s[i]-'a']);
            if(maxRight <= i) {
                res.push_back(i+1 - lastidx);
                lastidx = i+1;
                maxRight = -1;
            }
        }

        return res;
    }
};
```
