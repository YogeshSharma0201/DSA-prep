# Concatenated Words

**Link:** https://leetcode.com/problems/concatenated-words/

## Problem
Given an array of strings, find all words that can be formed by concatenating at least two other words from the array. A word cannot be formed by concatenating with itself. Return all such concatenated words.

## Solution
Build an unordered_set of all words. For each word, run a Word Break DP to check if it can be fully formed using other words from the set. To enforce "at least 2 words", track the number of words used or temporarily remove the candidate word from the set before checking. Collect all words that pass the DP check.

## Code
```cpp
bool canForm(const string& word, unordered_set<string>& wordSet) {
    if (wordSet.empty()) return false;
    int n = word.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(word.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}

vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
    unordered_set<string> wordSet(words.begin(), words.end());
    vector<string> result;
    for (const string& word : words) {
        wordSet.erase(word);
        if (canForm(word, wordSet))
            result.push_back(word);
        wordSet.insert(word);
    }
    return result;
}
```
