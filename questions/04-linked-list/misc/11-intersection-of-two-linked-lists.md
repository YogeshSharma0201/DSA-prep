# Intersection of Two Linked Lists

**Link:** https://leetcode.com/problems/intersection-of-two-linked-lists/

## Problem
Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.

## Solution
Use a two-pointer approach:
1. Initialize `temp1` at `headA` and `temp2` at `headB`.
2. Traverse the lists. When `temp1` reaches the end of list A (i.e., `nullptr`), redirect it to `headB`. Similarly, when `temp2` reaches the end of list B, redirect it to `headA`.
3. If they intersect, they will meet at the intersection point because both pointers will traverse an equal distance (length of A + length of B).
4. If they do not intersect, they will both end up at `nullptr` at the same time after redirecting, terminating the loop.

This approach runs in \(O(M + N)\) time complexity and \(O(1)\) auxiliary space.

## Code
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode* temp1 = headA, *temp2 = headB;

        if(temp1 == NULL || temp2 == NULL) return NULL;

        // Note: When they don't intersect then 
        // they both will eventually end at NULL
        // The distance covered by them is same which will be 
        // equal to sum of listA + listB
        while(temp1 != temp2) {
            if(temp1 == NULL) {
                temp1 = headB;
            }
            else {
                temp1 = temp1->next;
            }
            if(temp2 == NULL) {
                temp2 = headA;
            }
            else {
                temp2 = temp2->next;
            }
        }

        return temp1;
    }
};
```
