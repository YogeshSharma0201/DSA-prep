# Stock Span Problem

**Link:** https://leetcode.com/problems/online-stock-span

## Problem
Design a class that collects daily stock prices and returns the span of the stock's price for the current day. The span is the number of consecutive days (including today) where the price was less than or equal to today's price.

## Solution
Use a monotonic stack storing (price, span) pairs. For each new price, pop all stack elements with prices <= current price, accumulating their spans. Push the current price with the accumulated span + 1. The span is what we accumulated.

## Code
```cpp
class StockSpanner {
    stack<pair<int,int>> st; // (price, span)
public:
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};
```
