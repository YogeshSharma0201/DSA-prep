# Merge K Sorted Lists

**Link:** https://leetcode.com/problems/merge-k-sorted-lists

## Problem
Given an array of `k` linked lists, each sorted in ascending order, merge all the lists into one sorted linked list and return its head. The result must contain all nodes from the input lists.

## Solution
Use a min-heap (priority queue) seeded with the head node of every non-null list. Each step extracts the globally smallest node, appends it to the result, and pushes that node's next pointer into the heap if it exists. This runs in O(N log k) time where N is the total number of nodes.

## Code
```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> minHeap(cmp);

        for(ListNode* node : lists) {
            if(node) minHeap.push(node);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while(!minHeap.empty()) {
            ListNode* node = minHeap.top();
            minHeap.pop();
            tail->next = node;
            tail = tail->next;
            if(node->next) minHeap.push(node->next);
        }

        return dummy.next;
    }
};
```
