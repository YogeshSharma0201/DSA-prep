# Evaluate Reverse Polish Notation

**Link:** https://leetcode.com/problems/evaluate-reverse-polish-notation/

## Problem
Given an array of strings tokens representing an arithmetic expression in Reverse Polish Notation, evaluate the expression and return the result as an integer. Valid operators are +, -, *, /. Division truncates toward zero.

## Solution
Use a stack of integers. Iterate through the tokens: if the token is a number (detected by length > 1 or being a digit), push its integer value. If it is an operator, pop the top two operands `x2` and `x1`, apply the corresponding operation on `x1` and `x2` (note the order of operations: `x1` was pushed first), and push the result back to the stack. Finally, return the top of the stack.

## Code
```cpp
int solve(vector<string> tokens) {
    stack<int> stn;
    for(auto s:tokens) {
        if(s.size()>1 || isdigit(s[0])) stn.push(stoi(s));
        else {
            auto x2=stn.top(); stn.pop();
            auto x1=stn.top(); stn.pop();
            switch(s[0]) {
                case '+': x1+=x2; break;
                case '-': x1-=x2; break;
                case '*': x1*=x2; break;
                case '/': x1/=x2; break;
            }
            stn.push(x1);
        }
    }
    return stn.top();
}
```

