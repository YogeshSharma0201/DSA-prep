# Linked List Cycle II

**Link:** https://leetcode.com/problems/linked-list-cycle-ii/

## Problem
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`. The solution must use O(1) memory without modifying the list.

## Solution
Use Floyd's cycle detection: advance a slow pointer one step and a fast pointer two steps until they meet inside the cycle (or confirm no cycle). Once they meet, reset one pointer back to `head` and advance both one step at a time — they will meet exactly at the cycle's entry node due to the mathematical property of the algorithm.

## Code
```cpp
ListNode *detectCycle(ListNode *head) {
    ListNode* slow = head, *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if(fast == slow) break;
    }
    if(!(fast && fast->next)) return NULL;

    while(slow != head) {
        head = head->next;
        slow = slow->next;
    }

    return head;
}
```
