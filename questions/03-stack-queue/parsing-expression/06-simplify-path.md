# Simplify Path

**Link:** https://leetcode.com/problems/simplify-path

## Problem
Given a string path representing an absolute Unix file path, simplify it to its canonical form. The canonical path must start with a single slash, not end with a slash (unless root), and not contain consecutive slashes, single dots, or double dots that can be resolved.

## Solution
Split the path by '/' using a stringstream with getline. Process each component: skip empty strings and '.'. On '..', pop the stack if non-empty (go up one directory). Otherwise push the component as a directory name. Reconstruct the path by prepending '/' before each stack element, returning "/" if empty.

## Code
```cpp
string simplifyPath(string path) {
    vector<string> st;
    stringstream ss(path);
    string comp;
    while (getline(ss, comp, '/')) {
        if (comp == "" || comp == ".") {
            continue;
        }

        if (comp == "..") {
            if (!st.empty()) {
                st.pop_back();
            }
        } else {
            st.push_back(comp);
        }
    }

    stringstream simplifiedPath;
    for (const string& s : st) {
        simplifiedPath << "/" << s;
    }

    return simplifiedPath.str().empty() ? "/" : simplifiedPath.str();
}
```
