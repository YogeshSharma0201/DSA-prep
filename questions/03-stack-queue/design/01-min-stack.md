# Min Stack

**Link:** https://leetcode.com/problems/min-stack/

## Problem
Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time. The stack must support all standard operations and getMin() must always return the current minimum element in constant time.

## Solution
Store pairs of (value, currentMin) in the stack. On push, compute the new minimum as min(val, currentMin of previous top). This way every entry in the stack carries the minimum at that point in history. Pop and top simply access the back of the vector. getMin reads the second element of the back pair.

## Code
```cpp
class MinStack {
    vector<vector<int>> st;
public:
    MinStack() {}

    void push(int val) {
        int min_val = getMin();
        if (st.empty() || min_val > val) {
            min_val = val;
        }
        st.push_back({val, min_val});
    }

    void pop() {
        st.pop_back();
    }

    int top() {
        return st.empty() ? -1 : st.back()[0];
    }

    int getMin() {
        return st.empty() ? -1 : st.back()[1];
    }
};
```
