# Binary Search Templates

**Study Plan:** https://leetcode.com/studyplan/binary-search/

All binary search problems reduce to one of two questions:
- **"What is the first position where condition becomes true?"** → Left-search
- **"What is the last position where condition is still true?"** → Invert condition, left-search, return `low - 1`

---

## The Core Template — Left-Search (Find First True)

Condition transitions `false → true`. Find the **first** position where it flips to true.
This is exactly what C++ `lower_bound` and `upper_bound` do internally.

```cpp
int low = 1, high = 1e9;      // high = a value where condition is DEFINITELY true
while (low < high) {
    int mid = (low + high) >> 1;
    if (condition(mid)) {
        high = mid;            // mid could be the answer; keep it in range
    } else {
        low = mid + 1;         // mid is definitely not the answer; exclude it
    }
}
// low == high is the answer
```

**STL equivalents:**
```cpp
lower_bound(arr.begin(), arr.end(), target);  // first pos where arr[pos] >= target
upper_bound(arr.begin(), arr.end(), target);  // first pos where arr[pos] >  target
```

**Example — Minimum limit ("find smallest k where canFinish(k) is true"):**
```cpp
while (low < high) {
    int mid = (low + high) >> 1;
    if (canFinish(mid)) high = mid;
    else               low = mid + 1;
}
return low;
```

---

## Find Last True — Invert Condition, Left-Search, Return `low - 1`

"Find last k where condition(k) is true"
= "Find first k where condition(k) is FALSE, return low - 1"

Set `high` to a value where the ORIGINAL condition is definitely false (inverted condition is true).

```cpp
int low = 1, high = exclusive_upper_bound;   // condition(high) must be FALSE
while (low < high) {
    int mid = (low + high) >> 1;
    if (!condition(mid)) {         // inverted: "first false"
        high = mid;
    } else {
        low = mid + 1;
    }
}
return low - 1;  // lo is first-false; lo-1 is last-true; returns -1 if none exists
```

**STL equivalents:**
```cpp
prev(upper_bound(arr.begin(), arr.end(), target));  // last pos where arr[pos] <= target
prev(lower_bound(arr.begin(), arr.end(), target));  // last pos where arr[pos] <  target
```

**Example — Sqrt(x): last k where k\*k ≤ x**
```cpp
// Invert: find first k where k*k > x, answer is lo - 1
long long lo = 1, hi = (long long)x/2 + 2;  // hi^2 > x is guaranteed
while (lo < hi) {
    long long mid = (lo + hi) >> 1;
    if (mid * mid > x) hi = mid;    // inverted condition
    else               lo = mid + 1;
}
return (int)lo - 1;
```

---

## Exact-Match 3-Way — Find Specific Value in Sorted Array

Use only when you need early exit on exact match (otherwise prefer left-search).

```cpp
int lo = 0, hi = n - 1;
while (lo <= hi) {                        // inclusive range
    int mid = (lo + hi) >> 1;
    if (arr[mid] == target) return mid;   // early exit
    else if (arr[mid] < target) lo = mid + 1;
    else                        hi = mid - 1;
}
return -1;  // not found
```

**STL equivalent:**
```cpp
// Check existence:
bool found = binary_search(arr.begin(), arr.end(), target);
// Get index (safer):
auto it = lower_bound(arr.begin(), arr.end(), target);
if (it != arr.end() && *it == target) { int idx = it - arr.begin(); }
```

---

## Cheat Sheet

| Goal | Template | STL equivalent |
|------|----------|----------------|
| First pos where `cond` is true | Left-search | `lower_bound` / `upper_bound` |
| Last pos where `cond` is true | Invert, left-search, return `lo-1` | `prev(upper_bound)` |
| Exact value in sorted array | 3-way exact-match | `binary_search` / `lower_bound` |
| First element ≥ target | `arr[mid] >= target` → left-search | `lower_bound` |
| First element > target | `arr[mid] > target` → left-search | `upper_bound` |
| Last element ≤ target | Invert `arr[mid] > target`, return `lo-1` | `prev(upper_bound)` |
| Last element < target | Invert `arr[mid] >= target`, return `lo-1` | `prev(lower_bound)` |

---

## Why `(low+high)>>1`?

Both `(low+high)>>1` and `low + (high-low)/2` compute floor of the average.
- `(low+high)>>1` is concise and standard in competitive programming
- For search spaces up to 10⁹, `low+high ≤ 2×10⁹` fits in a 32-bit int, so `>>1` is safe
- Use `long long` if the search space exceeds ~10⁹
