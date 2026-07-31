# Text Justification

**Link:** https://leetcode.com/problems/text-justification/

## Problem
Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly `maxWidth` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

## Solution
Use a greedy simulation approach. Process the words line by line:
1. Determine how many words can fit in the current line under the constraint that each word is separated by at least one space.
2. For each line:
   - Calculate the total spaces that need to be distributed (`maxWidth` minus the sum of lengths of the words in the line).
   - If it is the last line or a line with only one word, left-justify the text (i.e., one space between words, and pad the remaining spaces at the end of the line).
   - Otherwise, distribute the spaces as evenly as possible between the words. If they don't divide evenly, add one extra space to the gaps from left to right until all extra spaces are distributed.
3. Build the line string and append it to the result list.

## Code
```cpp
class Solution {
public:
    string intToSpace(int n) {
        string spaces = "";
        while(n-->0) {
            spaces.push_back(' ');
        }
        return spaces;
    }
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;

        int idx = 0;
        while(idx < words.size()) {
            int width = words[idx].size(), count = 1, i = idx;
            while(idx+1 < words.size()) {
                if(width + words[idx+1].size() + count > maxWidth) {
                    break;
                }
                else {
                    idx++;
                    width += words[idx].size();
                    count++;
                }
            }
            int spaces = maxWidth - width;
            int spacePerWord = 0;
            if(count>1) spacePerWord = spaces/(count-1);
            int leftSpaces = spaces - spacePerWord*(count-1);

            string str = "";
            while(i<words.size() && i<=idx) {
                str+=words[i];

                if(idx<words.size()-1) {
                    if(i<idx) {
                        str+=intToSpace(spacePerWord);
                        spaces -= spacePerWord;
                        if(leftSpaces--> 0) {
                            str.push_back(' ');
                            spaces--;
                        }
                    }
                }
                else {
                    if(i<idx) {
                        str+=intToSpace(1);
                        spaces--;
                    }
                }
                
                if(i == words.size()-1) {
                    str+=intToSpace(spaces);
                    spaces = 0;
                }
                i++;
            }
            if(spaces > 0) str+=intToSpace(spaces);
            res.push_back(str);
            idx++;
        }
        return res;
    }
};
```
