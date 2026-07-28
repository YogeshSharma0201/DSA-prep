# Minimum Cost to Cut a Stick

**Link:** https://leetcode.com/problems/minimum-cost-to-cut-a-stick/

## Problem
Given a wooden stick of length `n`, and an array `cuts` where `cuts[i]` denotes a position you must perform a cut at. The cost of a cut is the length of the stick segment being cut. Determine the minimum total cost to make all cuts.

## Solution 1: Top-down Memoization (Recursion + DP)
1. **Preprocessing:** Sort the `cuts` array and pad it by inserting `0` at the beginning and `n` at the end. This represents the boundaries of all segments.
2. **DP Definition:** Let `solve(l, r)` be the minimum cost to perform all cuts between index `l` and index `r` in the padded `cuts` array.
3. **Transitions:** To compute `solve(l, r)`:
   - If `l + 1 == r`, there are no cut positions between them, so return `0`.
   - Otherwise, iterate through all possible first cut positions `i` from `l + 1` to `r - 1`. The cost will be the length of the current segment `cuts[r] - cuts[l]` plus the cost of cutting the left subsegment `solve(l, i)` and the right subsegment `solve(i, r)`.
   - Take the minimum over all possible choices of `i` and memoize it.

### Code
```cpp
class Solution {
public:
    int solve(int l, int r, vector<int>& cuts, vector<vector<int>>& dp) {
        int stickLen = cuts[r]-cuts[l];
        if(l+1 == r) return 0;

        if(dp[l][r] != -1) return dp[l][r];

        int cost = INT_MAX>>1;

        for(int i=l+1; i<=r-1; i++) {
            cost = min(cost, stickLen + solve(l,i,cuts,dp) + solve(i,r,cuts,dp));    
        }

        return dp[l][r] = cost;
    }

    int minCost(int n, vector<int>& cuts) {
        sort(cuts.begin(), cuts.end());
        cuts.push_back(n);
        cuts.insert(cuts.begin(),0);

        vector<vector<int>> dp(cuts.size(), vector<int>(cuts.size(), -1));

        return solve(0,cuts.size()-1,cuts,dp);
    }
};
```

## Solution 2: Bottom-up Iterative DP
We can solve it iteratively by solving for subproblems of increasing length (represented by variable `i` from `1` to `cuts.size() - 1`). For each starting index `j`, we calculate the minimum cost to cut the segment between index `j` and `j + i`.

### Code
```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        sort(cuts.begin(), cuts.end());
        cuts.push_back(n);
        cuts.insert(cuts.begin(),0);

        vector<vector<int>> dp(cuts.size(), vector<int>(cuts.size(), INT_MAX>>2));

        for(int i=1; i<cuts.size(); i++) {
            for(int j=0; j+i<cuts.size(); j++) {

                int stickLen = cuts[j+i] - cuts[j];
                if(i==1) {
                    dp[j][j+i] = 0;
                }
                else {
                    // Notice how we go from j+1 to j+i-1
                    // hence processing only within the boundary of the cuts
                    // This tricks helps us get the sticklen to cut
                    for(int k=j+1; k<j+i; k++) {
                        dp[j][j+i] = min(dp[j][j+i], stickLen + dp[j][k] + dp[k][j+i]);
                    }
                }
            }
        }

        return dp[0][cuts.size()-1];
    }
};
```

