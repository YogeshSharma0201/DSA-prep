# Remove All Adjacent Duplicates In String II

**Link:** https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii

## Problem
Given a string `s` and an integer `k`, repeatedly remove `k` adjacent equal characters until no such run remains. Return the final string.

## Solution

### Approach 1: In-place stack with run-length counter
Same in-place stack simulation as removing adjacent duplicates, extended with a parallel `count` array tracking the run length of the character currently at each stack position. `i` is the stack top, `j` scans the input. `count[i]` is `count[i-1] + 1` if it continues the same run as the new top, else `1`. When a run hits exactly `k`, pop the whole run by dropping `i` by `k`. The answer is the prefix `s[0..i)`.

### Approach 2: Explicit stack of (count, char) pairs
Push a sentinel `{0, '#'}` so `stack.top()` is always valid. For each character `c`: if it differs from the top's character, push a new pair `{1, c}`; otherwise increment the top's count, and if it reaches `k`, pop the whole run. At the end, rebuild the string by repeatedly appending `count` copies of each stack entry's character (bottom to top), then reverse since the stack is popped top to bottom.

## Code
```cpp
// Approach 1: in-place with count array
class Solution {
public:
    string removeDuplicates(string s, int k) {
        int i = 0, n = s.length();
        vector<int> count(n);
        for (int j = 0; j < n; ++j, ++i) {
            s[i] = s[j];
            count[i] = i > 0 && s[i - 1] == s[j] ? count[i - 1] + 1 : 1;
            if (count[i] == k) i -= k;
        }
        return s.substr(0, i);
    }
};
```

```cpp
// Approach 2: explicit stack of (count, char)
class Solution {
public:
    string removeDuplicates(string s, int k) {
        stack<pair<int, char>> stack;
        stack.push({0, '#'});

        for (char c: s) {
            if (stack.top().second != c) {
                stack.push({1, c});
            } else if (++stack.top().first == k)
                stack.pop();
        }
        string res;
        while (!stack.empty()) {
            auto &p = stack.top(); stack.pop();
            res.append(p.first, p.second);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```
