# Lemonade Change

**Link:** https://leetcode.com/problems/lemonade-change/

## Problem
At a lemonade stand, each lemonade costs $5. Customers pay with $5, $10, or $20 bills. You must give back the correct change. Given the bills array representing the order customers arrive, return whether you can provide change to every customer.

## Solution
Greedy: track the count of $5 and $10 bills on hand. For a $10 bill: give one $5 as change. For a $20 bill: prefer to give one $10 + one $5 (saves $5 bills for future $10 customers); if no $10, give three $5s. If you can't make change, return false.

## Code
```cpp
bool lemonadeChange(vector<int>& bills) {
    int five = 0, ten = 0;
    for (int bill : bills) {
        if (bill == 5) {
            five++;
        } else if (bill == 10) {
            if (!five) return false;
            five--; ten++;
        } else { // bill == 20
            if (ten && five) { ten--; five--; }
            else if (five >= 3) five -= 3;
            else return false;
        }
    }
    return true;
}
```
