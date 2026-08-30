# Boats to Save People

**Link:** https://leetcode.com/problems/boats-to-save-people/

## Problem

You are given an array `people` where `people[i]` is the weight of the $i^{\text{th}}$ person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return the minimum number of boats to carry every given person.

**Example 1:**
```
Input: people = [1, 2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
```

**Example 2:**
```
Input: people = [3, 2, 2, 1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2), (3)
```

**Example 3:**
```
Input: people = [3, 5, 3, 4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
```

**Constraints:**
- `1 <= people.length <= 5 * 10^4`
- `1 <= people[i] <= limit <= 3 * 10^4`

## Solution

The problem can be solved in O(N log N) time complexity using a **Greedy** approach with **Two Pointers**.

### Core Idea

1. **Sort the Array:** Sort the weights of the people in ascending order.
2. **Two Pointers:** Place a pointer `l` at the beginning (lightest person) and a pointer `r` at the end (heaviest person).
3. **Greedy Matching:**
   - If the lightest person and the heaviest person can fit in the same boat (`people[l] + people[r] <= limit`), pair them together by moving both pointers inward (`l++` and `r--`).
   - If they cannot fit together, the heaviest person `people[r]` must go alone in a boat. Thus, we decrement `r` but leave `l` where it is.
   - In both cases, a boat is used, so we increment `boats`.
4. **Final Single Person:** If `l == r` at the end of the loop, one person remains. They must take a boat alone.

---

### Complexity Analysis
- **Time Complexity:** O(N log N) — Sorting the array takes O(N log N) time, and the two-pointer traversal takes O(N) time.
- **Space Complexity:** O(1) or O(N) depending on the space complexity of the sorting algorithm.

## Code

```cpp
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        sort(people.begin(), people.end());

        int l = 0, r = people.size()-1;

        int boats = 0;
        while(l<r) {
            if(people[l]+people[r] <= limit) {
                l++, r--;
                boats++;
            }
            else {
                r--;
                boats++;
            }
        }
        if(l==r) boats++;
        return boats;
    }
};
```
