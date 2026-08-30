# Group Anagrams

**Link:** https://leetcode.com/problems/group-anagrams

## Problem
Given an array of strings `strs`, group the anagrams together. An anagram is a word formed by rearranging the letters of another word. Return the groups in any order.

## Solution

### Approach 1: Standard Sorting
For each string, sort its characters to get a canonical key. Use a hash map from sorted string to list of original strings. Group all strings with the same key. Return the values of the map.
- **Time Complexity:** O(N * K log K) where $N$ is the number of strings and $K$ is the maximum length of a string.
- **Space Complexity:** O(N * K) to store the groups in the hash map.

### Approach 2: Counting Sort
Instead of using standard sorting which takes O(K log K) per string, we can use counting sort (frequency map of 26 characters) since strings only contain lowercase English letters. This reduces sorting to O(K) per string.
- **Time Complexity:** O(N * K) where $N$ is the number of strings and $K$ is the maximum length of a string.
- **Space Complexity:** O(N * K)

## Code

### Approach 1: Standard Sorting
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

### Approach 2: Counting Sort
```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string s : strs) {
            mp[strSort(s)].push_back(s);
        }
        vector<vector<string>> anagrams;
        for (auto p : mp) { 
            anagrams.push_back(p.second);
        }
        return anagrams;
    }
private:
    string strSort(string s) {
        int counter[26] = {0};
        for (char c : s) {
            counter[c - 'a']++;
        }
        string t;
        for (int c = 0; c < 26; c++) {
            t += string(counter[c], c + 'a');
        }
        return t;
    }
};
```
