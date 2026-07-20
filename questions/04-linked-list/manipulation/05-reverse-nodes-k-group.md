# Reverse Nodes in K-Group

**Link:** https://leetcode.com/problems/reverse-nodes-in-k-group/

## Problem
Given the head of a linked list, reverse the nodes of the list `k` at a time and return the modified list. If the number of remaining nodes is not a multiple of `k`, leave them as is. Only the nodes themselves may be changed, not their values.

## Solution
Count k nodes ahead to ensure a full group exists, then recursively call on the remainder to get the next group's head. Reverse the current k nodes using a helper that wires them into reverse order with `nextgroup` as the new tail. If fewer than k nodes remain the original head is returned unchanged.

## Code
```cpp
ListNode* reverseGroup(ListNode* head, int k, ListNode* prev) {
    while(head != nullptr && k-- > 0) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

ListNode* reverseKGroup(ListNode* head, int k) {
    if(head == nullptr) return nullptr;
    ListNode* curr = head;

    int c = k;
    while(curr != nullptr && c-- > 0) {
        curr = curr->next;
    }
    ListNode* nextgroup = reverseKGroup(curr, k);

    if(c <= 0) return reverseGroup(head, k, nextgroup);
    return head;
}
```
