# Count of Smaller Numbers After Self

**Link:** https://leetcode.com/problems/count-of-smaller-numbers-after-self/

## Problem
Given an integer array nums, return a new counts array where counts[i] is the number of smaller elements to the right of nums[i]. For example, for [5, 2, 6, 1], the answer is [2, 1, 1, 0].

## Solution
Use a Fenwick Tree (Binary Indexed Tree). Process the array from right to left. Offset values to handle negatives. For each number, query the BIT for the prefix sum of elements smaller than it (count of smaller elements already inserted to the right). Then update the BIT at that position.

**Sizing the BIT:** for values in `[minVal, maxVal]`, the number of distinct positions needed is `maxVal - minVal + 1`. Since a BIT is 1-indexed (index 0 is unused, as `i & -i` would loop forever), `offset` should map `minVal` to index `1`, i.e. `offset = -minVal + 1`. The array `bit` then needs size at least `(maxVal - minVal + 1) + 1` so the largest shifted value fits within bounds. Here LeetCode constrains `nums[i]` to `[-10^4, 10^4]`, so the range has `20001` distinct values, `offset = 10001` maps `-10000 → 1`, and `n = 20002` (plus one extra slot in the code as a safety margin) comfortably covers positions `1..20001`.

## Code
```cpp
class Solution {
    vector<int> bit;
    int n;

    void update(int i) {
        for (; i < n; i += i & (-i)) bit[i]++;
    }

    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }

public:
    vector<int> countSmaller(vector<int>& nums) {
        int offset = 10001;
        n = 20002 + 1;
        bit.assign(n, 0);

        vector<int> result(nums.size());
        for (int i = nums.size() - 1; i >= 0; i--) {
            int pos = nums[i] + offset;
            // If the questions asks for bigger number after self
            // then - (numbers till now or query(n) ) - query(pos)
            result[i] = query(pos - 1);
            update(pos);
        }
        return result;
    }
};
```

### Complexity
- **Time Complexity:** O(M + N log M) where $N$ is the number of elements in `nums` and $M$ is the range of values ($M = \max(\text{nums}) - \min(\text{nums}) + 1 \approx 2 \times 10^4$). We perform 1 `query` and 1 `update` per element, each taking O(log M) time.
- **Space Complexity:** O(M) auxiliary space for the BIT array of size $M$, plus O(N) for the result array.

## Alternative Solution (Merge Sort)
Sort indices instead of values, so the original positions are preserved. During the merge step of merge sort, whenever an element from the right half is placed before elements still remaining in the left half, every one of those remaining left elements has one more smaller element to its right — increment their counts by the number of right-half elements already merged in.

```cpp
class Solution {
    vector<int> counts;

    void mergeSort(vector<int>& idx, vector<int>& nums, int lo, int hi) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        mergeSort(idx, nums, lo, mid);
        mergeSort(idx, nums, mid + 1, hi);

        vector<int> merged(hi - lo + 1);
        int i = lo, j = mid + 1, rightCount = 0, k = 0;

        while (i <= mid && j <= hi) {
            if (nums[idx[j]] < nums[idx[i]]) {
                rightCount++;
                merged[k++] = idx[j++];
            } else {
                counts[idx[i]] += rightCount;
                merged[k++] = idx[i++];
            }
        }
        while (i <= mid) {
            counts[idx[i]] += rightCount;
            merged[k++] = idx[i++];
        }
        while (j <= hi) merged[k++] = idx[j++];

        for (int k = lo; k <= hi; k++) idx[k] = merged[k - lo];
    }

public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        counts.assign(n, 0);
        vector<int> idx(n);
        for (int i = 0; i < n; i++) idx[i] = i;

        mergeSort(idx, nums, 0, n - 1);
        return counts;
    }
};
```

### Complexity
- **Time Complexity:** O(N log N) where $N$ is the number of elements in `nums`. The merge sort recursion tree has depth O(log N), and combining the halves at each level takes O(N) time with two pointers.
- **Space Complexity:** O(N) auxiliary space for the `idx` array and the temporary `merged` buffer, plus O(log N) for the recursion call stack.

### Relation to [Count Inversions](../01-arrays-hashing/27-count-inversions.md)
Both problems use the exact same merge step, just aggregated differently:
- **Count Inversions** wants a single total, so each merge step adds `rightCount` (or `mid - i + 1`) into one running `count` whenever a left element is placed.
- **Count Smaller After Self** wants a per-element breakdown, so instead of summing into one variable, `rightCount` is added into `counts[idx[i]]` for the specific left element being placed — that's why we sort an index array instead of the values directly, so each count can be mapped back to its original position after the array gets reordered by the sort.

### Relation to [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/description/)
Reverse Pairs counts pairs `i < j` where `nums[i] > 2 * nums[j]` — same merge-sort-counting family, but the counting condition no longer matches the merge condition (`nums[i] <= nums[j]`), so a single two-pointer pass can't do both jobs at once like it does here. The fix is to split counting and merging into two separate passes over the same sorted halves: first a counting loop with its own two pointers (advancing monotonically since both halves are already sorted) that tallies pairs satisfying `nums[i] > 2LL * nums[j]` (cast to `long long` to avoid overflow), *then* the normal merge loop to combine the halves.

```cpp
class Solution {
    int mergeSort(vector<int>& nums, int lo, int hi) {
        if (lo >= hi) return 0;
        int mid = lo + (hi - lo) / 2;
        int count = mergeSort(nums, lo, mid) + mergeSort(nums, mid + 1, hi);

        // counting pass: separate from merging since the condition (>2x) differs from merge order (<=)
        int j = mid + 1;
        for (int i = lo; i <= mid; i++) {
            while (j <= hi && nums[i] > 2LL * nums[j]) j++;
            count += j - (mid + 1);
        }

        // merging pass: standard merge sort combine
        vector<int> merged(hi - lo + 1);
        int i = lo, k = 0;
        j = mid + 1;
        while (i <= mid && j <= hi) {
            if (nums[i] <= nums[j]) merged[k++] = nums[i++];
            else merged[k++] = nums[j++];
        }
        while (i <= mid) merged[k++] = nums[i++];
        while (j <= hi) merged[k++] = nums[j++];

        for (int p = lo; p <= hi; p++) nums[p] = merged[p - lo];
        return count;
    }

public:
    int reversePairs(vector<int>& nums) {
        return mergeSort(nums, 0, nums.size() - 1);
    }
};
```
