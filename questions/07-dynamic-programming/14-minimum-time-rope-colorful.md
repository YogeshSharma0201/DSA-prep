# Minimum Time to Make Rope Colorful

**Link:** https://leetcode.com/problems/minimum-time-to-make-rope-colorful/

## Problem
A rope has balloons attached, each with a color given by string colors and a removal time given by neededTime. Remove the minimum total time worth of balloons so that no two adjacent balloons share the same color. You want to keep the most expensive balloon in each consecutive same-color group.

## Solution
Iterate through the array tracking two accumulators: `a` = cost to keep current group's best balloon (sum so far minus max seen), and `b` = minimum removal cost up to previous group. When colors[i] == colors[i-1], update b = min(a, b + neededTime[i]) and a = a + neededTime[i]. Otherwise a = b + neededTime[i]. The image shows this two-variable DP where `b` carries the running answer.

## Code
```cpp
int minCost(string colors, vector<int>& neededTime) {
    int a = neededTime[0], b = 0;
    for (int i = 1; i < (int)colors.size(); i++) {
        int p = a;
        if (i > 0 && colors[i] == colors[i-1]) {
            b = min(a, b + neededTime[i]); // choice between keeping previous or current
            a = a + neededTime[i];         // add to give choice to next index
        } else {
            a = b + neededTime[i];
        }
    }
    return b;
}
```
