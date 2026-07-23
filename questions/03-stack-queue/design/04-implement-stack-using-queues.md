# Implement Stack Using Queues

**Link:** https://leetcode.com/problems/implement-stack-using-queues

## Problem
Implement a last-in-first-out (LIFO) stack using only standard queue operations (push to back, peek/pop from front, size, empty). The implemented stack should support push, pop, top, and empty operations.

## Solution
Use a single queue.
1. **Push O(N) / Pop O(1)**: On push, enqueue the new element, then rotate the entire queue by dequeuing all previously existing elements and enqueuing them back. This keeps the most recently pushed element at the front. Pop and top simply return the front of the queue.
2. **Push O(1) / Pop O(N)**: On push, simply enqueue the new element. On pop, rotate the queue `size - 1` times to bring the last inserted element to the front, record and pop it, then return. The `top` operation returns the back of the queue.

## Code

### Push O(N), Pop O(1)
```cpp
class MyStack {
public:
    queue<int> q;
    MyStack() {
        
    }

    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; i++) { // Rotate the queue to place the new element at the front
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
        return q.front();
    }

    bool empty() {
        return q.empty();
    }
};
```

### Push O(1), Pop O(N)
```cpp
class MyStack {
public:
    queue<int> q;
    MyStack() {
        
    }

    void push(int x) {
        q.push(x);
    }

    int pop() {
        for (int i = 0; i < q.size() - 1; i++) { // Rotate the queue to bring the last element to the front
            q.push(q.front());
            q.pop();
        }
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
