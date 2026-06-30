# LRU Cache

**Link:** https://leetcode.com/problems/lru-cache

## Problem
Design a data structure that follows the Least Recently Used (LRU) cache eviction policy. It should support `get(key)` and `put(key, value)` both in O(1) time. When capacity is exceeded, evict the least recently used item.

## Solution
Combine a doubly linked list with an unordered map. The map stores key-to-node pointers for O(1) lookup. The list maintains usage order with most-recently-used at the front and LRU at the back. On every `get` or `put`, move the accessed node to the front. On overflow, remove the node at the back.

**Note:** `lst.splice(lst.begin(), lst, mp[key])` detaches the node at `mp[key]` from its current position and reattaches it at the front — O(1) pure pointer relinking, no allocation or copying. The iterator `mp[key]` stays valid after splice (same node, new position), so the map never needs updating.

## Code
```cpp
class LRUCache {
    int cap;
    list<pair<int,int>> lst; // {key, value}
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        if (!mp.count(key)) return -1;
        lst.splice(lst.begin(), lst, mp[key]);
        return mp[key]->second;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            lst.splice(lst.begin(), lst, mp[key]);
        } else {
            if ((int)lst.size() == cap) {
                mp.erase(lst.back().first);
                lst.pop_back();
            }
            lst.push_front({key, value});
            mp[key] = lst.begin();
        }
    }
};
```
