# Flatten Nested List Iterator

**Link:** https://leetcode.com/problems/flatten-nested-list-iterator

## Problem
Given a nested list of integers, implement an iterator to flatten it. Each element is either an integer or a list whose elements may also be integers or other lists. The iterator must support `next()` and `hasNext()`.

## Solution
During construction, perform a DFS over the nested list and collect all integers into a flat vector. The iterator then simply maintains an index into this vector. `hasNext()` checks if the index is within bounds, and `next()` returns the element at the current index and advances it.

## Code
```cpp
class NestedIterator {
    vector<int> flat;
    int idx = 0;

    void dfs(vector<NestedInteger>& nestedList) {
        for (auto& ni : nestedList) {
            if (ni.isInteger())
                flat.push_back(ni.getInteger());
            else
                dfs(ni.getList());
        }
    }
public:
    NestedIterator(vector<NestedInteger>& nestedList) {
        dfs(nestedList);
    }

    int next() {
        return flat[idx++];
    }

    bool hasNext() {
        return idx < (int)flat.size();
    }
};
```

## Alternate Solution (Lazy Stack)
Instead of flattening upfront, use a stack of `(list pointer, index)` pairs and evaluate lazily. `hasNext()` walks the stack until it finds an integer at the top — expanding nested lists as it goes. `next()` calls `hasNext()` to position correctly, then consumes the integer.

```cpp
class NestedIterator {
    stack<pair<const vector<NestedInteger>*, int>> st;
public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        st.push({&nestedList, 0});
    }

    int next() {
        hasNext();
        auto& [list, i] = st.top();
        return (*list)[i++].getInteger();
    }

    bool hasNext() {
        while (!st.empty()) {
            auto& [list, i] = st.top();
            if (i == (int)list->size()) {
                st.pop();
            } else {
                const NestedInteger& x = (*list)[i];
                if (x.isInteger()) return true;
                i++;
                st.push({&x.getList(), 0});
            }
        }
        return false;
    }
};
```
