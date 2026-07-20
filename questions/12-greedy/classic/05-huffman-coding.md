# Huffman Coding

**Link:** https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/

## Problem
Given characters and their frequencies, build a Huffman tree and assign prefix codes to minimize the total encoding length. Return the minimum number of bits needed to encode the data.

## Solution
Use a min-heap of (frequency, node) pairs. Repeatedly extract the two smallest-frequency nodes, combine them into a new node whose frequency is their sum, and push it back. Repeat until one node remains (the root). The Huffman code length for a character equals its depth in the tree.

## Code
```cpp
struct HNode {
    int freq;
    HNode *left, *right;
    HNode(int f) : freq(f), left(nullptr), right(nullptr) {}
};

int huffmanCodes(vector<char>& chars, vector<int>& freq, int n) {
    auto cmp = [](HNode* a, HNode* b) { return a->freq > b->freq; };
    priority_queue<HNode*, vector<HNode*>, decltype(cmp)> pq(cmp);
    for (int i = 0; i < n; i++) pq.push(new HNode(freq[i]));

    while (pq.size() > 1) {
        HNode* l = pq.top(); pq.pop();
        HNode* r = pq.top(); pq.pop();
        HNode* merged = new HNode(l->freq + r->freq);
        merged->left = l; merged->right = r;
        pq.push(merged);
    }

    // Calculate total bits via DFS
    function<int(HNode*, int)> calcBits = [&](HNode* node, int depth) -> int {
        if (!node->left && !node->right) return node->freq * depth;
        return calcBits(node->left, depth+1) + calcBits(node->right, depth+1);
    };
    return calcBits(pq.top(), 0);
}
```
