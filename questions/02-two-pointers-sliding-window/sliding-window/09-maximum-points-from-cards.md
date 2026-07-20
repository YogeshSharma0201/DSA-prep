# Maximum Points You Can Obtain from Cards

**Link:** https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards

## Problem
Given an array cardPoints and integer k, you can pick exactly k cards from either the leftmost or rightmost end of the row in any combination. Return the maximum score (sum) you can obtain. You must pick exactly k cards.

## Solution
Instead of maximizing the k cards taken from ends, minimize the subarray of size (n - k) left in the middle. Compute the total sum, then use a sliding window of size n - k to find the minimum subarray sum. The answer is totalSum - minWindowSum. This works because whatever is not in the middle window must have been taken from the ends.

## Code
```cpp
int maxScore(vector<int>& cardPoints, int k) {
    int n = cardPoints.size();
    int total = accumulate(cardPoints.begin(), cardPoints.end(), 0);
    int winSize = n - k;

    if (winSize == 0) return total;

    int winSum = 0;
    for (int i = 0; i < winSize; i++) winSum += cardPoints[i];

    int minWin = winSum;
    for (int i = winSize; i < n; i++) {
        winSum += cardPoints[i] - cardPoints[i - winSize];
        minWin = min(minWin, winSum);
    }

    return total - minWin;
}
```
