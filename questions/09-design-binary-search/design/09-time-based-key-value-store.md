# Time Based Key-Value Store

**Link:** https://leetcode.com/problems/time-based-key-value-store/

## Problem
Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key's value at a certain timestamp.

Implement the `TimeMap` class:
- `set(key, value, timestamp)`: Stores the `key` with the given `value` at the given `timestamp`.
- `get(key, timestamp)`: Returns a value such that `set` was called previously with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value associated with the largest `timestamp_prev`. If there are no values, it returns `""`.

## Solution
Use a nested hash map structure:
1. **Data Structure:** Use an `unordered_map<string, map<int, string>>`.
   - The outer map keys are the string `key`.
   - The inner map maps `timestamp` (integer) to the string `value`. Since `std::map` in C++ stores its elements sorted by key (timestamp), we can perform binary search on it.
2. **Set Operation:** Simply insert `value` at `umap[key][timestamp]`.
3. **Get Operation:** 
   - Perform binary search using `upper_bound(timestamp)`.
   - `upper_bound` returns an iterator to the first element that is strictly greater than the query `timestamp`.
   - If the iterator points to the beginning of the inner map, it means all stored timestamps are strictly greater than the requested `timestamp`, so return `""`.
   - Otherwise, decrement the iterator by one (`prev(iter)`) to get the largest timestamp that is less than or equal to the requested `timestamp`, and return its associated value.

## Code
```cpp
class TimeMap {
public:
    unordered_map<string, map<int, string>> umap;

    TimeMap() {
        
    }
    
    void set(string key, string value, int timestamp) {
        umap[key][timestamp] = value;
    }
    
    string get(string key, int timestamp) {
        auto iter = umap[key].upper_bound(timestamp);
        return iter == umap[key].begin() ? "" : prev(iter)->second;
    }
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * TimeMap* obj = new TimeMap();
 * obj->set(key,value,timestamp);
 * string param_2 = obj->get(key,timestamp);
 */
```
