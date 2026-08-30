# Min Stack

**Link:** https://leetcode.com/problems/min-stack/

## Problem
Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time. The stack must support all standard operations and getMin() must always return the current minimum element in constant time.

## Solution 1: Pair / Two-value Approach (Extra Space O(N))
Store pairs of `(value, currentMin)` in the stack. On push, compute the new minimum as `min(val, currentMin of previous top)`. This way, every entry in the stack carries the minimum at that point in history.

### Code
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

## Solution 2: Mathematical Encoding (Space-Optimized O(1))
Instead of storing pairs, we can store only one value per push by encoding the minimum in the stack's values:
1. **Pushing a new minimum:** When a value `x` is smaller than the current `minEle`, we push an encoded value `2 * x - minEle` onto the stack and update `minEle = x`. Since `x < minEle`, the encoded value is always strictly less than the new `minEle`, which acts as a flag.
2. **Popping a minimum:** If the popped value is less than the current `minEle`, it indicates that this value is encoded and represents a change in the minimum. We can retrieve the previous minimum using `prevMin = 2 * minEle - st.top()`, and then restore it.
3. **Complexity:** This approach uses O(1) auxiliary space. *Note: In cases where inputs can cause integer overflow, using `long long` for the stack and `minEle` is recommended.*

### Code
```cpp
class Solution {
    int minEle;
    stack<int> st;
public:
    /*returns min element from stack*/
    int getMin(){
        if(st.empty()) return -1;
        return minEle;
    }
    
    /*returns popped element from stack*/
    int pop(){
        if(st.empty()) return -1;
        if(st.top() < minEle) {
            int tem = minEle;
            minEle = 2*minEle-st.top();
            st.pop();
            return tem;
        }
        else {
            int tem = st.top();
            st.pop();
            return tem;
        }
    }
    
    /*push element x into the stack*/
    void push(int x){
        if(st.empty()) {
            st.push(x);
            minEle = x;
        }
        else if(x < minEle) {
            st.push(2*x - minEle); // 2*x-minEle to handle negative numbers
            // Otherwise x-minEle here and minEle-st.top() above would have worked
            minEle = x;
        }
        else {
            st.push(x);
        }
    }
};
```

