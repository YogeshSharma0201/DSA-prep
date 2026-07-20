# Rearrange Array Elements by Sign

**Link:** https://leetcode.com/problems/rearrange-array-elements-by-sign/description/

## Problem

You have a 0-indexed integer array `nums` of even length consisting of an **equal** number of positive and negative integers.

Rearrange `nums` such that:
1. Every consecutive pair of integers have opposite signs.
2. For all integers with the same sign, the **relative order** is preserved.
3. The rearranged array begins with a positive integer.

Return the modified array.

**Example 1:**
```
Input:  nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
```

**Example 2:**
```
Input:  nums = [-1,1]
Output: [1,-1]
```

**Constraints:**
- `2 <= nums.length <= 2 * 10^5`
- `nums.length` is even
- `1 <= |nums[i]| <= 10^5`
- `nums` consists of an equal number of positive and negative integers.

## Solution

### Two-pointer scan (O(n) time, O(n) space)

Maintain two pointers `l` (next positive) and `r` (next negative) over the original array.

- At each position `i` in the result:
  - Advance `l` past any negatives, advance `r` past any positives.
  - Even positions get a positive; odd positions get a negative.
  - Fallback: if the expected sign is exhausted, take from the other side (handles unequal counts in the general variant).

| i | Expected | Picked     | Result so far        |
|---|----------|------------|----------------------|
| 0 | positive | 3  (l=0)   | [3]                  |
| 1 | negative | -2 (r=2)   | [3,-2]               |
| 2 | positive | 1  (l=1)   | [3,-2,1]             |
| 3 | negative | -5 (r=3)   | [3,-2,1,-5]          |
| 4 | positive | 2  (l=4)   | [3,-2,1,-5,2]        |
| 5 | negative | -4 (r=5)   | [3,-2,1,-5,2,-4] ✓   |

## Code
```cpp
class Alternate {
public:
    vector<int> sort(vector<int> input) {
        int l = 0, r = 0;
        int n = input.size();
        vector<int> res(n);

        for (int i = 0; i < n; i++) {
            while (l < n && input[l] < 0) l++;   // l → next positive
            while (r < n && input[r] >= 0) r++;   // r → next negative

            // odd position with negatives available, or even position with no positives left
            if (((i & 1) != 0 && r < n) || ((i & 1) == 0 && l >= n)) {
                res[i] = input[r++];
            } else {
                res[i] = input[l++];
            }
        }

        return res;
    }
};
```
