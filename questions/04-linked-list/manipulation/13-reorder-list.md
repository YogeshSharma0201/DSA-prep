# Reorder List

**Link:** https://leetcode.com/problems/reorder-list/

## Problem
You are given the head of a singly linked-list. The list can be represented as:
`L0 → L1 → … → Ln - 1 → Ln`

Reorder the list to be on the following form:
`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

## Solution
1. **Find the middle of the list:** Use the slow and fast pointer approach. The slow pointer will end up at the middle of the list.
2. **Reverse the second half:** Reverse the list starting from the node after the middle node in-place.
3. **Split the list:** Set `slow->next = nullptr` to disconnect the first half from the second half.
4. **Merge the two halves:** Merge the first half and the reversed second half by alternating nodes between them.

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
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        while(head) {
            ListNode* tem = head->next;
            head->next = prev;
            prev = head;
            head = tem;
        }

        return prev;
    }

    void reorderList(ListNode* head) {
        ListNode* slow = head, *fast = head;

        while(fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* rhead = reverseList(slow->next);
        slow->next = nullptr;

        ListNode* d = new ListNode();
        ListNode* dummy = d;

        bool flag = true;
        while(head!=nullptr || rhead!=nullptr) {
            if((flag && head!=nullptr)|| rhead==nullptr) {
                dummy->next = head;
                head=head->next;
            }
            else {
                dummy->next = rhead;
                rhead=rhead->next;
            }
            dummy = dummy->next;
            flag ^= 1;
        }
    }
};
```
