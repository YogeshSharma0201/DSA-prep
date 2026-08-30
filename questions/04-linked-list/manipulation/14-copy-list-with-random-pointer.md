# Copy List with Random Pointer

**Link:** https://leetcode.com/problems/copy-list-with-random-pointer/

## Problem
A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a deep copy of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

Return the head of the copied linked list.

## Solution
This approach works in O(n) time and O(1) extra space (excluding the space for the copied list nodes themselves):
1. **Create copy nodes and interweave them:** Traverse the original list and insert a copy of each node immediately following its original node.
   - E.g., `A -> B -> C` becomes `A -> A' -> B -> B' -> C -> C'`.
2. **Assign random pointers:** Traverse the interweave list. The copy node's random pointer can be resolved directly from the original node's random pointer.
   - If `head->random` is not null, `head->next->random = head->random->next`.
3. **Separate the lists:** Restore the original list and extract the copied list by decoupling the interleaved pointers.

## Code
```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(head == NULL) return head;
        
        Node* tmp = head;
        while(head!=NULL) {
            Node* node = new Node(head->val);
            
            node->next = head->next;
            head->next = node;
            head = node->next;
        }
        
        head = tmp;
        
        while(head!=NULL) {
            if(head->random != NULL)
                head->next->random = head->random->next;
            head = head->next->next; 
        }
        
        head = tmp;
        Node* copy = head->next;
        tmp = copy;
        
        while(head!=NULL) {
            head->next = head->next->next;
            if(copy->next != NULL) {
                copy->next = copy->next->next;
            }
            head = head->next;
            copy = copy->next;
        }
        
        return tmp;
    }
};
```
