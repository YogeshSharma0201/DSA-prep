# Find the City With the Smallest Number of Neighbors at a Threshold Distance

**Link:** https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/

## Problem
Given n cities connected by weighted edges, find the city that has the smallest number of cities reachable with a distance of at most distanceThreshold. If multiple cities have the same count, return the city with the greatest number (highest index).

## Solution
Apply Floyd-Warshall to compute all-pairs shortest paths. Initialize dist[i][i] = 0 and dist[i][j] = edge weight. Then for each intermediate node k, relax all pairs (j, i) through k. Finally iterate over all cities and count how many other cities are reachable within the threshold, returning the city with the minimum count (preferring the higher index on a tie).

## Code
```cpp
int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
    int inf = INT_MAX>>1;
    vector<vector<int>> dist(n, vector<int>(n, INT_MAX>>1));

    for(int i=0; i<n; i++) {
        dist[i][i] = 0;
    }

    for(int i=0; i<edges.size(); i++) {
        dist[edges[i][0]][edges[i][1]] = dist[edges[i][1]][edges[i][0]] = edges[i][2];
    }

    for(int i=0; i<n; i++) {
        for(int j=0; j<n; j++) {
            for(int k=0; k<n; k++) {
                if(dist[j][i] != inf && dist[i][j] != inf) {
                    int mind = min(dist[j][k], dist[j][i] + dist[i][k]);

                    if(mind < dist[j][k]) {
                        dist[j][k] = mind;
                    }
                }
            }
        }
    }

    int ret = 0, minC = INT_MAX>>1;
    for(int i=0; i<n; i++) {
        int count = 0;
        for(int j=0; j<n; j++) {
            if(i!=j && dist[i][j] <= distanceThreshold) count++;
        }
        if(count <= minC) {
            minC = count;
            ret = i;
        }
    }

    return ret;
}
```
