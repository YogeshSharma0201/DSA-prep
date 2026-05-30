# Time Needed to Buy Tickets

**Link:** https://leetcode.com/problems/time-needed-to-buy-tickets/

## Problem
There are n people in a queue buying tickets. Person i wants to buy tickets[i] tickets. Each second, the person at the front buys one ticket and goes to the back if they still need more. Find the total time until person k has bought all their tickets.

## Solution
No simulation needed. For each person i, if i <= k they contribute min(tickets[k], tickets[i]) to the total time (they will be served at most tickets[k] times before k finishes). For i > k they contribute min(tickets[k] - 1, tickets[i]) because k finishes before they can complete their tickets[k]-th round. Sum all contributions.

## Code
```cpp
int timeRequiredToBuy(vector<int>& tickets, int k) {
    int ret = 0;
    int num = tickets[k];
    for (int i = 0; i < tickets.size(); i++) {
        if (i <= k) {
            ret += min(num, tickets[i]);
        } else if (i == k) {
            ret += num;
            num--;
        } else {
            ret += min(num, tickets[i]);
            if (num <= tickets[i]) {
                ret -= 1;
            }
        }
    }
    return ret;
}
```
