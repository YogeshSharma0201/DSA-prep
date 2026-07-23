# Time Needed to Buy Tickets

**Link:** https://leetcode.com/problems/time-needed-to-buy-tickets/

## Problem
There are n people in a queue buying tickets. Person i wants to buy tickets[i] tickets. Each second, the person at the front buys one ticket and goes to the back if they still need more. Find the total time until person k has bought all their tickets.
## Solution
No simulation needed. For each person `i`, if `i < k` they contribute at most `tickets[k]` tickets. Once we process person `k` (adding `tickets[k]`), we decrement our target limit `num` to `tickets[k] - 1` because people after `k` (`i > k`) will be served at most `tickets[k] - 1` times before `k` finishes.

## Code
```cpp
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int ret = 0;
        int num = tickets[k];
        for (int i = 0; i < tickets.size(); i++) {
            if (i < k) {
                ret += min(num, tickets[i]);
            }
            else if (i == k) {
                ret += num;
                num--;
            }
            else {
                ret += min(num, tickets[i]);
            }
        }
        return ret;
    }
};
```
