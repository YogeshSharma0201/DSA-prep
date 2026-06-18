# Assign Cookies

**Link:** https://leetcode.com/problems/assign-cookies/

## Problem
Each child has a greed factor g[i] (minimum cookie size they'll accept). Each cookie has a size s[j]. Assign at most one cookie to each child to maximize the number of content children. A child is content if s[j] >= g[i].

## Solution
Greedy: sort both arrays. Use two pointers — match the smallest available cookie that satisfies the least greedy remaining child. If the current cookie satisfies the current child, move both pointers; otherwise try the next larger cookie.

## Code
```cpp
int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int child = 0, cookie = 0;
    while (child < (int)g.size() && cookie < (int)s.size()) {
        if (s[cookie] >= g[child]) child++;
        cookie++;
    }
    return child;
}
```
