# Reverse Linked List II

**Link:** https://leetcode.com/problems/reverse-linked-list-ii/

## Problem
Given the head of a singly linked list and two integers `left` and `right`, reverse the nodes of the list from position `left` to position `right` and return the modified list. The reversal is done in a single pass. Positions are 1-indexed.

## Solution
Traverse the list to locate the node at position `left` (leftNode) and track the node just before it (prevLeftNode). Also record the node at position `right` (rightNode) and the node after it (afterRightNode). Reverse the sublist between leftNode and rightNode in-place by rewiring pointers. Finally reconnect prevLeftNode to the new head of the reversed segment and leftNode (now the tail) to afterRightNode.

## Code
```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* leftNode = head, *prevLeftNode = nullptr;
        ListNode* rightNode = head, *afterRightNode = head->next;
        ListNode* currNode = head;
        int idx = 1;
        while(currNode != nullptr) {
            if(idx == left) {
                leftNode = currNode;
            }
            else if(idx < left) {
                prevLeftNode = currNode;
            }

            if(idx == right) {
                rightNode = currNode;
                afterRightNode = currNode->next;
            }
            idx++;
            currNode = currNode->next;
        }

        currNode = leftNode;
        ListNode* prePtr = afterRightNode;
        while(currNode != afterRightNode) {
            ListNode* nextNode = currNode->next;
            currNode->next = prePtr;
            prePtr = currNode;
            currNode = nextNode;
        }

        if(prevLeftNode != nullptr) {
            prevLeftNode->next = prePtr;
        }

        if(left == 1) return rightNode;
        return head;
    }
};
```
