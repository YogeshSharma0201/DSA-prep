# Minimum Cost to Merge Stones

**Link:** https://leetcode.com/problems/minimum-cost-to-merge-stones/

## Problem
There are `n` piles of stones arranged in a row, where `stones[i]` is the number of stones in the `i`-th pile. In each move, you merge exactly `k` consecutive piles into one pile, and the cost of this move is the total number of stones in these `k` piles. Return the minimum cost to merge all piles into one pile. If it is impossible, return `-1`.

## Solution
Use 3D DP where `dp[i][j][piles]` is the minimum cost to merge subarray `stones[i..j]` into `piles` piles. For `piles == 1`, compute `dp[i][j][1] = dp[i][j][k] + sum(i..j)`. For `piles > 1`, split at every `t` and combine `dp[i][t][1] + dp[t+1][j][piles-1]`. A merge is possible iff `(n-1) % (k-1) == 0`.

## Code
```cpp
class Solution {
public:
    int dp[50][50][50];
    int minCost(int i,int j,int piles,vector<int>&prefixsum,int &K){
        
        if( i == j && piles == 1)
            return 0;
        
        if(i == j)
            return INT_MAX/4;
        
        if(dp[i][j][piles]!=-1)
            return dp[i][j][piles];
        
        if(piles == 1){
            return dp[i][j][piles] = minCost(i,j,K,prefixsum,K) + (i==0 ? prefixsum[j] : prefixsum[j]-prefixsum[i-1]);
        
        } else {
            
            int cost = INT_MAX/4;
            for(int t=i;t<j;t++){
                cost = min(cost, minCost(i,t,1,prefixsum,K) + minCost(t+1,j,piles-1,prefixsum,K));                
            }
            return dp[i][j][piles] = cost;
        }
    }
    
    int mergeStones(vector<int>& stones, int k) {        
        int n = stones.size();
        
        if((n-1)%(k-1)!=0)
            return -1;
        int sum = 0;
        vector<int>prefixsum;
        
        for(int i=0;i<stones.size();i++){
            sum+=stones[i];
            prefixsum.push_back(sum);
        }
        
        memset(dp,-1,sizeof(dp));
        
        return minCost(0,n-1,1,prefixsum,k);
    }
};
```
