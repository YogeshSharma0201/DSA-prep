# String Encode and Decode

**Link:** https://neetcode.io/problems/string-encode-and-decode/

## Problem
Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.

## Solution
Use a length-based prefix. For each string in the list, encode it as `[length]#[string]`. During decoding:
1. Read the length until the `#` character is encountered.
2. Read the next `length` characters as the string.
3. Repeat until the end of the encoded string.

*Note: In the code below, the encoding logic appends `length + 1` and `#` to include safety boundary offsets.*

## Code
```cpp
class Solution {
public:
    bool isdigit(char a) {
        if (a >= '0' && a <= '9') return true;
        return false;
    }
    
    string encode(vector<string>& strs) {
        string res = "";
        for (int i = 0; i < strs.size(); i++) {
            res += to_string(strs[i].size());
            res += "#" + strs[i];
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;

        int i = 0;
        while (i < s.size()) {
            int sz = 0;
            while (isdigit(s[i])) {
                sz *= 10;
                sz += s[i++] - '0';
            }

            string str = "";
            i++;
            while (sz-- > 0) {
                str += s[i++];
            }
            res.push_back(str);
        }

        return res;
    }
};
```
