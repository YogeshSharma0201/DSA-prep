# Largest Number

**Link:** https://leetcode.com/problems/largest-number/

## Problem
Given a list of non-negative integers, arrange them such that they form the largest possible number. Return the result as a string (since the result may be very large).

## Solution
Greedy comparator: for two numbers a and b, compare the strings `str(a)+str(b)` vs `str(b)+str(a)`. Sort in descending order using this comparator. Concatenate all numbers. Handle edge case where all numbers are 0 (result should be "0").

## Code
```cpp
string largestNumber(vector<int>& nums) {
    vector<string> strs;
    for (int n : nums) strs.push_back(to_string(n));
    sort(strs.begin(), strs.end(), [](const string& a, const string& b) {
        return a + b > b + a;
    });
    if (strs[0] == "0") return "0";
    string res;
    for (auto& s : strs) res += s;
    return res;
}
```
