# Implement Queue using Stacks

**Link:** https://leetcode.com/problems/implement-queue-using-stacks

## Problem
Implement a FIFO queue using only two stacks. Implement the push, pop, peek, and empty operations. Each operation must be amortized O(1) time.

## Solution
Use two stacks: `inbox` and `outbox`. Push always goes to inbox. Pop/peek check if outbox is empty; if so, transfer all elements from inbox to outbox (reversing order). This amortizes to O(1) per operation.

## Code
```cpp
class MyQueue {
    stack<int> inbox, outbox;
    void transfer() {
        if (outbox.empty())
            while (!inbox.empty()) { outbox.push(inbox.top()); inbox.pop(); }
    }
public:
    void push(int x) { inbox.push(x); }
    int pop() { transfer(); int val = outbox.top(); outbox.pop(); return val; }
    int peek() { transfer(); return outbox.top(); }
    bool empty() { return inbox.empty() && outbox.empty(); }
};
```
