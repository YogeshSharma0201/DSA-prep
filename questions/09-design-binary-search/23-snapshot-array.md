# Snapshot Array

**Link:** https://leetcode.com/problems/snapshot-array/?envType=study-plan-v2&envId=binary-search

## Problem
Design a data structure that supports `set(index, val)`, `snap()` (returns a snap_id), and `get(index, snap_id)` which returns the value at `index` at the time of that snapshot.

## Solution
For each index, maintain a sorted `map<snapId, value>`. On `set`, record the value at the current snap ID. On `get`, use `upper_bound(snap_id)` then `prev` to find the latest recorded value at or before the requested snapshot.

## Code
```cpp
class SnapshotArray {
    unordered_map<int, map<int,int>> umap;
    int snapId = 0;
public:
    SnapshotArray(int length) {
        for (int i = 0; i < length; i++)
            umap[i][0] = 0;
    }

    void set(int index, int val) {
        umap[index][snapId] = val;
    }

    int snap() {
        return snapId++;
    }

    int get(int index, int snap_id) {
        auto it = umap[index].upper_bound(snap_id);
        return prev(it)->second;
    }
};
```
