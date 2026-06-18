# Compare Version Numbers

**Link:** https://leetcode.com/problems/compare-version-numbers

## Problem
Given two version strings `version1` and `version2`, compare them. Return 1 if version1 > version2, -1 if version1 < version2, and 0 if they are equal. Version strings are dot-separated non-negative integers.

## Solution
Split both version strings by dots and compare corresponding revision numbers as integers. If one version has more components, treat missing components as 0. Compare pair by pair until a difference is found or all components are exhausted.

## Code
```cpp
int compareVersion(string version1, string version2) {
    int i = 0, j = 0;
    while (i < version1.size() || j < version2.size()) {
        int v1 = 0, v2 = 0;
        while (i < version1.size() && version1[i] != '.') v1 = v1 * 10 + (version1[i++] - '0');
        while (j < version2.size() && version2[j] != '.') v2 = v2 * 10 + (version2[j++] - '0');
        if (v1 > v2) return 1;
        if (v1 < v2) return -1;
        i++; j++;
    }
    return 0;
}
```
