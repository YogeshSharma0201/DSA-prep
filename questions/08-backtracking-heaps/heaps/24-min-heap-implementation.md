# Min Heap Implementation

**Link:** https://www.geeksforgeeks.org/problems/min-heap-implementation/1

## Problem
Implement a **Min Heap** (Priority Queue) data structure from scratch with the following operations:
1. `push(int x)`: Inserts a new element `x` into the heap.
2. `pop()`: Removes the minimum element (the root) from the heap.
3. `peek()`: Returns the minimum element of the heap without removing it (or `-1` if empty).
4. `size()`: Returns the current number of elements in the heap.

---

## Solution (Array-Based Binary Min Heap)

### Concept & Operations
A Binary Min-Heap is a complete binary tree represented as an array / vector where for every node at index `i`:
- **Parent Index**: `(i - 1) / 2`
- **Left Child Index**: `2 * i + 1`
- **Right Child Index**: `2 * i + 2`
- **Min-Heap Property**: The value of each node is greater than or equal to the value of its parent (`heap[parent] <= heap[child]`). The minimum element is always stored at `heap[0]`.

### Key Operations
1. **`push(x)`**:
   - Append `x` to the end of the array.
   - Perform **`heapifyUp`** (bubble up) starting from the newly added element: compare with parent and swap if `heap[parent] > heap[child]` until the heap property is restored.
   - **Time Complexity:** O(log n)

2. **`pop()`**:
   - If empty, return.
   - If only one element exists, simply remove it.
   - Otherwise, replace the root `heap[0]` with the last element `heap.back()`, pop the last element, and perform **`heapifyDown`** (bubble down / sink) starting from index `0`: compare root with its left and right children, swap with the smallest of the three, and repeat until the heap property is restored.
   - **Time Complexity:** O(log n)

3. **`peek()`**:
   - Returns the root element `heap[0]` in O(1) time. Returns `-1` if empty.

4. **`size()`**:
   - Returns `heap.size()` in O(1) time.

---

## Code

```cpp
#include <vector>
#include <algorithm>

using namespace std;

class minHeap {
  private:
    // Dynamic array representing the binary heap
    vector<int> heap;
    
    // Bubble up element at index i to restore min-heap property
    void heapifyUp(int i) {
        while (i > 0) {
            int pi = (i - 1) / 2;
            if (heap[pi] <= heap[i]) break;
            swap(heap[pi], heap[i]);
            i = pi;
        }
    }
    
    // Bubble down element at index i to restore min-heap property
    void heapifyDown(int i = 0) {
        while (true) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int smallest = i;
            
            if (left < heap.size() && heap[left] < heap[smallest]) {
                smallest = left;
            }
            
            if (right < heap.size() && heap[right] < heap[smallest]) {
                smallest = right;
            }
            
            if (smallest == i) break;
            
            swap(heap[i], heap[smallest]);
            i = smallest;
        }
    }
    
  public:
    minHeap() {
    }
    
    void push(int x) {
        heap.push_back(x);
        heapifyUp(heap.size() - 1);
    }

    void pop() {
        if (heap.empty()) return;
        
        if (heap.size() == 1) {
            heap.pop_back();
            return;
        }
        
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
    }

    int peek() {
        if (size()) return heap[0];
        return -1;
    }

    int size() {
        return heap.size();
    }
};
```

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **`push(x)`** | O(log n) | O(1) auxiliary |
| **`pop()`** | O(log n) | O(1) auxiliary |
| **`peek()`** | O(1) | O(1) |
| **`size()`** | O(1) | O(1) |
| **Total Space** | — | O(n) to store elements |
