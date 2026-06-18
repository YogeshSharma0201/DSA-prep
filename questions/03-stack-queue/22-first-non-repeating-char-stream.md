# First Non-Repeating Character in Stream

**Link:** https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1

## Problem
Given a stream of characters, for each character in the stream, find the first non-repeating character in the stream so far. If there is no non-repeating character, output '#'.

## Solution
Use a queue to track the order of characters and a frequency array. For each new character, increment its frequency. Then peek at the front of the queue: while the front character has frequency > 1 (repeating), remove it. The front of the queue (if any) is the first non-repeating character.

## Code
```cpp
string firstNonRepeating(string A) {
    int freq[26] = {0};
    queue<char> q;
    string result;
    for (char c : A) {
        freq[c - 'a']++;
        q.push(c);
        while (!q.empty() && freq[q.front() - 'a'] > 1) q.pop();
        result += q.empty() ? '#' : q.front();
    }
    return result;
}
```
