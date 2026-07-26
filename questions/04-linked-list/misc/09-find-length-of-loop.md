# Find Length of Loop

**Link:** https://www.geeksforgeeks.org/problems/find-length-of-loop/1

## Problem
Given the head of a linked list, determine whether the list contains a loop (cycle). If a loop is present, return the number of nodes in the loop; otherwise, return `0`.

## Solution
Use Floyd's cycle-finding algorithm (slow and fast pointers):
1. Initialize both `slow` and `fast` pointers at the `head`.
2. Move `slow` by one step and `fast` by two steps.
3. If they meet, a loop exists.
4. To find the length of the loop, advance `slow` to its next node and keep `fast` at the meeting point. Traverse the loop with `slow` one step at a time, incrementing the counter, until `slow` meets `fast` again.
5. If `fast` or `fast->next` becomes `NULL`, there is no loop, so return `0`.

## Code
```cpp
/*
class Node {
 public:
    int data;
    Node *next;

    Node(int x) {
        data = x;
        next = NULL;
    }
};
*/

class Solution {
  public:
    int lengthOfLoop(Node *head) {
        // code here
        Node* slow, *fast;
        
        slow = fast = head;
        
        int count = 1;
        
        while(fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
            
            if(slow==fast) {
                break;
            }
        }
        
        if(fast == NULL || fast->next == NULL) return 0;
        
        
        slow = slow->next;
        while(slow != fast) {
            slow = slow->next;
            count++;
        }
        
        return count;
    }
};
```
