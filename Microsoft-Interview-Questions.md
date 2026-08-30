# 🪟 Microsoft SDE Interview — DSA Question Bank

> **Sources:** LeetCode company tags, GeeksForGeeks interview experiences, LeetCode Discuss, Reddit r/cscareerquestions, InterviewBit, Medium blogs (2023–2026). Cross-referenced across 3+ independent datasets.
>
> 🔥 = **Frequently Asked** — confirmed in 5+ independent interview experiences. Must prepare thoroughly.
> ⭐⭐⭐⭐⭐ = Highest frequency · ⭐ = Rarely asked

---

## 📋 Interview Process at Microsoft

| Round | Format | Duration | Focus |
|-------|--------|----------|-------|
| **Online Assessment** | Codility / HackerRank | 70–120 min | 2–3 Medium DSA problems |
| **Technical Round 1–3** | Whiteboard / shared editor | 45–60 min each | 1–2 DSA problems per round |
| **Design Round** | Discussion | 60 min | LLD (SDE1) · HLD (SDE2+) |
| **Hiring Manager** | Behavioral | 60 min | Growth Mindset + Project deep dive |

> **Difficulty split across all rounds:** ~50% Medium · ~37% Easy · ~13% Hard
>
> ⚠️ Microsoft evaluates **HOW** you solve, not just **IF** you solve. Always explain reasoning aloud. Start brute force → identify bottleneck → optimize.

---

## 🔗 Key Resources

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode Microsoft Tag | https://leetcode.com/company/microsoft/ | Premium — sorted by frequency |
| GFG Microsoft Page | https://www.geeksforgeeks.org/company/microsoft/ | Free interview experiences |
| NeetCode 150 | https://neetcode.io/practice | Best free pattern-based roadmap |
| LeetCode Top 150 | https://leetcode.com/studyplan/top-interview-150/ | Foundational set |
| Company-wise LC (GitHub) | https://github.com/liquidslr/leetcode-company-wise-problems | Frequency-sorted CSVs |
| Company-wise LC (GitHub) | https://github.com/snehasishroy/leetcode-companywise-interview-questions | Alternative source |

---

## 1. 📦 Arrays

