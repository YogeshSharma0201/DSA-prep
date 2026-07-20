# Basic Calculator

**Link:** https://leetcode.com/problems/basic-calculator

## Problem
Given a string s representing a valid mathematical expression containing non-negative integers, '+', '-', '(', ')', and spaces, implement a basic calculator to evaluate and return the result. No multiplication or division is present.

## Solution
Iterate through the string maintaining a running sum and a sign (+1 or -1). On a digit, build the full number and add it to sum multiplied by current sign. On '(' push the current (sum, sign) pair to the stack and reset sum to 0 and sign to 1. On ')' restore by: sum = stack.top().first + stack.top().second * sum. On '-' multiply sign by -1.

## Code
```cpp
int calculate(string s) {
    long long int sum = 0;
    int sign = 1;
    stack<pair<int, int>> st;

    for (int i = 0; i < s.size(); i++) {
        if (isdigit(s[i])) {
            long long int num = 0;
            while (i < s.size() && isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
                i++;
            }
            i--;
            sum += num * sign;
            sign = 1;
        } else if (s[i] == '(') {
            st.push({sum, sign});
            sum = 0;
            sign = 1;
        } else if (s[i] == ')') {
            sum = st.top().first + (st.top().second * sum);
            st.pop();
        } else if (s[i] == '-') {
            sign = -1 * sign;
        }
    }
    return sum;
}
```
