# Super Egg Drop

**Link:** https://leetcode.com/problems/super-egg-drop/

## Problem
You are given `k` identical eggs and you have access to a building with `n` floors labeled from `1` to `n`.

You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor higher than `f` will break, and any egg dropped at or below floor `f` will not break.

Each move, you may take an unbroken egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with certainty what the value of `f` is.

## Solution
This is a classic Dynamic Programming problem with an optimization using Binary Search.

### Recurrence Relation
Let `dp(k, n)` be the minimum number of moves to find the critical floor with `k` eggs and `n` floors. If we drop an egg from floor `x` (where $1 \le x \le n$):
1. **The egg breaks**: We have `k - 1` eggs and must search the remaining `x - 1` floors below. The subproblem is `dp(k - 1, x - 1)`.
2. **The egg survives**: We still have `k` eggs and must search the remaining `n - x` floors above. The subproblem is `dp(k, n - x)`.

In the worst-case scenario, the number of moves needed is $1 + \max(\text{dp}(k - 1, x - 1), \text{dp}(k, n - x))$.
To find the optimal floor $x$ to drop from, we want to minimize this worst-case cost:
$$\text{dp}(k, n) = 1 + \min_{1 \le x \le n} \left( \max(\text{dp}(k - 1, x - 1), \text{dp}(k, n - x)) \right)$$

### Binary Search Optimization
A naive linear search over all $x \in [1, n]$ takes O(n) time per state, leading to O(k * n^2) total time, which is too slow for $n \le 10^4$.
However, as $x$ increases:
- $T_1(x) = \text{dp}(k - 1, x - 1)$ is a monotonically increasing function of $x$.
- $T_2(x) = \text{dp}(k, n - x)$ is a monotonically decreasing function of $x$.

The maximum of an increasing function and a decreasing function is minimized near their intersection point. We can use **binary search** to find this intersection in O(log n) time.
- If $T_1(mid) < T_2(mid)$, we need to check higher floors to find the intersection, so we move the left bound: `l = mid + 1`.
- Otherwise, we check lower floors: `h = mid - 1`.

### Complexity
- **Time Complexity:** O(k * n log n) since we have $k \times n$ states and we spend O(log n) time per state.
- **Space Complexity:** O(k * n) for the memoization table.

## Code
```cpp
class Solution {
public:
    // Initial thought was that optimal solution would be to choose
    // the middle floor of the section always like a binary search
    // but that is not optimal here, hence DP and binary searching is required
    int find(int k,int n,vector<vector<int>> &memo)
    {   if(n==0||n==1) return n;  //if no. of floor 0 , 1 return n:
        if(k==1) return n;        // if 1 egg return number of floor   
        if(memo[k][n]!=-1) return memo[k][n];
        int ans=1000000,l=1,h=n,temp=0;
     
        while(l<=h)
        {
            int mid=(l+h)/2;
            int left=find(k-1,mid-1,memo);   //egg broken check for down floors of mid
            int right=find(k,n-mid,memo) ;   // not broken check for up floors of mid
            temp=1+max(left,right);          //store max of both 
            if(left<right){                  //since right is more than left and we need more in worst case 
              l=mid+1;                       // so l=mid+1 to gain more temp for worst case : upward
            }
            else                             //left > right so we will go downward 
            {    
                h=mid-1;
            }
            ans=min(ans,temp);               //store minimum attempts
        }
        
     /*
        Here we have k eggs and n floor
        if we drop from i  (i=1 to n):
         i) egg break , now we remain k-1 eggs and i-1 floor beacase after i floor all the eggs will also break
        ii) egg not break , now we remain k eggs and n-i floor because before i (included) all eggs will be remain
      */
        return memo[k][n]=ans;
     
    }
    int superEggDrop(int K, int N) {
        //K -> egg , N -> floor
        vector<vector<int>> memo(K+1,vector<int> (N+1,-1));
        return find(K,N,memo);
         
    }
};
```
