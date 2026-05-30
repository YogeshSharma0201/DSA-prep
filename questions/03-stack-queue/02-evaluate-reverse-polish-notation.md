# Evaluate Reverse Polish Notation

**Link:** https://leetcode.com/problems/evaluate-reverse-polish-notation/

## Problem
Given an array of strings tokens representing an arithmetic expression in Reverse Polish Notation, evaluate the expression and return the result as an integer. Valid operators are +, -, *, /. Division truncates toward zero.

## Solution
Use a stack of strings. Iterate through tokens: if the token is a number (or negative number — detected by length > 1), push it. If it is an operator, pop two operands, apply the operation (note: secondOp is the one pushed first, so subtraction/division must use secondOp as the left operand), then push the string result back.

## Code
```cpp
int evalRPN(vector<string>& tokens) {
    stack<string> st;
    for (int i = 0; i < tokens.size(); i++) {
        char ch = tokens[i][0];
        if (tokens[i].size() > 1) ch = '0'; // negative number, not operator
        int firstOp, secondOp, result = 0;
        switch (ch) {
            case '+':
            case '-':
            case '/':
            case '*':
                firstOp  = stoi(st.top()); st.pop();
                secondOp = stoi(st.top()); st.pop();
                switch (ch) {
                    case '+': result = firstOp + secondOp; break;
                    case '-': result = secondOp - firstOp; break;
                    case '/': result = secondOp / firstOp; break;
                    case '*': result = firstOp * secondOp; break;
                }
                st.push(to_string(result));
                break;
            default:
                st.push(tokens[i]);
        }
    }
    return stoi(st.top());
}
```
