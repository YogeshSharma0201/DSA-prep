# Linked List Cycle II

**Link:** https://leetcode.com/problems/linked-list-cycle-ii/

## Problem
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`. The solution must use O(1) memory without modifying the list.

## Solution
Use Floyd's cycle detection: advance a slow pointer one step and a fast pointer two steps until they meet inside the cycle (or confirm no cycle). Once they meet, reset one pointer back to `head` and advance both one step at a time — they will meet exactly at the cycle's entry node due to the mathematical property of the algorithm.

## Mathematical Proof
Let:
- $a$ = distance from `head` to the entry point of the cycle.
- $c$ = length of the cycle.
- $x$ = distance from the entry point of the cycle to the meeting point of `slow` and `fast`.

When the two pointers meet:
- Distance traveled by `slow` = $a + x$ *(since `slow` is guaranteed to meet `fast` before completing its first full loop of the cycle)*.
- Distance traveled by `fast` = $a + k \cdot c + x$, where $k \ge 1$ is the number of complete loops `fast` has made around the cycle.

Since `fast` travels at twice the speed of `slow`:
$$a + k \cdot c + x = 2(a + x)$$
$$a + k \cdot c + x = 2a + 2x$$
$$k \cdot c = a + x$$
$$a = k \cdot c - x$$

Rewriting this relation:
$$a = (k - 1)c + (c - x)$$

### Interpretation:
- Walking $a$ steps from the `head` brings us to the entry point of the cycle.
- Walking the same $a$ steps from the meeting point (which is distance $x$ from the entry point) means making $(k - 1)$ full loops around the cycle plus an additional $c - x$ steps. Since $c - x$ is the exact remaining distance to the entry point, this also lands us exactly at the entry point.
- Therefore, if we reset one pointer back to `head` and advance both pointers one step at a time, they are guaranteed to meet exactly at the cycle's entry point.

## Code
```cpp
ListNode *detectCycle(ListNode *head) {
    ListNode* slow = head, *fast = head;
    
    // For cycle detetion, always make sure to start both slow and fast at the same position
    // Otherwise you will be able to detect the cycle but the distance of head to cycle start
    // will not be equal to cycle start and first intersection of slow and fast
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
