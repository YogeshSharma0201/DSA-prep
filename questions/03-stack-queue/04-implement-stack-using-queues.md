# Implement Stack Using Queues

**Link:** https://leetcode.com/problems/implement-stack-using-queues

## Problem
Implement a last-in-first-out (LIFO) stack using only standard queue operations (push to back, peek/pop from front, size, empty). The implemented stack should support push, pop, top, and empty operations.

## Solution
Use a single queue. On push, enqueue the new element, then rotate the entire queue by dequeuing all previously existing elements and enqueuing them back. This keeps the most recently pushed element at the front. Pop and top simply return the front of the queue.

## Code
```cpp
class MyStack {
public:
    queue<int> q;
    MyStack() {}

    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; i++) { // Push back to the same queue
            q.push(q.front());
            q.pop();
        }
    }

    int pop() {
        int ret = q.front();
        q.pop();
        return ret;
    }

    int top() {
        return q.back();
    }

    bool empty() {
        return q.empty();
    }
};
```
