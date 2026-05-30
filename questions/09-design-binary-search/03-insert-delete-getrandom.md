# Insert Delete GetRandom O(1)

**Link:** https://leetcode.com/problems/insert-delete-getrandom-o1/

## Problem
Design a data structure that supports inserting an element, removing an element, and getting a random element, all in average O(1) time. Duplicate elements are not allowed. `getRandom` should return each element with equal probability.

## Solution
Use a vector for O(1) random access and an unordered map for O(1) index lookup. For `insert`, append to the vector and record the index in the map. For `remove`, swap the target element with the last element, update the swapped element's index in the map, then pop the back. `getRandom` returns `v[rand() % v.size()]`.

## Code
```cpp
class RandomizedSet {
public:
    vector<int> v;
    unordered_map<int,int> mp;
    RandomizedSet() {

    }

    bool insert(int val) {
        if(mp.find(val) != mp.end()) return false;
        v.push_back(val);
        mp[val] = v.size()-1;
        return true;
    }

    bool remove(int val) {
        if(mp.find(val) == mp.end()) return false;
        auto it = mp.find(val);
        v[it->second] = v.back();
        v.pop_back();
        mp[v[it->second]] = it->second;
        mp.erase(val);
        return true;
    }

    int getRandom() {
        return v[rand() % v.size()];
    }
};
```
