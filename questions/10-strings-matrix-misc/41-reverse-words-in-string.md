# Reverse Words in a String

**Link:** https://leetcode.com/problems/reverse-words-in-a-string

## Problem
Given an input string `s`, reverse the order of the words. A word is a sequence of non-space characters. The output should not have leading/trailing spaces, and words should be separated by a single space.

## Solution
Split the string by spaces to extract words, skipping empty tokens. Then join the words in reverse order. Alternatively, reverse the whole string then reverse each individual word in place.

## Code
```cpp
string reverseWords(string s) {
    vector<string> words;
    stringstream ss(s);
    string word;
    while (ss >> word) words.push_back(word);
    string result;
    for (int i = words.size() - 1; i >= 0; i--) {
        if (!result.empty()) result += " ";
        result += words[i];
    }
    return result;
}
```
