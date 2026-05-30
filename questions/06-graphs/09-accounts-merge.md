# Accounts Merge

**Link:** https://leetcode.com/problems/accounts-merge/

## Problem
Given a list of accounts where each account is a list [name, email1, email2, ...], merge accounts that share at least one email. Return the merged accounts in any order, with emails sorted and the account name prepended.

## Solution
Use Union-Find on emails. Map each email to an index, then union all emails in the same account together. Also record the account owner for each email's root. Finally, collect all emails under each root, sort them, and prepend the owner's name.

## Code
```cpp
class Solution {
    unordered_map<int,int> parent, rnk;

    int find(int x) {
        if(!parent.count(x)) parent[x] = x;
        if(parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if(px == py) return;
        if(rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if(rnk[px] == rnk[py]) rnk[px]++;
    }

public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string,int> emailToId;
        unordered_map<int,string> idToName;
        int id = 0;

        for(auto& acc : accounts) {
            string& name = acc[0];
            for(int i=1; i<(int)acc.size(); i++) {
                if(!emailToId.count(acc[i])) {
                    emailToId[acc[i]] = id++;
                }
                idToName[emailToId[acc[i]]] = name;
                unite(emailToId[acc[0+1]], emailToId[acc[i]]);
            }
        }

        // Regroup by root
        unordered_map<int, vector<string>> groups;
        for(auto& [email, eid] : emailToId) {
            groups[find(eid)].push_back(email);
        }

        vector<vector<string>> res;
        for(auto& [root, emails] : groups) {
            sort(emails.begin(), emails.end());
            emails.insert(emails.begin(), idToName[root]);
            res.push_back(emails);
        }
        return res;
    }
};
```
