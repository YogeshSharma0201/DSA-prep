# All O'one Data Structure

**Link:** https://leetcode.com/problems/all-oone-data-structure/

## Problem
Design a data structure that supports inc(key), dec(key), getMaxKey(), and getMinKey() — all in O(1) average time. inc increments the count of a key, dec decrements it (removing it if count reaches 0). getMaxKey/getMinKey return any key with the maximum/minimum count respectively.

## Solution
Use a doubly linked list where each node holds a count value and a set of keys with that count. Maintain a map from each key to its list node. The list is ordered by count (smallest at front, largest at back). On inc/dec, move the key to the adjacent node with count +1/-1, creating a new node if needed. Removing a key that reaches count 0 removes it from its node's set. getMin reads front->keys, getMax reads back->keys.

## Code
```cpp
class AllOne {
    struct Node {
        int cnt;
        set<string> keys;
        Node(int c) : cnt(c) {}
    };
    list<Node> lst;
    unordered_map<string, list<Node>::iterator> mp;

public:
    AllOne() {}

    void inc(string key) {
        if (!mp.count(key)) {
            if (lst.empty() || lst.front().cnt != 1)
                lst.push_front(Node(1));
            lst.front().keys.insert(key);
            mp[key] = lst.begin();
        } else {
            auto it = mp[key];
            auto next = std::next(it);
            if (next == lst.end() || next->cnt != it->cnt + 1)
                next = lst.insert(next, Node(it->cnt + 1));
            next->keys.insert(key);
            mp[key] = next;
            it->keys.erase(key);
            if (it->keys.empty()) lst.erase(it);
        }
    }

    void dec(string key) {
        auto it = mp[key];
        if (it->cnt == 1) {
            mp.erase(key);
        } else {
            auto prev = it;
            if (it == lst.begin() || std::prev(it)->cnt != it->cnt - 1)
                prev = lst.insert(it, Node(it->cnt - 1));
            else
                prev = std::prev(it);
            prev->keys.insert(key);
            mp[key] = prev;
        }
        it->keys.erase(key);
        if (it->keys.empty()) lst.erase(it);
    }

    string getMaxKey() {
        return lst.empty() ? "" : *lst.back().keys.begin();
    }

    string getMinKey() {
        return lst.empty() ? "" : *lst.front().keys.begin();
    }
};
```
