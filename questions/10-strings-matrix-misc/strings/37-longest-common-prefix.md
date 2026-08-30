# Longest Common Prefix

**Link:** https://leetcode.com/problems/longest-common-prefix

## Problem
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

## Solution

### Approach 1: Horizontal Scanning (Shrinking Prefix)
Take the first string as the initial prefix. For each subsequent string, shrink the prefix from the right until it matches the beginning of that string. Return what remains.

> [!NOTE]
> The C++ `std::string::find` method searches a string for the first occurrence of a specified substring or character and returns its zero-based starting index. If the element is not found, the method returns the special constant `std::string::npos`.

- **Time Complexity:** O(S) where $S$ is the sum of all characters in all strings.
- **Space Complexity:** O(1) constant extra space.

### Approach 2: Sorting (Lexicographical Comparison)
By sorting the array of strings lexicographically, the first and last strings in the sorted list will be the most different. Thus, any common prefix shared by all strings must also be shared by the first and last strings. We can simply compare the first and last strings of the sorted array to find the longest common prefix.

- **Time Complexity:** O(N * M log N) where $N$ is the number of strings and $M$ is the maximum length of a string (due to sorting $N$ strings of length $M$).
- **Space Complexity:** O(1) constant extra space.

## Code

### Approach 1: Horizontal Scanning
```cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0)
            prefix = prefix.substr(0, prefix.size() - 1);
        if (prefix.empty()) return "";
    }
    return prefix;
}
```

### Approach 2: Sorting (Lexicographical Comparison)
```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& v) {
        string ans="";
        sort(v.begin(),v.end());
        int n=v.size();
        string first=v[0],last=v[n-1];
        for(int i=0;i<min(first.size(),last.size());i++){
            if(first[i]!=last[i]){
                return ans;
            }
            ans+=first[i];
        }
        return ans;
    }
};
```
