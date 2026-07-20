# Design HashMap

**Link:** https://leetcode.com/problems/design-hashmap/

## Problem
Design a HashMap from scratch without using any built-in hash table libraries. Implement `put(key, value)`, `get(key)` (return -1 if absent), and `remove(key)`. Keys and values are non-negative integers.

## Solution
Use an array of 1000 buckets where each bucket is a linked list of `(key, value)` pairs (chaining for collision handling). The hash function is `key % 1000`. Each operation traverses the appropriate bucket list to find, insert, update, or remove the matching key.

## Code
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
