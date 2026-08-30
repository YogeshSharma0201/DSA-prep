# Permutation in String

**Link:** https://leetcode.com/problems/permutation-in-string/

## Problem

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

**Example 1:**
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

**Example 2:**
```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

**Constraints:**
- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Solution

This problem can be solved efficiently in O(N) time complexity using a **Sliding Window** with a frequency map representation (hash map or a 26-size array).

### Core Idea

1. **Frequency Maps:** Create a frequency map (`umap1`) of all character counts in `s1`.
2. **Sliding Window:** Iterate over `s2` using a sliding window. Use a second frequency map (`umap2`) to store character counts of the current window in `s2`.
3. **Window Expansion & Contraction:** 
   - Expand the window by adding `s2[i]` to `umap2`.
   - Once the window length equals `s1.size()` (i.e. `i - l + 1 == s1.size()`), check if the character frequencies in `umap2` match those in `umap1`. If they do, return `true`.
   - Before sliding the window forward, decrement the count of the character at the left pointer `s2[l]` from `umap2` and increment `l` to maintain the window size.
4. **Result:** If no matching window is found after checking the entire string `s2`, return `false`.

---

### Complexity Analysis
- **Time Complexity:** O(N) where $N$ is the length of `s2`. Comparing the two maps takes at most O(\Sigma) time where $\Sigma \le 26$ (the size of the English alphabet).
- **Space Complexity:** O(\Sigma) auxiliary space for the maps, which is O(1) since there are at most 26 unique lowercase English letters.

## Code

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        unordered_map<int,int> umap1, umap2;

        for(char c : s1) umap1[c]++;

        int l = 0;
        for(int i=0; i<s2.size(); i++) {
            umap2[s2[i]]++;

            if(i-l+1 == s1.size()) {
                bool flag= true;
                for(auto it : umap2) {
                    if(umap1[it.first] != it.second) {
                        flag = false;
                        break;
                    }
                }

                if(flag) return true;
                umap2[s2[l++]]--;
            }
        }

        return false;
    }
};
```
