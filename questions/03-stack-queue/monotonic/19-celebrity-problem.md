# The Celebrity Problem

**Link:** https://www.geeksforgeeks.org/problems/the-celebrity-problem/1

## Problem
In a party of N people, a celebrity is someone who is known by everyone but knows nobody. Given a matrix `know[i][j]` (1 if i knows j), find the celebrity or return -1 if none exists.

## Solution
Use a two-pointer / elimination approach. Start with candidates 0 and n-1. If candidate A knows B, A cannot be the celebrity so move A forward. Otherwise B cannot be the celebrity so move B backward. Verify the final candidate by checking all knows relationships.

## Code
```cpp
int celebrity(vector<vector<int>>& know) {
    int n = know.size(), a = 0, b = n - 1;
    while (a < b) {
        if (know[a][b]) a++;
        else b--;
    }
    int candidate = a;
    for (int i = 0; i < n; i++) {
        if (i != candidate && (know[candidate][i] || !know[i][candidate]))
            return -1;
    }
    return candidate;
}
```
