# Remove Nth Node From End of List

**Link:** https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## Problem
Given the head of a linked list, remove the \(n^{\text{th}}\) node from the end of the list and return its head.

## Solution
Use a two-pointer approach (slow and fast pointers):
1. Move the `fast` pointer `n` nodes ahead.
2. If `fast` becomes `nullptr` immediately after this, it means we need to remove the head node itself, so we return `head->next`.
3. Otherwise, move both `slow` and `fast` pointers forward one node at a time until `fast->next` is `nullptr`. At this point, `slow` will be pointing to the node right before the one to be deleted.
4. Delete the target node by setting `slow->next = slow->next->next`.
5. Return the `head` of the modified list.

This approach runs in \(O(N)\) time with \(O(1)\) extra space, making only a single pass.

## Code
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* slow, *fast;
        slow = fast = head;

        while(n--) {
            fast = fast->next;
        }

        if(fast==nullptr) {
            return head->next;
        }

        while(fast->next!=nullptr) {
            slow = slow->next;
            fast = fast->next;
        }

        slow->next = slow->next->next;
        
        return head;
    }
};
```
