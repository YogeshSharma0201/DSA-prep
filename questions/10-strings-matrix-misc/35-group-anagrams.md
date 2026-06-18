# Group Anagrams

**Link:** https://leetcode.com/problems/group-anagrams

## Problem
Given an array of strings `strs`, group the anagrams together. An anagram is a word formed by rearranging the letters of another word. Return the groups in any order.

## Solution
For each string, sort its characters to get a canonical key. Use a hash map from sorted string to list of original strings. Group all strings with the same key. Return the values of the map.

## Code
```cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (auto& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [key, group] : mp)
        result.push_back(group);
    return result;
}
```
