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
