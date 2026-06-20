# Longest Palindromic Substring

**Link:** https://leetcode.com/problems/longest-palindromic-substring

## Problem
Given a string s, find and return the longest substring that is a palindrome. A palindrome reads the same forwards and backwards. If there are multiple answers of the same length, return any one of them.

## Solution
Expand around center: for each index, treat it as the center of an odd-length palindrome and also treat the gap between it and the next character as the center of an even-length palindrome. Expand outward while characters match, record the length. Track start and end indices of the longest palindrome found. This runs in O(n^2) time and O(1) space.

## Code
```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";

        int start = 0, end = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            int odd  = expandAroundCenter(s, i, i);
            int even = expandAroundCenter(s, i, i + 1);
            int max_len = max(odd, even);

            if (max_len > end - start) {
                start = i - (max_len - 1) / 2;
                end   = i + max_len / 2;
            }
        }

        return s.substr(start, end - start + 1);
    }

private:
    int expandAroundCenter(string s, int left, int right) {
        while (left >= 0 && right < (int)s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};
```

---

## Manacher's Algorithm — O(n)

### Idea

When you find a palindrome centered at `c` with right boundary `r`, any character `i` inside that palindrome has a **mirror** at `2c - i`. The palindrome radius at `i` is at least as large as its mirror's radius — unless the mirror's palindrome extends past the left boundary. This lets you skip recomputation.

### Step 1: Transform the String

Insert `#` between every character to unify odd/even palindromes:

```
s  =  "abacaba"
t  =  "#a#b#a#c#a#b#a#"
```

Now every palindrome in `t` has odd length, centered on either a real character or a `#`.

### Step 2: Build the `p` Array

`p[i]` = radius of the longest palindrome centered at index `i` in `t`.

```
t:  # a # b # a # c # a # b # a #
p:  0 1 0 3 0 5 0 7 0 5 0 3 0 1 0
```

`p[7] = 7` means the palindrome extends 7 steps in both directions → the full string `"abacaba"`.

### Step 3: The Mirror Trick

Maintain `c` (center of rightmost-reaching palindrome so far) and `r` (its right boundary).

```
for each i:
    mirror = 2*c - i

    if i < r:
        p[i] = min(r - i, p[mirror])   // can't go past r without checking

    // try to expand further
    expand p[i] while t[i - p[i] - 1] == t[i + p[i] + 1]

    if i + p[i] > r:                   // new rightmost palindrome found
        c = i
        r = i + p[i]
```

Two cases for `min(r - i, p[mirror])`:

- **Mirror fits inside boundary**: `p[mirror] < r - i` → `p[i] = p[mirror]`, no expansion needed.
- **Mirror hits/crosses boundary**: `p[mirror] >= r - i` → `p[i] = r - i`, must expand from there.

Each character is expanded at most once across the entire run because `r` only moves right — that's the O(n) guarantee.

### Worked Example

`s = "babad"`, `t = "#b#a#b#a#d#"`

```
index:  0  1  2  3  4  5  6  7  8  9  10
t:      #  b  #  a  #  b  #  a  #  d  #
p:      0  1  0  3  0  3  0  1  0  1  0
```

- `i=3` (`a`): expand fresh → `p[3]=3`, set `c=3, r=6`
- `i=5` (`b`): mirror=1, `p[1]=1`, `r-i=1` → `p[5]=min(1,1)=1`. Expand: matches `a,#,b` → `p[5]=3`, update `c=5, r=8`
- `i=7` (`a`): mirror=3, `p[3]=3`, `r-i=1` → `p[7]=min(3,1)=1`. Expand: `t[5]='b'` vs `t[9]='d'` → no match.

Max `p[i]=3` at index 3 or 5:
```
start = (3 - 3) / 2 = 0  → "bab"
start = (5 - 3) / 2 = 1  → "aba"
```

Both valid. Conversion formula: `original_start = (center - p[center]) / 2`, `length = p[center]`.

### Code

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        string t = "#";
        for (char c : s) { t += c; t += '#'; }
        int n = t.size();
        vector<int> p(n, 0);
        int c = 0, r = 0;

        for (int i = 0; i < n; i++) {
            int mirror = 2 * c - i;
            if (i < r) p[i] = min(r - i, p[mirror]);

            while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] == t[i - p[i] - 1])
                p[i]++;

            if (i + p[i] > r) { c = i; r = i + p[i]; }
        }

        int maxLen = 0, center = 0;
        for (int i = 0; i < n; i++) {
            if (p[i] > maxLen) { maxLen = p[i]; center = i; }
        }

        return s.substr((center - maxLen) / 2, maxLen);
    }
};
```

### Complexity

| | Time | Space |
|---|---|---|
| Expand around center | O(n²) | O(1) |
| Manacher's | O(n) | O(n) |
