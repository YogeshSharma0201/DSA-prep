# Koko Eating Bananas

**Link:** https://leetcode.com/problems/koko-eating-bananas/

## Problem
Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

## Solution
This is a classic "Binary Search on Answer" problem:
1. **Range of Eating Speed ($k$):**
   - Minimum possible eating speed is $1$ (she must eat at least 1 banana per hour).
   - Maximum possible eating speed is $10^9$ (or $10^9 + 1$).
2. **Binary Search Mechanism:**
   - We binary search in the range `[1, 10^9]`.
   - For each speed `mid`, we calculate the total hours needed to finish all piles at this speed.
   - **Crucial Rule:** Koko eats only **one pile at a time**. Therefore, if a pile has `p` bananas, it will take $\lceil p / k \rceil$ hours to finish it.
   - If the total hours needed is less than or equal to `h`, `mid` is a valid speed. We try to find a smaller speed by moving the right boundary: `r = mid`.
   - If the total hours needed exceeds `h`, the speed `mid` is too slow. We must increase the speed: `l = mid + 1`.

## Code
```cpp
class Solution {
public:
    // Lot of time wasted in this question as 
    // it mention that koko eats some "pile" each time
    // and I misunderstood it as some "piles"
    // eat only one pile at a time
    // question should have said eat "a pile"
    int canEat(vector<int>& piles, int k) {
        int count = 0;
        for(int i=0; i<piles.size(); i++) {
            count += (piles[i]+k-1)/k;
        }
        return count;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1, r = (int)1e9+1;

        while(l<r) {
            int mid = (l+r) >> 1;

            if(canEat(piles, mid) > h) {
                l = mid+1;
            }
            else {
                r = mid;
            }
        }

        return l;
    }
};
```
