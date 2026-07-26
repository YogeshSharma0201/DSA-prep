# Add Two Numbers

**Link:** https://leetcode.com/problems/add-two-numbers/

## Problem
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## Solution
Use a recursive approach (or iterative simulation of addition):
1. Create a helper function `addNumbers` that takes the current nodes of both lists (`l1` and `l2`) along with the `carry` from the previous addition.
2. The base case is when `l1` is `nullptr`, `l2` is `nullptr`, and `carry` is `0`, in which case we return `nullptr`.
3. Compute the sum: `sum = val1 + val2 + carry` (using `0` if a node is `nullptr`).
4. Calculate the new `carry` as `sum / 10` and the digit for the current node as `sum % 10`.
5. Create a new node with `sum % 10`.
6. Set the `next` pointer of this new node to the result of recursively calling `addNumbers` with the next nodes of the lists and the new `carry`.
7. Return the new node.

This runs in \(O(\max(M, N))\) time complexity and \(O(\max(M, N))\) stack space for recursion.

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
    ListNode* addNumbers(ListNode* l1, ListNode* l2, int carry) {
        if(carry == 0 && l1==NULL && l2==NULL) return NULL;

        int sum  = (l1==NULL ? 0:l1->val) + (l2==NULL ? 0:l2->val) + carry;

        carry = sum/10;
        ListNode* newNode = new ListNode(sum%10);
        newNode->next = addNumbers(
            l1==NULL?NULL:l1->next,
            l2==NULL?NULL:l2->next,
            carry);

        return newNode;
    }

    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* n = addNumbers(l1,l2,0);

        return n;
    }
};
```
