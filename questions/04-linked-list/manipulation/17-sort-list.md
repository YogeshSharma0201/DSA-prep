# Sort List

**Link:** https://leetcode.com/problems/sort-list/

## Problem
Given the `head` of a linked list, return the list after sorting it in **ascending order**.

## Solution
Use **Merge Sort** on the Linked List:
1. **Base Case:** If `head` is `nullptr` or `head->next` is `nullptr`, the list is already sorted; return `head`.
2. **Find Middle:** Use the fast and slow pointer technique to split the linked list into two halves. Keep track of `prev` to disconnect the first half (`prev->next = nullptr`).
3. **Divide:** Recursively call `sortList` on the left half (`head`) and right half (`slow`).
4. **Conquer / Merge:** Merge the two sorted linked lists using a helper function `mergeList`.

**Time Complexity:** \(O(N log N)\)  
**Space Complexity:** \(O(log N)\) recursion stack space

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
    ListNode* mergeList(ListNode* a, ListNode* b) {
        if(a==nullptr && b==nullptr) return a;
        if(a==nullptr) return b;
        if(b==nullptr) return a;

        if(a->val < b->val) {
            a->next = mergeList(a->next, b);
            return a;
        }
        else {
            b->next = mergeList(a, b->next);
            return b;
        }
    }
public:
    ListNode* sortList(ListNode* head) {
        if(head == nullptr || head->next == nullptr) return head;
        ListNode *slow = head, *fast = head, *prev = head; 

        while(fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* b = sortList(slow);
        prev->next = nullptr;
        ListNode* a = sortList(head);

        return mergeList(a, b);
    }
};
```
