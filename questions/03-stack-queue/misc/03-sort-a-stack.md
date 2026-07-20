# Sort a Stack

**Link:** https://www.geeksforgeeks.org/problems/sort-a-stack

## Problem
Given a stack, sort it in ascending order (smallest element on top) using recursion. You may use an extra temporary stack but not any other data structure, and extra space must be O(n) recursive stack only.

## Solution
Iteratively move elements from source stack s to temp stack, maintaining sorted order in temp. For each element popped from s, find its correct position in temp by moving elements back to s if needed, then insert. After processing all elements, move everything back from temp to s to restore ascending order (smallest on top).

## Code
```cpp
void SortedStack::sort() {
    stack<int> temp;

    while (!s.empty()) {
        if (temp.empty()) {
            temp.push(s.top());
            s.pop();
        }
        while (!s.empty() && s.top() <= temp.top()) {
            temp.push(s.top());
            s.pop();
        }
        if (!s.empty()) {
            int topN = s.top();
            s.pop();
            while (!temp.empty() && topN > temp.top()) {
                s.push(temp.top());
                temp.pop();
            }
            s.push(topN);
        }
    }

    while (!temp.empty()) {
        s.push(temp.top());
        temp.pop();
    }
}
```
