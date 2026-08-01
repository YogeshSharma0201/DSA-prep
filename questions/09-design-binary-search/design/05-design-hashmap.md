# Design HashSet & HashMap

This file contains solutions for designing custom HashSet and HashMap structures without using built-in hash library templates, resolving collisions via chaining.

---

## Part 1: Design HashSet

**Link:** https://leetcode.com/problems/design-hashset/

### Problem
Design a HashSet from scratch without using any built-in hash table libraries. Implement `add(key)`, `remove(key)`, and `contains(key)`. Keys are non-negative integers.

### Solution
Use an array of 1000 buckets where each bucket is a linked list of integers. The hash function is `key % 1000`. 
- `add()` checks if the key is already present; if not, pushes it to the appropriate bucket list.
- `remove()` removes the key from the bucket list if present.
- `contains()` searches the bucket list to see if the key exists.

### Code
```cpp
class MyHashSet {
    static const int size = 1000;
    vector<list<int>> hashset;

public:
    MyHashSet() : hashset(size) {}
    
    void add(int key) {
        if (contains(key)) return;
        hashset[key % size].push_back(key);
    }
    
    void remove(int key) {
        if (!contains(key)) return;
        hashset[key % size].remove(key);
    }
    
    bool contains(int key) {
        for (auto &it : hashset[key % size]) {
            if (it == key) return true;
        }
        return false;
    }
};
```

---

## Part 2: Design HashMap

**Link:** https://leetcode.com/problems/design-hashmap/

### Problem
Design a HashMap from scratch without using any built-in hash table libraries. Implement `put(key, value)`, `get(key)` (returns -1 if absent), and `remove(key)`. Keys and values are non-negative integers.

### Solution
Use an array of 1000 buckets where each bucket is a linked list of `(key, value)` pairs. The hash function is `key % 1000`.
- `put()` searches the bucket list. If the key exists, its value is updated; otherwise, a new pair is appended.
- `get()` searches the bucket list and returns the value if the key is found, or -1 otherwise.
- `remove()` removes the key-value pair matching the key from the bucket list.

### Code
```cpp
class MyHashMap {
    static const int SIZE = 1000;
    vector<list<pair<int,int>>> buckets;

    int hash(int key) { return key % SIZE; }
public:
    MyHashMap() : buckets(SIZE) {}

    void put(int key, int value) {
        auto& lst = buckets[hash(key)];
        for (auto& p : lst)
            if (p.first == key) { p.second = value; return; }
        lst.push_back({key, value});
    }

    int get(int key) {
        for (auto& p : buckets[hash(key)])
            if (p.first == key) return p.second;
        return -1;
    }

    void remove(int key) {
        auto& lst = buckets[hash(key)];
        lst.remove_if([key](const pair<int,int>& p){ return p.first == key; });
    }
};
```

