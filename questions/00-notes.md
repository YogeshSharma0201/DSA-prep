# C++ STL Notes

## Lambda Capture Clause `[]`

A lambda is an anonymous function. Unlike Python/JS, C++ lambdas **cannot access local variables from the surrounding scope unless explicitly captured** in `[]`.

```
[key]  (const pair<int,int>& p)  { return p.first == key; }
  ^             ^                           ^
capture      parameter                    body
```

| Syntax | Meaning |
|--------|---------|
| `[x]` | capture `x` by value (copy) |
| `[&x]` | capture `x` by reference |
| `[=]` | capture all used variables by value |
| `[&]` | capture all used variables by reference |
| `[]` | capture nothing |

### As a Comparator

Lambdas are commonly used wherever a custom compare function is needed:

**`sort`**
```cpp
sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
    return a.second < b.second; // sort by second element
});
```

**`priority_queue`** — note: `decltype` needed to pass the lambda type
```cpp
auto cmp = [](const pair<int,int>& a, const pair<int,int>& b) {
    return a.first > b.first; // min-heap by first element
};
priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
```

**`lower_bound` / `upper_bound`**
```cpp
// find first element where x.second >= target
auto it = lower_bound(v.begin(), v.end(), target, [](const pair<int,int>& x, int val) {
    return x.second < val;
});
```

**`remove_if`** (with a captured variable)
```cpp
lst.remove_if([key](const pair<int,int>& p) { return p.first == key; });
```

---

## `std::list` STL

A doubly linked list. Unlike `vector`, no random access — but O(1) insert/erase anywhere given an iterator, and iterators are never invalidated by other insertions/erasures.

### Key Operations

**`splice`** — moves nodes between positions in O(1), pure pointer relinking, no allocation or copying
```cpp
// move node at `it` to the front of the same list
lst.splice(lst.begin(), lst, it);
```
- Iterator `it` remains valid after splice (same node, new position)
- Signature: `splice(position, source_list, iterator)`

**`remove_if`** — erases all elements matching a predicate
```cpp
lst.remove_if([](const pair<int,int>& p) { return p.first == 5; });
```

**Common methods**
| Method | Description |
|--------|-------------|
| `push_front(x)` / `push_back(x)` | Insert at front/back — O(1) |
| `pop_front()` / `pop_back()` | Remove from front/back — O(1) |
| `front()` / `back()` | Access first/last element |
| `erase(it)` | Remove node at iterator — O(1) |
| `insert(it, x)` | Insert before iterator — O(1) |
| `size()` | Number of elements — O(1) |

**When to use `list` over `vector`**
- Need O(1) erase/insert at arbitrary positions given an iterator (e.g. LRU cache)
- Need iterators to stay valid across mutations
- Do NOT use when random access (`v[i]`) is needed — `list` doesn't support it
