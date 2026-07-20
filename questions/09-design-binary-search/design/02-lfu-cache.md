# LFU Cache

**Link:** https://leetcode.com/problems/lfu-cache

## Problem
Design a Least Frequently Used (LFU) cache. It must support `get` and `put` in O(1). When capacity is exceeded, evict the least frequently used key. Among ties in frequency, evict the least recently used.

## Solution
Maintain three hash maps: `keyVal` (key to value), `keyFreq` (key to frequency), and `freqKeys` (frequency to an ordered set/list of keys, ordered by recency). Also track `minFreq`. On every access, increment the key's frequency, move it from the old frequency bucket to the new one, and update `minFreq` accordingly. On eviction, remove from the `minFreq` bucket.

## Code
```cpp
class LFUCache {
    int cap, minFreq;
    unordered_map<int,int> keyVal, keyFreq;
    unordered_map<int, list<int>> freqKeys;
    unordered_map<int, list<int>::iterator> keyIter;
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}

    void touch(int key) {
        int f = keyFreq[key];
        keyFreq[key]++;
        freqKeys[f].erase(keyIter[key]);
        if (freqKeys[f].empty() && f == minFreq) minFreq++;
        freqKeys[f+1].push_front(key);
        keyIter[key] = freqKeys[f+1].begin();
    }

    int get(int key) {
        if (!keyVal.count(key)) return -1;
        touch(key);
        return keyVal[key];
    }

    void put(int key, int value) {
        if (cap <= 0) return;
        if (keyVal.count(key)) {
            keyVal[key] = value;
            touch(key);
        } else {
            if ((int)keyVal.size() == cap) {
                int evict = freqKeys[minFreq].back();
                freqKeys[minFreq].pop_back();
                keyVal.erase(evict); keyFreq.erase(evict); keyIter.erase(evict);
            }
            keyVal[key] = value;
            keyFreq[key] = 1;
            minFreq = 1;
            freqKeys[1].push_front(key);
            keyIter[key] = freqKeys[1].begin();
        }
    }
};
```
