# Heap Sort & Linear Time Heap Creation

**Link:** [Heap Sort | Practice | GeeksforGeeks](https://www.geeksforgeeks.org/problems/heap-sort/1)

---

## 1. Linear Time $\mathcal{O}(n)$ Heap Creation

### The Concept (Bottom-Up Heapify)
To build a heap from an unsorted array of size $n$, we do **not** insert elements one by one using `push()` (which takes $\mathcal{O}(n \log n)$). Instead, we build the heap **bottom-up**:

1. Leaves are already valid heaps of size 1. In a 0-indexed array, leaf nodes start at index $\lfloor n/2 \rfloor$ to $n-1$.
2. We only need to run `heapifyDown` on internal nodes, starting from the last non-leaf node at index $\lfloor n/2 \rfloor - 1$ down to the root at index $0$:
   ```cpp
   for (int i = n / 2 - 1; i >= 0; i--) {
       heapifyDown(i, n, arr);
   }
   ```

### Why is Bottom-Up Heap Construction $\mathcal{O}(n)$?
- An array of size $n$ has height $h = \lfloor \log_2 n \rfloor$.
- At height $k$ (counting from leaves at height 0 up to root at height $h$), there are at most $\lceil n / 2^{k+1} \rceil$ nodes.
- A node at height $k$ can bubble down at most $k$ levels.
- Total work done:
  $$\text{Total Steps} = \sum_{k=0}^{\lfloor \log n \rfloor} \left\lceil \frac{n}{2^{k+1}} \right\rceil \cdot k \le n \sum_{k=0}^{\infty} \frac{k}{2^{k+1}} = n \cdot 1 = \mathcal{O}(n)$$

---

### C++ Priority Queue $\mathcal{O}(n)$ Initialization Patterns

#### A. Max-Heap (Default) in $\mathcal{O}(n)$
```cpp
// From std::vector
vector<int> nums = {4, 10, 3, 5, 1};
priority_queue<int> max_pq(nums.begin(), nums.end()); // O(n)

// From raw array
int arr[] = {4, 10, 3, 5, 1};
int n = sizeof(arr) / sizeof(arr[0]);
priority_queue<int> max_pq_arr(arr, arr + n); // O(n)
```

#### B. Min-Heap in $\mathcal{O}(n)$
```cpp
// From std::vector
vector<int> nums = {4, 10, 3, 5, 1};
priority_queue<int, vector<int>, greater<int>> min_pq(nums.begin(), nums.end()); // O(n)

// From raw array
int arr[] = {4, 10, 3, 5, 1};
int n = sizeof(arr) / sizeof(arr[0]);
priority_queue<int, vector<int>, greater<int>> min_pq_arr(arr, arr + n); // O(n)
```

#### C. In-Place `<algorithm>` Heap Functions
```cpp
#include <algorithm>

vector<int> nums = {4, 10, 3, 5, 1};

// 1. Max Heap in-place O(n)
make_heap(nums.begin(), nums.end());

// 2. Min Heap in-place O(n)
make_heap(nums.begin(), nums.end(), greater<int>());
```

---

## 2. Heap Sort

### Problem Statement
Given an array `arr` of size $n$, sort the array in increasing order using **Heap Sort**.

### Algorithm Walkthrough
1. **Build Max-Heap (In-Place)**:
   - Convert the unsorted array into a max-heap in $\mathcal{O}(n)$ by calling `heapifyDown` from index $n/2 - 1$ down to $0$.
   - The maximum element is now at `arr[0]`.

2. **Extract & Sort**:
   - For $i$ from $n - 1$ down to $1$:
     - Swap `arr[0]` (current max) with `arr[i]` (end of unsorted section).
     - Reduce the effective heap size to $i$.
     - Call `heapifyDown(0, i, arr)` to restore the max-heap property for the remaining unsorted prefix `arr[0 .. i-1]`.
   - Once the loop finishes, the array is sorted in ascending order.

---

## Code

```cpp
#include <vector>
#include <algorithm>

using namespace std;

// The functions should be written in a way that array becomes sorted
// in increasing order when heapSort() is called.

class Solution {
  public:
    // Bubble down element at index i within heap of effective size n
    void heapifyDown(int i, int n, vector<int>& arr) {
        while (true) {
            int largest = i;
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            
            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
            
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }
            
            if (largest == i) break;
            
            swap(arr[largest], arr[i]);
            i = largest;
        }
    }
    
    // Function to sort an array using Heap Sort.
    void heapSort(vector<int>& arr) {
        int n = arr.size();
        
        // 1. In-place build max-heap in O(n) time
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapifyDown(i, n, arr);
        }
        
        // 2. Extract maximum elements one by one in O(n log n)
        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);
            heapifyDown(0, i, arr);
        }
    }
};
```

---

## Complexity Analysis

| Phase / Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Build Max-Heap** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Heap Sort Extraction ($n-1$ iterations)** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ |
| **Total Heap Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ (In-place) |
| **Best / Average / Worst Case** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ |
