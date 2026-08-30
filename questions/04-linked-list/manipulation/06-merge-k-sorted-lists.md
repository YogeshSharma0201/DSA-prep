# Merge K Sorted Lists

**Link:** https://leetcode.com/problems/merge-k-sorted-lists

## Problem
Given an array of `k` linked lists, each sorted in ascending order, merge all the lists into one sorted linked list and return its head. The result must contain all nodes from the input lists.

---

## Approach 1: Min-Heap / Priority Queue

### Explanation
Use a min-heap (priority queue) seeded with the head node of every non-null list. Each step extracts the globally smallest node, appends it to the result list, and pushes that node's `next` pointer into the heap if it exists. 

### Complexity
- **Time Complexity:** O(N log k) where $N$ is the total number of nodes across all lists and $k$ is the number of linked lists.
- **Space Complexity:** O(k) auxiliary space to store the heads of the $k$ lists in the heap.

### Code
```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> minHeap(cmp);

        for (ListNode* node : lists) {
            if (node) minHeap.push(node);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (!minHeap.empty()) {
            ListNode* node = minHeap.top();
            minHeap.pop();
            tail->next = node;
            tail = tail->next;
            if (node->next) minHeap.push(node->next);
        }

        return dummy.next;
    }
};
```

---

## Approach 2: Divide & Conquer / Pairwise Merge Sort (O(1) Space)

### Explanation
Instead of processing nodes one-by-one or merging lists sequentially (which would take O(N * k) time), merge pairs of lists iteratively using standard 2-list merge (`merge2Lists`):
1. Pair up $k$ lists and merge each pair (List 0 & List 1, List 2 & List 3, etc.).
2. After the first pass, $k$ lists are reduced to $\lceil k / 2 \rceil$ lists.
3. Repeat this pairwise merging iteratively until only 1 list remains.

Because there are $\lceil \log_2 k \rceil$ reduction passes and each pass processes $N$ total nodes, the overall time is O(N log k). Since we reuse list node pointers in-place iteratively, auxiliary space is optimal at O(1).

### Complexity
- **Time Complexity:** O(N log k) where $N$ is total nodes and $k$ is the number of lists.
- **Space Complexity:** O(1) auxiliary space (iterative in-place pointer adjustments).

### Code
```cpp
class Solution {
    ListNode* merge2Lists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (l1 && l2) {
            if (l1->val <= l2->val) {
                tail->next = l1;
                l1 = l1->next;
            } else {
                tail->next = l2;
                l2 = l2->next;
            }
            tail = tail->next;
        }
        tail->next = l1 ? l1 : l2;
        return dummy.next;
    }

public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr;

        int k = lists.size();
        while (k > 1) {
            int idx = 0;
            for (int i = 0; i < k; i += 2) {
                if (i + 1 < k) {
                    lists[idx++] = merge2Lists(lists[i], lists[i + 1]);
                } else {
                    lists[idx++] = lists[i];
                }
            }
            k = idx;
        }

        return lists[0];
    }
};
```

---

## Summary Comparison

| Approach | Time Complexity | Space Complexity | Key Feature |
| :--- | :---: | :---: | :--- |
| **Approach 1: Min-Heap** | O(N log k) | O(k) | Simple implementation with Priority Queue |
| **Approach 2: Divide & Conquer** | O(N log k) | O(1) | Optimal O(1) extra space using pairwise merging |
