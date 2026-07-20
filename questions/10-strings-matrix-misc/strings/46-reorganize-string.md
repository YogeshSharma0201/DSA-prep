# Reorganize String

**Link:** https://leetcode.com/problems/reorganize-string/

## Problem
Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement, or return an empty string if not possible. If the maximum character frequency exceeds (n+1)/2, it is impossible.

## Solution
Use a max-heap (priority queue) of (frequency, char) pairs. At each step, pop the most frequent character. If it would create a duplicate adjacent to the last placed character, instead pop the second most frequent, place it, re-insert the first, and continue. If no second choice exists, return empty.

## Code
```cpp
class Solution {
public:
    string reorganizeString(string s) {
        int n = s.size();

        unordered_map<char, int> mp;
        for(int i = 0; i < n; i++){
            mp[s[i]]++;
        }

        priority_queue<pair<int, char>> pq;
        for(auto [key, val] : mp){
            pq.push({val, key});
        }

        string ans;
        for(int i = 0; i < n; i++) {
            auto [mx, val] = pq.top();
            pq.pop();

            if(i > 0 && ans.back() == val){
                if(pq.empty()) return "";

                auto [mx2, val2] = pq.top();
                pq.pop();

                ans += val2;

                if(mx2 > 1)
                    pq.push({mx2 - 1, val2});

                pq.push({mx, val});
            }
            else{
                ans += val;

                if(mx > 1)
                    pq.push({mx - 1, val});
            }
        }

        return ans;
    }
};
```
