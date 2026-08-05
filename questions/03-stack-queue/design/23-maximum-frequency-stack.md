# Maximum Frequency Stack

**Link:** https://leetcode.com/problems/maximum-frequency-stack/

## Problem
Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the `FreqStack` class:
- `FreqStack()` constructs an empty frequency stack.
- `void push(int val)` pushes an integer `val` onto the top of the stack.
- `int pop()` removes and returns the most frequent element in the stack.
  - If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.

## Solution
We can solve this problem in $O(1)$ time complexity for both `push` and `pop` operations by using a combination of hash maps and stacks:
1. **Frequency Map (`freq`):** Maps each element to its current frequency in the stack.
2. **Group Map (`umap`):** Maps a frequency to a stack of elements. If multiple elements have the same frequency, they are pushed onto the stack corresponding to that frequency. The stack naturally maintains the order of elements, resolving ties by returning the one closest to the top of the stack (LIFO order).
3. **Maximum Frequency (`maxFreq`):** Tracks the current maximum frequency of any element in the stack.

### Operations:
- **Push:**
  1. Increment the frequency of the element: `freq[val]++`.
  2. Push the element onto the stack corresponding to its new frequency: `umap[freq[val]].push(val)`.
  3. Update `maxFreq` to be `max(maxFreq, freq[val])`.
- **Pop:**
  1. Retrieve the element at the top of the stack corresponding to `maxFreq`: `int ret = umap[maxFreq].top()`.
  2. Pop the element from that stack: `umap[maxFreq].pop()`.
  3. Decrement the frequency of that element in `freq`: `freq[ret]--`.
  4. If the stack for the current `maxFreq` becomes empty, decrement `maxFreq` (the next highest frequency stack will be at `maxFreq - 1`).
  5. Return the popped element.

## Code
```cpp
class FreqStack {
public:
    unordered_map<int, int> freq;
    unordered_map<int, stack<int>> umap;
    int maxFreq;

    FreqStack() {
        maxFreq = 0;
    }
    
    void push(int val) {
        freq[val]++;
        umap[freq[val]].push(val);
        maxFreq = max(maxFreq, freq[val]);
    }
    
    int pop() {
        int ret = umap[maxFreq].top();
        umap[maxFreq].pop();
        freq[ret]--;

        if(umap[maxFreq].empty()) maxFreq--;

        return ret;
    }
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * FreqStack* obj = new FreqStack();
 * obj->push(val);
 * int param_2 = obj->pop();
 */
```
