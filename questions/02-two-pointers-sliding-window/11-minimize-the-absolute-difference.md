# Minimize the Absolute Difference

**Link:** https://www.interviewbit.com/problems/minimize-the-absolute-difference

## Problem
Given three sorted arrays $A$, $B$, and $C$ of sizes $N$, $M$, and $L$ respectively.

Find $i, j, k$ such that $\max(|A[i] - B[j]|, |B[j] - C[k]|, |C[k] - A[i]|)$ is minimized.
Return the minimum absolute difference.

**Example:**
- **Input:**
  - $A = [1, 4, 10]$
  - $B = [2, 15, 20]$
  - $C = [10, 12]$
- **Output:** `8`
- **Explanation:** 
  - For $i=1$ ($A[1]=4$), $j=0$ ($B[0]=2$), and $k=0$ ($C[0]=10$), the differences are $|4-2|=2$, $|2-10|=8$, and $|10-4|=6$. The maximum difference is $\max(2, 8, 6) = 8$. This is the minimum possible difference.

## Solution
Since all three arrays are sorted, we can use a three-pointer approach:
1. Initialize three pointers $i = 0$, $j = 0$, and $k = 0$.
2. Calculate the difference for the current triplet: $\max(A[i], B[j], C[k]) - \min(A[i], B[j], C[k])$.
3. Update the global minimum difference.
4. To reduce the maximum difference, we need to increase the smallest value among $A[i]$, $B[j]$, and $C[k]$. Therefore, we increment the pointer corresponding to the minimum value.
5. If the pointer corresponding to the minimum value is already at the last element of its array, we cannot increase it further. Any other move (incrementing a pointer for a non-minimum element) would only increase or maintain the current minimum value while potentially increasing the maximum value, which cannot decrease the overall difference. Thus, we can terminate the loop.

## Code
```cpp
int Solution::solve(vector<int> &A, vector<int> &B, vector<int> &C) {
    int i = 0, j = 0, k = 0;

    int n = A.size(),
        m = B.size(),
        l = C.size();

    int ans = max(A[i], max(B[j], C[k])) - min(A[i], min(B[j], C[k]));
    while(i < n && j < m && k < l) {

        ans = min(ans, max(A[i], max(B[j], C[k])) - min(A[i], min(B[j], C[k])));

        int minn = min(A[i], min(B[j], C[k]));

        if(A[i] == minn && i < n - 1) {
            i++;
        } else if(B[j] == minn && j < m - 1) {
            j++;
        } else if (C[k] == minn && k < l - 1){
            k++;
        } else {
            break;
        }

    }

    return ans;
}
```
