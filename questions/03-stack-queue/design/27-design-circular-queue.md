# Design Circular Queue

**Link:** https://leetcode.com/problems/design-circular-queue/

## Problem
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called a "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can store the new element in those spaces.

Implement the `MyCircularQueue` class:
- `MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.
- `Front()` Gets the front item from the queue. If the queue is empty, return `-1`.
- `Rear()` Gets the last item from the queue. If the queue is empty, return `-1`.
- `enQueue(value)` Inserts an element into the circular queue. Return `true` if the operation is successful.
- `deQueue()` Deletes an element from the circular queue. Return `true` if the operation is successful.
- `isEmpty()` Checks whether the circular queue is empty or not.
- `isFull()` Checks whether the circular queue is full or not.

You must solve the problem without using the built-in queue data structure in your programming language. 

## Solution
We can implement a circular queue using a fixed-size vector of size $k$:
- Maintain a `front` pointer, initialized to `0`.
- Maintain a `rear` pointer, initialized to `-1`.
- Maintain a `csz` (current size) variable, initialized to `0` to keep track of the number of active elements in the queue.
- **enQueue:** Increment `rear` circularly: `rear = (rear + 1) % k`. Insert the element at `queue[rear]` and increment `csz`.
- **deQueue:** Advance `front` circularly: `front = (front + 1) % k` and decrement `csz`.
- **Front / Rear:** Fetch the elements at the `front` and `rear` indices respectively, returning `-1` if the queue `isEmpty()`.

## Code
```cpp
class MyCircularQueue {
public:
    vector<int> queue;
    int front, rear, csz;
    MyCircularQueue(int k) : front(0), rear(-1), csz(0), queue(k, -1) {
    }
    
    bool enQueue(int value) {
        int k = queue.size();
        if(isFull()) return false;

        rear = (rear+1)%k;
        queue[rear] = value;
        csz++;

        return true;
    }
    
    bool deQueue() {
        int k = queue.size();
        if(isEmpty()) return false;
        
        front = (front+1)%k;
        csz--;

        return true;
    }
    
    int Front() {
        if(isEmpty()) return -1;
        return queue[front];
    }
    
    int Rear() {
        if(isEmpty()) return -1;
        return queue[rear];
    }
    
    bool isEmpty() {
        return csz == 0;
    }
    
    bool isFull() {
        return csz == queue.size();
    }
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * MyCircularQueue* obj = new MyCircularQueue(k);
 * bool param_1 = obj->enQueue(value);
 * bool param_2 = obj->deQueue();
 * int param_3 = obj->Front();
 * int param_4 = obj->Rear();
 * bool param_5 = obj->isEmpty();
 * bool param_6 = obj->isFull();
 */
```
