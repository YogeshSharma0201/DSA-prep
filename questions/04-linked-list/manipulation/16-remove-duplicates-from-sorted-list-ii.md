# Remove Duplicates from Sorted List II

**Link:** https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/

## Problem
Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

## Solution
Use a dummy head and pointer manipulation:
1. Create a dummy node pointing to `head` (`dummy->next = head`) to easily handle cases where the head itself has duplicates and needs to be deleted.
2. Maintain a pointer `curr` initialized to `dummy`.
3. Check if the upcoming nodes `curr->next` and `curr->next->next` have identical values:
   - If duplicates are detected, record the duplicate value `valTod` and continuously bypass nodes (`curr->next = curr->next->next`) as long as `curr->next` has value equal to `valTod`.
   - If no duplicates are detected, move `curr` forward (`curr = curr->next`).
4. Return `dummy->next`.

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
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        ListNode* curr = dummy;

        while(curr != NULL) {
            while(curr->next && curr->next->next && curr->next->val == curr->next->next->val) {
                int valTod = curr->next->val;
                while(curr->next != NULL && curr->next->val == valTod) {
                    curr->next = curr->next->next;
                }
            }
            curr = curr->next;
        }

        return dummy->next;
    }
};
```
