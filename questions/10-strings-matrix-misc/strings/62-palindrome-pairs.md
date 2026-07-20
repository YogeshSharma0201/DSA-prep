# Palindrome Pairs

**Link:** https://leetcode.com/problems/palindrome-pairs/

## Problem

You are given a 0-indexed array of unique strings `words`.

A **palindrome pair** is a pair of integers `(i, j)` such that:
- `0 <= i, j < words.length`,
- `i != j`, and
- `words[i] + words[j]` (the concatenation of the two strings) is a palindrome.

Return *an array of all the palindrome pairs of words*.

You must write an algorithm with a time complexity of $O(\text{sum of lengths of all words})$. Note that while the hash map solution is slightly higher in worst-case time complexity, it passes the test cases efficiently.

## Solution

### Core Idea

A naive check of all pairs would take $O(N^2 \cdot K)$ where $N$ is the number of words and $K$ is the average length of a word. This is too slow.

To optimize, we can use a hash map to look up matching strings in $O(1)$ average time:
1. Store all reversed words in a hash map `umap` where the key is the reversed word and the value is its original index.
2. For each word `words[i]`, we try splitting it at every possible index `j` (from `0` to `words[i].length()`) into two parts: `left` and `right`.
3. There are two cases where the concatenation can form a palindrome:
   - **Case 1:** If the `right` part of `words[i]` is a palindrome, and the reversed prefix `left` exists in our map (which means `left`'s reverse is in the original list), we can form a palindrome by appending `reversed(left)` to the end. The original word is `words[i]` and the matching word is `umap[left]`. Thus, `(i, umap[left])` forms a valid palindrome pair `words[i] + words[umap[left]]`.
   - **Case 2:** If the `left` part of `words[i]` is a palindrome, and the reversed suffix `right` exists in our map, we can form a palindrome by prepending `reversed(right)` to the beginning. The matching word is `umap[right]` and the original word is `words[i]`. Thus, `(umap[right], i)` forms a valid palindrome pair `words[umap[right]] + words[i]`.
4. We insert the pairs into a `set<vector<int>>` to handle deduplication (since when `j = 0` or `j = words[i].length()`, both `left` and `right` can be empty and create duplicate checks).
5. Finally, we convert the set into the final result vector.

**Time Complexity:** $O(N \cdot K^2)$ where $N$ is the number of words and $K$ is the maximum/average length of a word. We loop $N$ times, and for each word, we do $K$ substring/reversal/lookup operations of size up to $K$.  
**Space Complexity:** $O(N \cdot K)$ to store the reversed words in the hash map.

## Code

### Approach 1: Word Splitting + Hash Map of Reversed Words — O(N * K^2) time, O(N * K) space

```cpp
class Solution {
public:
    vector<vector<int>> palindromePairs(vector<string>& words) {
        unordered_map<string,int> umap;
        int n = words.size();

        for(int i=0; i<n; i++) {
            string word = words[i];
            reverse(word.begin(), word.end());
            umap[word] = i;
        }

        set<vector<int>> pairs;

        for(int i=0; i<n; i++) {
            for(int j=0; j<=words[i].size(); j++) {
                string left = words[i].substr(0, j);
                string right = words[i].substr(j, words[i].size()-j);

                if(umap.count(left) && isPal(right) && umap[left] != i) {
                    pairs.insert({i, umap[left]});
                }
                if(umap.count(right) && isPal(left) && umap[right] != i) {
                    pairs.insert({umap[right], i});
                }
            }
        }

        vector<vector<int>> res;

        for(vector<int> pair : pairs) {
            res.push_back(pair);
        }

        return res;
    }

    bool isPal(string& word) {
        int n = word.size();

        int l = 0, r = word.size()-1;

        while(l<r) {
            if(word[l] != word[r]) return false;
            l++; r--;
        }
        return true;
    }
};
```
