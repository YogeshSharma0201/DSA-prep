# Russian Doll Envelopes

**Link:** https://leetcode.com/problems/russian-doll-envelopes

## Problem
Given envelopes `[w, h]`, find the maximum number you can nest (Russian doll style) where both width and height of the inner envelope must be strictly less than the outer one.

## Solution
This is a 2D variant of LIS. The key insight: **reduce 2D to 1D** by sorting, then run LIS on heights.

**Sort:** increasing width; for equal widths, decreasing height.  
**Then:** find LIS on the heights array.

**Why decreasing height for equal widths?**  
Equal-width envelopes can never be nested, so we must ensure at most one of them contributes to the LIS. By sorting heights in decreasing order for the same width, the LIS algorithm can never pick two heights from the same width group (since they are strictly decreasing, `lower_bound` replaces rather than extends).

**Example:** `[[3,5],[6,7],[6,10],[7,11],[7,13],[8,4]]`

After sort (equal widths → height descending):
```
[[3,5], [6,10], [6,7], [7,13], [7,11], [8,4]]
heights: [5, 10, 7, 13, 11, 4]
```
LIS on heights: `[5, 10, 13]` → length **3** (pairs: `[3,5]→[6,10]→[7,13]`).

Without the trick, width=6 or width=7 could be counted twice, giving a wrong answer.

## Code
```cpp
int maxEnvelopes(vector<vector<int>>& envelopes) {
    sort(envelopes.begin(), envelopes.end(), [](vector<int>& a, vector<int>& b) {
        return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
    });

    // LIS on heights
    vector<int> lis;
    lis.push_back(envelopes[0][1]);
    for(int i=1; i<(int)envelopes.size(); i++) {
        int h = envelopes[i][1];
        if(lis.back() < h) {
            lis.push_back(h);
        }
        else {
            int idx = lower_bound(lis.begin(), lis.end(), h) - lis.begin();
            lis[idx] = h;
        }
    }
    return lis.size();
}
```
