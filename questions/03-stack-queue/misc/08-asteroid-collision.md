# Asteroid Collision

**Link:** https://leetcode.com/problems/asteroid-collision/

## Problem

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Example 1:**
```
Input: asteroids = [5, 10, -5]
Output: [5, 10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

**Example 2:**
```
Input: asteroids = [8, -8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
```

**Example 3:**
```
Input: asteroids = [10, 2, -5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
```

**Constraints:**
- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

## Solution

This problem can be solved in O(N) time complexity using a **Stack** (implemented via a `std::vector` to allow easy conversion to the final output).

### Core Idea

1. **Iterate Asteroids:** Process each asteroid one by one.
2. **Right-Moving Asteroids:** If an asteroid is moving to the right (positive), push it onto the stack because it cannot collide with any asteroids already processed (which are to its left).
3. **Left-Moving Asteroids:** If an asteroid is moving to the left (negative):
   - It will collide with any right-moving (positive) asteroids at the top of the stack.
   - We pop all positive asteroids that are smaller than the current left-moving asteroid (since they explode).
   - If we find a positive asteroid of the same size at the top of the stack, both explode (we pop the top asteroid and discard the current left-moving asteroid).
   - If the stack is empty or the top asteroid is also moving left (negative), the current left-moving asteroid survives and is pushed onto the stack.

---

### Complexity Analysis
- **Time Complexity:** O(N) — Each asteroid is pushed onto and popped from the stack at most once.
- **Space Complexity:** O(N) for the stack storage in the worst-case scenario where no collisions occur.

## Code

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st;

        int n = asteroids.size();

        for(int i=0; i<n; i++) {
            if(asteroids[i] == 0) continue;
            else if(asteroids[i] > 0) {
                st.push_back(asteroids[i]);
            }
            else {
                int p = abs(asteroids[i]);

                // Pop all lesser elements
                // ignore negatives
                // and ignore equal elements as it is an edge case
                while(st.size() > 0 && st.back() > 0 && st.back() < p) st.pop_back();

                if(st.size() > 0) {
                    if(st.back() < 0) {
                        st.push_back(asteroids[i]);
                    }
                    // Special edge case
                    else if(st.back() == p) {
                        st.pop_back();
                    }
                }
                else {
                    st.push_back(asteroids[i]);
                }
            }
        }

        return st;
    }
};
```
