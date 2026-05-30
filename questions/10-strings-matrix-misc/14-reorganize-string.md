# Reorganize String

**Link:** https://leetcode.com/problems/reorganize-string/

## Problem
Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement, or return an empty string if not possible. If the maximum character frequency exceeds (n+1)/2, it is impossible.

## Solution
Use a sorted set (acting as a max-heap by frequency) of (frequency, char) pairs. Each step, extract the highest and second-highest frequency characters, append both to the result, decrement their counts, and re-insert if still positive. Verify no two adjacent identical characters remain.

## Code
```cpp
string reorganizeString(string s) {
    set<pair<int,char>> st;
    map<char,int> mp;
    for(auto i:s){
        mp[i]++;
    }
    for(auto i:mp){
        st.insert({i.second,i.first});
    }
    string ans;
    while(st.size()){
        auto back=*(--st.end());
        auto front=*(st.begin());
        st.erase(back);
        st.erase(front);
        ans.push_back(back.second);
        if(back.second!=front.second)
            ans.push_back(front.second);
        back.first--;
        front.first--;
        if(back.first>0)
            st.insert(back);
        if(front.first>0)
            st.insert(front);
    }
    // check
    for(int i=0;i<ans.size()-1;i++){
        if(ans[i]==ans[i+1]) return "";
    }
    return ans;
}
```
