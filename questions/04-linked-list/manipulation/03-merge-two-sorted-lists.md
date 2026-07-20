# Merge Two Sorted Lists

**Link:** https://leetcode.com/problems/merge-two-sorted-lists/

## Problem
Given the heads of two sorted linked lists `list1` and `list2`, merge them into one sorted linked list and return its head. The merged list should be made by splicing together the nodes of the two input lists.

## Solution
Create a dummy head node to simplify edge cases. Iterate through both lists simultaneously, always attaching the smaller current node to the result and advancing that list's pointer. After one list is exhausted, directly attach the remaining tail of the other list.

## Code
```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode* head = new ListNode(0);
    ListNode* head1 = head;

    while(list1 != nullptr && list2 != nullptr) {
        if(list1->val < list2->val) {
            head->next = list1;
            list1 = list1->next;
        }
        else {
            head->next = list2;
            list2 = list2->next;
        }
        head = head->next;
    }

    if(list1 != nullptr) { // don't need to iterate here like in merge sort with arrays
        head->next = list1;
    }
    else {
        head->next = list2;
    }

    return head1->next;
}
```

## Alternative Solution (Recursive)
Recursively pick the smaller head node and let the recursion handle the rest of the merge.

```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    if(list1==nullptr) return list2;
    if(list2==nullptr) return list1;

    if(list1->val <= list2->val) {
        list1->next = mergeTwoLists(list1->next, list2);
        return list1;
    }
    else {
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
}
```
