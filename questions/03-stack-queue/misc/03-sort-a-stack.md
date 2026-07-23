# Sort a Stack

**Link:** https://www.geeksforgeeks.org/problems/sort-a-stack

## Problem
Given a stack, sort it in ascending order (smallest element on top) using recursion. You may use an extra temporary stack but not any other data structure, and extra space must be O(n) recursive stack only.

1. **Recursive Approach**: Sort the stack by popping the top element, recursively sorting the remaining stack, and then inserting the popped element back at its correct sorted position.
2. **Iterative Approach**: Iteratively move elements from the source stack to a temporary stack, keeping the temporary stack sorted by moving elements back if needed.

## Code

### 1. Recursive Solution (O(N^2) Time, O(N) Auxiliary Space)
This uses only the recursion stack space.

```cpp
// Helper function to insert an element into the sorted stack
void sortedInsert(stack<int> &st, int x) {
    // If stack is empty or the top element is smaller or equal, push x
    if (st.empty() || st.top() <= x) {
        st.push(x);
        return;
    }

    int top = st.top();
    st.pop();

    // Recursively insert x in sorted order
    sortedInsert(st, x);

    st.push(top);
}

// Main recursive function to sort the stack
void SortedStack::sort() {
    if (s.empty()) return;

    int top = s.top();
    s.pop();
    
    // Recursively sort the remaining stack
    sort();

    // Insert the popped top element back in sorted order
    sortedInsert(s, top);
}
```

### 2. Iterative Solution (O(N^2) Time, O(N) Auxiliary Space)
This uses an explicit temporary stack.

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