- [ ] 🔥 **[Two Sum](https://leetcode.com/problems/two-sum/)** · Easy · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/key-pair5616/1)
  > *Follow-up: What if the array is sorted? What if you need all pairs? What if there are duplicates?*
- [ ] 🔥 **[Maximum Subarray (Kadane's)](https://leetcode.com/problems/maximum-subarray/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1)
  > *Follow-up: Return the actual subarray indices. What if all elements are negative?*
- [ ] 🔥 **[Merge Intervals](https://leetcode.com/problems/merge-intervals/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1)
  > *Follow-up: What if intervals are already sorted? Insert a new interval into a merged list (LC #57).*
- [ ] 🔥 **[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1)
  > *Follow-up: What if all elements are positive? (Sliding window instead of prefix sum). What if k is very large?*
- [ ] 🔥 **[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)** · Hard · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1)
  > *Follow-up: Can you do it in O(1) extra space? (Two pointers). What about the 2D version (LC #407)?*
- [ ] 🔥 **[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)** · Easy · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1)
  > *Follow-up: At most 2 transactions (LC #123)? Unlimited transactions (LC #122)? With cooldown (LC #309)?*
- [ ] 🔥 **[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/attend-all-meetings/1)
  > *Follow-up: What if two meetings start at the same time? Add priorities? Thread-safe version?*
- [ ] 🔥 **[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/maximum-product-subarray3604/1)
  > *Follow-up: How do you handle zeros? Track both min and max running products.*
- [ ] **[3Sum](https://leetcode.com/problems/3sum/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1)
  > *Follow-up: Generalize to 4Sum (LC #18). 3Sum Closest (LC #16).*
- [ ] **[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)** · Medium · ⭐⭐⭐
- [ ] **[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/product-array-puzzle4525/1)
  > *Follow-up: Can you do this without division and in O(1) extra space (excluding output)?*
- [ ] **[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1)
- [ ] **[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)** · Easy · ⭐⭐⭐
  > *Follow-up: Can you do it without extra space? (Merge from the back)*
- [ ] **[Majority Element](https://leetcode.com/problems/majority-element/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/majority-element-1587115620/1)
  > *Follow-up: What if majority doesn't exist? (Boyer-Moore + verification step). Find all elements > n/3 (LC #229)?*
- [ ] **[Majority Element II](https://leetcode.com/problems/majority-element-ii/)** · Medium · ⭐⭐⭐
- [ ] **[Missing Number](https://leetcode.com/problems/missing-number/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1)
- [ ] **[Rotate Array](https://leetcode.com/problems/rotate-array/)** · Medium · ⭐⭐⭐
- [ ] **[Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)** · Medium · ⭐⭐⭐
- [ ] **[Jump Game](https://leetcode.com/problems/jump-game/)** · Medium · ⭐⭐⭐
- [ ] **[Jump Game II](https://leetcode.com/problems/jump-game-ii/)** · Medium · ⭐⭐⭐
- [ ] **[Gas Station](https://leetcode.com/problems/gas-station/)** · Medium · ⭐⭐⭐

---

## 2. 🔤 Strings

- [ ] 🔥 **[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1)
  > *Follow-up: What if you allow at most k distinct characters? (Sliding Window generalization)*
- [ ] 🔥 **[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)** · Easy · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1)
  > *Follow-up: How do you add new bracket types? Minimum removals to make valid (LC #1249)?*
- [ ] 🔥 **[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1)
  > *Follow-up: Can you do it in O(n) using Manacher's algorithm?*
- [ ] **[Word Break](https://leetcode.com/problems/word-break/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/word-break1352/1)
  > *Follow-up: Return all possible sentences — Word Break II (LC #140)*
- [ ] **[Group Anagrams](https://leetcode.com/problems/group-anagrams/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/print-anagrams-together/1)
- [ ] **[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)** · Easy · ⭐⭐⭐⭐
- [ ] **[Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)** · Easy · ⭐⭐⭐
- [ ] **[Roman to Integer](https://leetcode.com/problems/roman-to-integer/)** · Easy · ⭐⭐⭐
- [ ] **[Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)** · Easy · ⭐⭐⭐
- [ ] **[Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/)** · Medium · ⭐⭐⭐
- [ ] **[Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)** · Medium · ⭐⭐⭐
- [ ] **[Decode Ways](https://leetcode.com/problems/decode-ways/)** · Medium · ⭐⭐⭐
- [ ] **[Permutation in String](https://leetcode.com/problems/permutation-in-string/)** · Medium · ⭐⭐⭐
- [ ] **[Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)** · Medium · ⭐⭐⭐
- [ ] **[3Sum Closest](https://leetcode.com/problems/3sum-closest/)** · Medium · ⭐⭐⭐

---

## 3. 🔗 Linked Lists

- [ ] 🔥 **[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)** · Easy · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1)
  > *Follow-up: Can you do it recursively? Reverse sublist [m, n] (LC #92). Reverse in groups of k (LC #25).*
- [ ] 🔥 **[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)** · Easy · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1)
  > *Follow-up: Find the entry point of the cycle (Floyd's algorithm — LC #142). Can you find the cycle length?*
- [ ] 🔥 **[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1)
  > *Follow-up: Can you do it in O(1) extra space (without a hash map) using interleaving?*
- [ ] 🔥 **[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)** · Hard · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1)
  > *Follow-up: Compare priority queue vs. divide and conquer approaches. Space complexity tradeoffs.*
- [ ] **[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)** · Medium · ⭐⭐⭐⭐
- [ ] **[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)** · Easy · ⭐⭐⭐⭐
- [ ] **[Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)** · Medium · ⭐⭐⭐
- [ ] **[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)** · Medium · ⭐⭐⭐
- [ ] **[Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)** · Medium · ⭐⭐⭐
- [ ] **[Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)** · Medium · ⭐⭐⭐
- [ ] **[Merge In-Between Linked Lists](https://leetcode.com/problems/merge-in-between-linked-lists/)** · Medium · ⭐⭐⭐
- [ ] **[Maximum Twin Sum of a Linked List](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/)** · Medium · ⭐⭐⭐

---

## 4. 🌳 Trees & BSTs

- [ ] 🔥 **[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/level-order-traversal/1)
  > *Follow-up: Zigzag level order (LC #103)? Right side view (LC #199)? Average of levels (LC #637)?*
- [ ] 🔥 **[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/check-for-bst/1)
  > *Follow-up: Can you do it without passing min/max bounds? (Inorder traversal approach — must be sorted)*
- [ ] 🔥 **[Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1)
  > *Follow-up: What if the nodes may not exist in the tree? (LC #1644). LCA of BST (LC #235)?*
- [ ] 🔥 **[Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)** · Hard · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1)
  > *Follow-up: What if the path must pass through the root? What if nodes can be negative?*
- [ ] 🔥 **[Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)** · Hard · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1)
  > *Follow-up: BFS vs DFS serialization — which is more space efficient? Optimize for network transmission?*
- [ ] **[Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)** · Medium · ⭐⭐⭐⭐
- [ ] **[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)** · Easy · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/diameter-of-binary-tree/1)
- [ ] **[Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)** · Medium · ⭐⭐⭐
- [ ] **[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/height-of-binary-tree/1)
- [ ] **[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/mirror-tree/1)
- [ ] **[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/symmetric-tree/1)
- [ ] **[Path Sum II](https://leetcode.com/problems/path-sum-ii/)** · Medium · ⭐⭐⭐
- [ ] **[Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)** · Hard · ⭐⭐⭐
- [x] **[Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/)** · Medium · ⭐⭐⭐
- [ ] **[Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)** · Medium · ⭐⭐⭐
- [ ] **[House Robber III](https://leetcode.com/problems/house-robber-iii/)** · Medium · ⭐⭐⭐
- [ ] **[Construct Binary Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)** · Medium · ⭐⭐⭐
- [ ] **[Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)** · Medium · ⭐⭐⭐
- [ ] **[Recover a Tree from Preorder Traversal](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/)** · Hard · ⭐⭐⭐
- [x] **[Vertical Order Traversal of a Binary Tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)** · Hard · ⭐⭐

---

## 5. 📊 Graphs

- [ ] 🔥 **[Number of Islands](https://leetcode.com/problems/number-of-islands/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1)
  > *Follow-up: Solve without modifying the grid (visited array). Very large grid → Union-Find. Max island area (LC #695)?*
- [ ] 🔥 **[Course Schedule](https://leetcode.com/problems/course-schedule/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/prerequisite-tasks/1)
  > *Follow-up: Return the actual ordering (LC #210). What if there are multiple valid orderings?*
- [ ] 🔥 **[Clone Graph](https://leetcode.com/problems/clone-graph/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/clone-graph/1)
  > *Follow-up: What if the graph has cycles? How do you handle with BFS vs DFS?*
- [ ] **[Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)** · Medium · ⭐⭐⭐⭐
- [ ] **[Word Search](https://leetcode.com/problems/word-search/)** · Medium · ⭐⭐⭐⭐
  > *Follow-up: Find all words from a list on the board — Word Search II (LC #212, uses Trie)*
- [ ] **[Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/rotten-oranges2536/1)
- [ ] **[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)** · Medium · ⭐⭐⭐
- [x] **[Word Ladder](https://leetcode.com/problems/word-ladder/)** · Hard · ⭐⭐⭐
- [ ] **[Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)** · Medium · ⭐⭐⭐
- [ ] **[Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)** · Medium · ⭐⭐⭐
- [x] **[Open the Lock](https://leetcode.com/problems/open-the-lock/)** · Medium · ⭐⭐⭐
- [ ] **[Shortest Path in Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/)** · Hard · ⭐⭐⭐

*SDE2+ specific:*
- [ ] **[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)** · Hard · ⭐⭐⭐
- [ ] **[Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/)** · Hard · ⭐⭐

---

## 6. 💡 Dynamic Programming

- [ ] 🔥 **[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1)
  > *Follow-up: Can you do it in O(n log n)? (Binary search / Patience sorting approach)*
- [ ] **[Coin Change](https://leetcode.com/problems/coin-change/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/number-of-coins1824/1)
  > *Follow-up: Count number of ways to make change (Coin Change II — LC #518)*
- [ ] **[Unique Paths](https://leetcode.com/problems/unique-paths/)** · Medium · ⭐⭐⭐⭐
  > *Follow-up: What if there are obstacles? (Unique Paths II — LC #63)*
- [ ] **[House Robber](https://leetcode.com/problems/house-robber/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/house-robber/1)
  > *Follow-up: Houses in a circle (House Robber II — LC #213). Tree structure (House Robber III — LC #337).*
- [ ] **[Word Break](https://leetcode.com/problems/word-break/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/word-break1352/1)
  > *Follow-up: Return all possible sentences (Word Break II — LC #140)*
- [ ] **[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)** · Easy · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1)
- [ ] **[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1)
- [ ] **[Edit Distance](https://leetcode.com/problems/edit-distance/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/edit-distance3702/1)
  > *Follow-up: Can you reduce space from O(m×n) to O(min(m, n))?*
- [ ] **[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)** · Medium · ⭐⭐⭐
- [ ] **[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)** · Medium · ⭐⭐⭐
- [ ] **[Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)** · Medium · ⭐⭐⭐
- [ ] **[Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)** · Hard · ⭐⭐⭐
- [ ] **[Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)** · Hard · ⭐⭐⭐
- [ ] **[Wildcard Matching](https://leetcode.com/problems/wildcard-matching/)** · Hard · ⭐⭐⭐
- [ ] **[House Robber II](https://leetcode.com/problems/house-robber-ii/)** · Medium · ⭐⭐⭐
- [ ] **[Jump Game](https://leetcode.com/problems/jump-game/)** · Medium · ⭐⭐⭐
- [ ] **[Jump Game II](https://leetcode.com/problems/jump-game-ii/)** · Medium · ⭐⭐⭐

---

## 7. 📚 Stack & Queue

- [ ] 🔥 **[Min Stack](https://leetcode.com/problems/min-stack/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1)
  > *Follow-up: Can you support getMin() in O(1) time AND O(1) extra space? (Encode difference)*
- [ ] **[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1)
- [ ] **[Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/)** · Easy · ⭐⭐⭐
- [ ] **[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)** · Hard · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1)
- [ ] **[Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1)
- [ ] **[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)** · Medium · ⭐⭐⭐

---

## 8. 🔺 Heap / Priority Queue

- [ ] 🔥 **[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)** · Hard · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1)
  > *Follow-up: How does this scale for streaming data? What if elements are bounded in range? (Bucket approach)*
- [ ] **[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1)
  > *Follow-up: Can you solve in O(n) using bucket sort?*
- [ ] **[Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)** · Medium · ⭐⭐⭐
  > *Follow-up: Can you solve in O(n) average case? (QuickSelect)*
- [ ] **[Task Scheduler](https://leetcode.com/problems/task-scheduler/)** · Medium · ⭐⭐⭐
- [ ] **[Sliding Window Median](https://leetcode.com/problems/sliding-window-median/)** · Hard · ⭐⭐ *(SDE2+)*

---

## 9. 🔍 Binary Search

- [ ] 🔥 **[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1)
  > *Follow-up: What if there are duplicates? (LC #81). Find the rotation point first approach.*
- [ ] **[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)** · Hard · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1)
- [ ] **[Find Peak Element](https://leetcode.com/problems/find-peak-element/)** · Medium · ⭐⭐⭐
- [ ] **[Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)** · Medium · ⭐⭐⭐
- [ ] **[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)** · Medium · ⭐⭐⭐
- [ ] **[Sqrt(x)](https://leetcode.com/problems/sqrtx/)** · Easy · ⭐⭐⭐
- [ ] **[First Bad Version](https://leetcode.com/problems/first-bad-version/)** · Easy · ⭐⭐⭐

---

## 10. 🔄 Backtracking

- [ ] **[Combination Sum](https://leetcode.com/problems/combination-sum/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/combination-sum-1587115620/1)
- [ ] **[Permutations](https://leetcode.com/problems/permutations/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/permutations-of-a-given-string-1587115620/1)
- [ ] **[Subsets](https://leetcode.com/problems/subsets/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/power-set4302/1)
- [ ] **[N-Queens](https://leetcode.com/problems/n-queens/)** · Hard · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/n-queen-problem0315/1)
- [ ] **[Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)** · Medium · ⭐⭐⭐
- [ ] **[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)** · Medium · ⭐⭐⭐
- [ ] **[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)** · Medium · ⭐⭐

---

## 11. 🌐 Trie

- [ ] 🔥 **[Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)** · Medium · ⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1)
  > *Follow-up: Add wildcard search. Add autocomplete functionality. Design Search Autocomplete System (LC #642).*
- [ ] **[Word Search II](https://leetcode.com/problems/word-search-ii/)** · Hard · ⭐⭐⭐
- [ ] **[Design Search Autocomplete System](https://leetcode.com/problems/design-search-autocomplete-system/)** · Hard · ⭐⭐ *(SDE2+)*

---

## 12. ⚡ Bit Manipulation

- [ ] **[Single Number](https://leetcode.com/problems/single-number/)** · Easy · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/finding-the-numbers0215/1)
- [ ] **[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)** · Easy · ⭐⭐⭐
- [ ] **[Reverse Bits](https://leetcode.com/problems/reverse-bits/)** · Easy · ⭐⭐⭐
- [ ] **[Power of Two](https://leetcode.com/problems/power-of-two/)** · Easy · ⭐⭐⭐
- [ ] **[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)** · Medium · ⭐⭐⭐
- [ ] **[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1)

---

## 13. 🏗️ Design (Data Structures & LLD)

- [ ] 🔥 **[LRU Cache](https://leetcode.com/problems/lru-cache/)** · Medium · ⭐⭐⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/problems/lru-cache/1)
  > *Follow-up: Thread-safe LRU? Cache size changes dynamically? Add persistence? Distributed LRU (SDE2+).*
  > *Key insight: HashMap + Doubly Linked List for O(1) get and put.*
- [ ] 🔥 **[Design Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe/)** · Medium · ⭐⭐⭐⭐
  > *Follow-up: Generalize to n×n board. Check win condition in O(1) per move. 3D version?*
- [ ] **[LFU Cache](https://leetcode.com/problems/lfu-cache/)** · Hard · ⭐⭐⭐
- [ ] **[Design Twitter](https://leetcode.com/problems/design-twitter/)** · Medium · ⭐⭐⭐
- [ ] **[Design Search Autocomplete System](https://leetcode.com/problems/design-search-autocomplete-system/)** · Hard · ⭐⭐

*LLD Round — Discussion-based (no fixed LC link):*
- [ ] **Design Parking Lot** · Medium · ⭐⭐⭐ · [GFG](https://www.geeksforgeeks.org/design-parking-lot/)
- [ ] **Design Elevator System** · Hard · ⭐⭐⭐
- [ ] **Design Rate Limiter** · Medium · ⭐⭐⭐
- [ ] **Design Cache with Eviction Policy** · Hard · ⭐⭐⭐
- [ ] **Design Music Player / Playlist** · Medium · ⭐⭐

---

## 💬 Interviewer Follow-up Patterns

These are asked **after** you solve the initial problem. Prepare for all of them.

### Complexity Challenges
| After you give... | Expect: |
|---|---|
| O(n²) brute force | "Can you do it in O(n log n) or O(n)?" |
| O(n) space solution | "Can you reduce space to O(1)?" |
| Recursive solution | "Convert to iterative — what's the call stack depth?" |
| Hash map approach | "What if the hash map has collisions? Memory constraints?" |

### Edge Case Probes
- "What if the input is `null` / empty?"
- "What if there are negative numbers?"
- "What if all elements are identical?"
- "What happens at integer overflow? (Use `long long`)"
- "What if the tree / list has only one node?"

### Scaling & System Extensions
- "What if the data doesn't fit in memory? (Streaming input)"
- "What if multiple threads access this simultaneously? (Thread safety)"
- "How would you distribute this across multiple machines?"
- "How would you add caching / persistence to your solution?"

### API & Design Probes
- "How would you structure this as a reusable class / library?"
- "What public methods would you expose? What's the API?"
- "How would you write unit tests for this? List your test cases."
- "If you had 2 more hours, what would you refactor?"

---

## 🎯 Preparation Strategy

```
Priority 1 → All 🔥 questions (Tier 1 — confirmed in 5+ interview experiences)
Priority 2 → ⭐⭐⭐⭐ questions (high frequency, solid chance of appearing)
Priority 3 → ⭐⭐⭐ questions (medium frequency, good for breadth)
SDE2+     → ⭐⭐ questions (senior-specific rounds only)
```

### Key Patterns to Master (in order of importance)

| # | Pattern | Key Questions |
|---|---------|--------------|
| 1 | Hash Map | Two Sum, Group Anagrams, Subarray Sum K |
| 2 | Two Pointers / Sliding Window | Longest Substring, Container With Most Water |
| 3 | BFS / DFS | Level Order Traversal, Number of Islands, Word Search |
| 4 | Recursion + Memoization | Tree DP, Word Break, LIS |
| 5 | Monotonic Stack | Next Greater Element, Largest Rect in Histogram |
| 6 | Topological Sort | Course Schedule I & II |
| 7 | Fast & Slow Pointers | Linked List Cycle, Find Middle |
| 8 | Two Heaps | Find Median from Data Stream |
| 9 | HashMap + Doubly Linked List | LRU Cache |
| 10 | Binary Search on Answer | Median of Two Sorted Arrays, Search Rotated |

### Microsoft-Specific Tips
- **Start with brute force** → state the bottleneck → optimize. This progression is valued over silently jumping to optimal.
- **Communicate constantly** — thinking out loud is evaluated as heavily as correctness.
- **Always analyze time and space complexity** before the interviewer asks.
- **Practice in a plain text editor** with no autocomplete — Microsoft often uses simple shared editors.
- **For design rounds:** Clarify requirements and scale before drawing anything.
