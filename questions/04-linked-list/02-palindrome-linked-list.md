# Palindrome Linked List

**Link:** https://leetcode.com/problems/palindrome-linked-list/

## Problem
Given the head of a singly linked list, return `true` if it is a palindrome or `false` otherwise. The solution must run in O(n) time and use O(1) extra space.

## Solution
Use slow and fast pointers to find the middle of the list. Reverse the second half of the list in-place starting from the slow pointer. Then walk both halves simultaneously, comparing values node by node — any mismatch means it is not a palindrome.

## Code
```cpp
bool isPalindrome(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while(fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode* prePtr = nullptr, *currNode = slow;
    while(currNode != nullptr) {
        ListNode* nextPtr = currNode->next;
        currNode->next = prePtr;
        prePtr = currNode;
        currNode = nextPtr;
    }

    while(head != nullptr && prePtr != nullptr) {
        if(head->val != prePtr->val) {
            return false;
        }
        head = head->next;
        prePtr = prePtr->next;
    }
    return true;
}
```
