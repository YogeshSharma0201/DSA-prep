# Remove K Digits

**Link:** https://leetcode.com/problems/remove-k-digits/

## Problem
Given string num representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.

## Solution

### Approach: Monotonic Next-Smaller Element Jump
This approach uses a monotonic stack to precompute the index of the next strictly smaller element for each position (`nextMinIdx`). 
With this information, we greedily iterate through the number:
1. At index `i`, we check if the distance to the next smaller digit `nextMinIdx[i] - i` is within our budget `k`.
2. If it is within `k`, it is always optimal to skip/delete the intermediate larger digits and jump directly to that smaller digit. We decrement `k` by the number of skipped digits and update our index.
3. If it exceeds `k`, we cannot afford to jump to the smaller digit, so we must keep the current digit `num[i]` and proceed to `i + 1`.
4. Finally, remove any leading zeros from the resulting string.

*(Note: The standard alternative is to build a monotonic increasing stack directly by popping elements when `stack.top() > num[i]` and `k > 0` during a single left-to-right pass.)*

## Code
```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string res = "";

        int n = num.size();
        vector<int> nextMinIdx(n, -1);

        stack<int> st;
        st.push(n-1);
        nextMinIdx[n-1] = n;
        for(int i=n-2; i>=0; i--) {
            while(!st.empty() && num[st.top()] >= num[i]) st.pop();

            nextMinIdx[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        // Replace current index char with a smaller number if 
        // limit k allows
        for(int i=0; i<n; i++) {
            if(nextMinIdx[i]-i <= k) {
                k -= nextMinIdx[i]-i;
                i = nextMinIdx[i]-1;
            }
            else {
                res += num[i];
            }
        }

        // Remove zeros from begining
        int zeroIdx = -1;
        for(int i=0; i<res.size(); i++) {
            if(res[i]=='0') zeroIdx = i;
            else break;
        }

        res = zeroIdx == -1 ? res : res.substr(zeroIdx+1);
        return res == "" ? "0" : res;
    }
};
```
