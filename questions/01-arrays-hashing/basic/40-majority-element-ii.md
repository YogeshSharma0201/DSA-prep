# Majority Element II

**Link:** https://leetcode.com/problems/majority-element-ii/

## Problem
Given an integer array `nums` of size `n`, find all elements that appear more than `⌊ n / 3 ⌋` times.

**Example 1:**
```
Input: nums = [3,2,3]
Output: [3]
```

**Example 2:**
```
Input: nums = [1]
Output: [1]
```

**Example 3:**
```
Input: nums = [1,2]
Output: [1,2]
```

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

## Explanation: Boyer-Moore Majority Vote Algorithm (for > n/3 elements)

The standard Boyer-Moore Voting Algorithm is used to find a majority element that appears more than `⌊ n / 2 ⌋` times using O(1) space. We can extend this algorithm to find all elements that appear more than `⌊ n / 3 ⌋` times.

### 1. Mathematical Intuition
- For any threshold $k$ where we want elements appearing $> \lfloor n/k \rfloor$ times, there can be at most $k - 1$ such elements.
- For $k = 3$, there can be at most **two** majority elements in the array. 
- *Proof:* If there were 3 elements each appearing $> n/3$ times, their combined frequency would be $> 3 \times (n/3) = n$, which is greater than the total number of elements in the array. This is impossible.
- Therefore, we only need to maintain at most **two candidates** (`num1` and `num2`) and their corresponding counters (`c1` and `c2`).

### 2. Algorithm Breakdown
The algorithm consists of two passes:

#### Pass 1: Candidate Selection (Triplet Elimination)
We iterate through the array and try to form triplets of three distinct elements. Whenever we find three distinct elements, we discard them (by decrementing our counters).
- If the current element matches `num1` or `num2`, we increment the respective counter (`c1` or `c2`).
- If either counter is `0`, we assign the current element as the new candidate and set its counter to `1`.
- If the current element matches neither candidate and both counters are greater than `0`, it means we have found a triplet of three distinct elements. We discard one occurrence of each by decrementing both `c1` and `c2`.

#### Pass 2: Verification
Boyer-Moore only guarantees that if there are elements appearing $> \lfloor n/3 \rfloor$ times, they will be among our two candidates. It does *not* guarantee that the candidates actually meet the requirement.
- For example, in `nums = [1, 2, 3, 4]`, the candidates at the end might be `3` and `4`, but neither appears $> \lfloor 4/3 \rfloor = 1$ times.
- Thus, we must reset the counters and iterate through the array a second time to count the actual frequencies of `num1` and `num2`.
- Any candidate with a frequency strictly greater than $\lfloor n/3 \rfloor$ is added to the result.

## Code
```cpp
class Solution {
public:
    // Moores voting algorithm
    vector<int> majorityElement(vector<int>& nums) {
        int num1 = -1, num2 = -1, c1 = 0, c2 = 0;
        
        for(int num : nums) {
            if(num == num1) c1++;
            else if(num == num2) c2++;
            else if(c1 == 0) {
                num1 = num;
                c1++;
            }
            else if(c2 == 0) {
                num2 = num;
                c2++;
            }
            else {
                c1--;
                c2--;
            }
        }
        
        c1 = 0, c2 = 0;
        for(int num : nums) {
            if(num == num1) c1++;
            else if(num == num2) c2++;
        }
        
        int maj = nums.size()/3;
        
        vector<int> res;
        
        if(c1 > maj) res.push_back(num1);
        if(c2 > maj) res.push_back(num2);
        
        return res;
    }
};
```
