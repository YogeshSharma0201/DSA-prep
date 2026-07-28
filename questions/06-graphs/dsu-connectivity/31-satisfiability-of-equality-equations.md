# Satisfiability of Equality Equations

**Link:** https://leetcode.com/problems/satisfiability-of-equality-equations

## Problem
Given an array of strings `equations` representing relationships between variables, where each string is of the form `"xi==yi"` (equality) or `"xi!=yi"` (inequality). Determine if it is possible to assign integer values to all variables to satisfy all the given equations.

## Solution
Use a Disjoint Set Union (DSU) / Union-Find data structure:
1. **Initialize DSU:** Create a parent array for all 26 lowercase English letters.
2. **First Pass (Equalities):** Iterate through the equations and perform a `union` operation for each equality (`"=="`) relation to group all equal variables together.
3. **Second Pass (Inequalities):** Iterate through the equations again. For each inequality (`"!="`), verify if both variables are in the same component. If they are, it represents a contradiction, so return `false`.
4. If no contradictions are found after checking all inequalities, return `true`.

## Code
```cpp
class Solution {
public:
    vector<int> parent, rnk;

    int find(int x) {
        if(x != parent[x])
            parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if(px == py) return false;
        if(rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if(rnk[px] == rnk[py]) rnk[px]++;
        return true;
    }

    bool equationsPossible(vector<string>& equations) {
        parent.resize(26);
        rnk.resize(26,0);
        iota(parent.begin(),parent.end(),0);

        for(int i=0; i<equations.size(); i++) {
            string& s = equations[i];
            if(s[1] == '=') {
                unite(s[0]-'a',s[3]-'a');
            }
        }

        for(int i=0; i<equations.size(); i++) {
            string& s = equations[i];
            if(s[1] == '!') {
                if(find(s[0]-'a') == find(s[3]-'a')) return false;
            }
        }

        return true;
    }
};
```
