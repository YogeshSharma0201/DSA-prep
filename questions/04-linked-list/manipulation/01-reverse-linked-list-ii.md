# Reverse Linked List II

**Link:** https://leetcode.com/problems/reverse-linked-list-ii/

## Problem
Given the head of a singly linked list and two integers `left` and `right`, reverse the nodes of the list from position `left` to position `right` and return the modified list. The reversal is done in a single pass. Positions are 1-indexed.

## Solution 1 — Locate, reverse, reconnect

Traverse to find `leftNode`, `prevLeftNode`, `rightNode`, and `afterRightNode`. Reverse the sublist in-place, then reconnect the boundaries.

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

---

## Solution 2 — Dummy node + insert-at-front (single pass)

Use a dummy node so `prev` always has a valid predecessor. Advance `prev` to the node just before `left`, set `curr` to the `left`-th node, then repeatedly pull the node after `curr` and insert it right after `prev`. `curr` stays fixed as the growing tail of the reversed segment.

### Dry run — `1 → 2 → 3 → 4 → 5`, left = 2, right = 4

**Setup**
```
dummy → 1 → 2 → 3 → 4 → 5
prev = dummy,  curr = dummy
```

**Loop 1** (`i < left-1`, runs once):
```
prev = prev->next  →  prev = [1]
curr = prev->next  →  curr = [2]
```

**Loop 2** (`i` = 2, 3):

| i | temp | curr->next = | temp->next = | prev->next = | List |
|---|------|--------------|--------------|--------------|------|
| 2 | [3]  | [4]          | [2]          | [3]          | dummy→1→**3→2**→4→5 |
| 3 | [4]  | [5]          | [3]          | [4]          | dummy→1→**4→3→2**→5 |

`prev` and `curr` never move in loop 2 — `curr` becomes the tail, each plucked node lands at the front.

**Result:** `dummy->next` → `1 → 4 → 3 → 2 → 5` ✓

```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;

        for (int i = 0; i < left - 1; i++)
            prev = prev->next;

        ListNode* curr = prev->next;
        for (int i = left; i < right; i++) {
            ListNode* temp = curr->next;
            curr->next = temp->next;
            temp->next = prev->next;
            prev->next = temp;
        }

        return dummy->next;
    }
};
```
