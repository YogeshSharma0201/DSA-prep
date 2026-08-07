# Odd Even Linked List

**Link:** https://leetcode.com/problems/odd-even-linked-list/

## Problem
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in $O(1)$ extra space complexity and $O(n)$ time complexity.

## Solution
We can rearrange the linked list in-place by dividing it into two lists—one for odd-indexed nodes and another for even-indexed nodes—and then joining them together:
1. **Pointers initialization:**
   - Keep track of the first node (start of the odd-indexed list).
   - Keep track of the second node (start of the even-indexed list) to link it to the end of the odd-indexed list later.
2. **Rearrange in-place:**
   - Iterate through the list, alternately linking odd nodes to odd nodes and even nodes to even nodes.
3. **Re-connection:**
   - Link the last node of the odd list to the head of the even list.

## Code
*(Note: In the code below, `even` is used to trace odd-indexed nodes and `odd`/`_odd` is used to trace even-indexed nodes).*

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if(head == nullptr || head->next == nullptr) return head;
        ListNode* even = head, *odd = head->next;
        ListNode *_odd = head->next;

        while(odd != nullptr && odd->next != nullptr) {
            even->next = odd->next;
            even = even->next;

            odd->next = even->next;
            odd = odd->next;
        }

        even->next = _odd;

        return head;
    }
};
```
