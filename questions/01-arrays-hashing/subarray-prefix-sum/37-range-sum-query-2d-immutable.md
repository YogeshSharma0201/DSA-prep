# Range Sum Query 2D - Immutable

**Link:** https://leetcode.com/problems/range-sum-query-2d-immutable/

## Problem

Given a 2D matrix `matrix`, handle multiple queries of the following type:
- Calculate the sum of the elements of `matrix` inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

Implement the `NumMatrix` class:
- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the sum of the elements of `matrix` inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

You must design an algorithm where `sumRegion` works on $O(1)$ time complexity.

**Example 1:**
```
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output:
[null, 8, 11, 12]

Explanation:
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (blue rectangle)
```

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10^4 <= matrix[i][j] <= 10^4`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- At most `10^4` calls will be made to `sumRegion`.

## Solution

To query any region in $O(1)$ time, we precompute a 2D prefix sum of the matrix during initialization.

### Core Idea: 2D Prefix Sum (Inclusion-Exclusion Principle)

Let `Matrix[i][j]` be the prefix sum storing the sum of the subgrid from `(0, 0)` to `(i, j)`.

#### 1. Precomputation (Constructor)
We can build the prefix sum matrix dynamically by iterating through the grid. For any cell `(i, j)`, the cumulative sum from `(0,0)` to `(i,j)` is calculated as:
$$\text{Matrix}[i][j] = \text{matrix}[i][j] + \text{Matrix}[i-1][j] + \text{Matrix}[i][j-1] - \text{Matrix}[i-1][j-1]$$

*Why do we subtract `Matrix[i-1][j-1]`?* 
Because it is included in both `Matrix[i-1][j]` and `Matrix[i][j-1]`, counting it twice. We subtract it once to correct the overlap.

#### 2. Querying a Region (`sumRegion`)
To find the sum of a region between `(row1, col1)` and `(row2, col2)`:
- We start with the full sum from `(0,0)` to `(row2, col2)` which is `Matrix[row2][col2]`.
- We subtract the top out-of-bounds area: `Matrix[row1-1][col2]`.
- We subtract the left out-of-bounds area: `Matrix[row2][col1-1]`.
- We add back the top-left overlapping area that was subtracted twice: `Matrix[row1-1][col1-1]`.

$$\text{Sum} = \text{Matrix}[row2][col2] - \text{Matrix}[row1-1][col2] - \text{Matrix}[row2][col1-1] + \text{Matrix}[row1-1][col1-1]$$

*Boundary checks are added to handle cases where `row1 = 0` or `col1 = 0`.*

---

### Complexity Analysis
- **Time Complexity:**
  - **Constructor:** $O(m \times n)$ to compute the prefix sums.
  - **`sumRegion`:** $O(1)$ since it only involves constant basic arithmetic operations.
- **Space Complexity:** $O(1)$ auxiliary space if we modify the input matrix in-place.

## Code

```cpp
class NumMatrix {
public:
    vector<vector<int>> Matrix;

    NumMatrix(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();

        for(int i=0; i<n; i++) {
            for(int j=0; j<m; j++) {
                int t = 0;
                if(i > 0 && j > 0) t -= matrix[i-1][j-1];
                if(i > 0) t += matrix[i-1][j];
                if(j > 0) t += matrix[i][j-1];
                matrix[i][j] += t;
            }
        }

        Matrix = matrix;
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        int t = Matrix[row2][col2];

        if(col1 > 0) t -= Matrix[row2][col1-1];
        if(row1 > 0) t -= Matrix[row1-1][col2];
        if(col1 > 0 && row1 > 0) t += Matrix[row1-1][col1-1];

        return t;
    }
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix* obj = new NumMatrix(matrix);
 * int param_1 = obj->sumRegion(row1,col1,row2,col2);
 */
```
