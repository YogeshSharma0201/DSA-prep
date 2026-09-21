# Maximize Sum Of Array After K Negations

**Link:** https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/

## Problem
Given an integer array `nums` and an integer `k`, modify the array in the following way:
- Choose an index `i` and replace `nums[i]` with `-nums[i]`.

You must apply this process exactly `k` times. You may choose the same index `i` multiple times.
Return the maximum possible sum of the array after modifying it in this way.

---

## Solution 1: Sorting / Min-Heap (Greedy - $O(N \log N)$)
1. Sort the array in ascending order.
2. Iterate through negative numbers and negate them into positive numbers while $K > 0$.
3. If $K$ remains greater than 0 and is odd (`K % 2 == 1`), flip the smallest absolute value element (which is either the smallest element in the sorted array or the element closest to zero) once.
4. Return the sum of all elements.

```cpp
class Solution {
public:
    int largestSumAfterKNegations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());

        for (int i = 0; i < nums.size() && k > 0; i++) {
            if (nums[i] < 0) {
                nums[i] = -nums[i];
                k--;
            }
        }

        int sum = 0, minVal = INT_MAX;
        for (int x : nums) {
            sum += x;
            minVal = min(minVal, x);
        }

        if (k % 2 == 1) {
            sum -= 2 * minVal;
        }

        return sum;
    }
};
```

---

## Solution 2: Frequency Array / Counting Sort (Optimized - $O(N + R)$)
Since values in `nums` are bounded between `-100` and `100`, we can use a frequency array of size `201` with index offset `+100`.

1. Count frequencies of each number in `nums`.
2. Greedily flip negative numbers starting from `-100` up to `-1` (`i < 0`) while $K > 0$.
3. If $K$ is odd after processing negatives, flip the smallest non-negative number (`0` to `100`) once.
4. Calculate and return the total sum.

### Time & Space Complexity
- **Time Complexity:** $O(N + R)$ where $N = \text{nums.size()}$ and $R = 201$.
- **Space Complexity:** $O(1)$ auxiliary space.

```cpp
class Solution {
public:
    int largestSumAfterKNegations(vector<int>& nums, int K) {
        int count[201] = {0};
        for (int x : nums) count[x + 100]++;

        // Step 1: Negate negative numbers from most negative to least negative
        for (int i = -100; i < 0 && K > 0; i++) {
            while (count[i + 100] > 0 && K > 0) {
                count[i + 100]--;
                count[-i + 100]++;
                K--;
            }
        }

        // Step 2: If remaining K is odd, negate the smallest non-negative number once
        if (K % 2 == 1) {
            for (int i = 0; i <= 100; i++) {
                if (count[i + 100] > 0) {
                    count[i + 100]--;
                    count[-i + 100]++;
                    break;
                }
            }
        }

        // Step 3: Calculate total sum
        int sum = 0;
        for (int i = -100; i <= 100; i++) {
            sum += i * count[i + 100];
        }
        return sum;
    }
};
```
