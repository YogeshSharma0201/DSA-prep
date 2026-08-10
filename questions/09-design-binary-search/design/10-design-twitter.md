# Design Twitter

**Link:** https://leetcode.com/problems/design-twitter/

## Problem
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.

Implement the `Twitter` class:
- `Twitter()` Initializes your twitter object.
- `void postTweet(int userId, int tweetId)` Composes a new tweet with ID `tweetId` by the user `userId`. Each call to this function will be made at a unique time.
- `List<Integer> getNewsFeed(int userId)` Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
- `void follow(int followerId, int followeeId)` The user with ID `followerId` started following the user with ID `followeeId`.
- `void unfollow(int followerId, int followeeId)` The user with ID `followerId` started unfollowing the user with ID `followeeId`.

## Solution
1. **Data Structures:**
   - `unordered_map<int, unordered_set<int>> followmap`: Maps a user to the set of users they follow.
   - `unordered_map<int, vector<pair<int, int>>> posts`: Maps a user to a list of their tweets formatted as `{timestamp, tweetId}`.
   - `int time`: Global incremental counter to track the chronological order of tweets.
2. **Posting & Following:**
   - When posting a tweet, automatically ensure the user follows themselves so self-tweets show in their feed.
   - Follow and unfollow insert/erase from the follower's set.
3. **News Feed (Merge k Sorted Lists):**
   - Each followee's tweet vector is already sorted chronologically (latest tweet at the back).
   - Use a max-heap (`priority_queue`) to merge up to 10 most recent tweets across all followees (equivalent to merging $k$ sorted lists).
   - Push the latest tweet index of each followed user into the heap. Extract the maximum timestamp, push the tweet ID to `feed`, and if that user has earlier tweets, push their next latest tweet into the heap.

## Code
```cpp
class Twitter {
    int time;
    unordered_map<int, unordered_set<int>> followmap;
    unordered_map<int, vector<pair<int, int>>> posts;
public:
    Twitter() {
        time = 0;
    }
    
    void postTweet(int userId, int tweetId) {
        followmap[userId].insert(userId);
        posts[userId].push_back({time++, tweetId});
    }
    
    // Merge k sorted lists using Max-Heap
    vector<int> getNewsFeed(int userId) {
        vector<int> feed;
        priority_queue<pair<int, pair<int, int>>> pq;
        
        for (auto it : followmap[userId]) {
            if (posts[it].size()) {
                pq.push({posts[it].back().first, {it, (int)posts[it].size() - 1}});
            }
        }

        while (!pq.empty() && feed.size() < 10) {
            auto p = pq.top(); pq.pop();
            feed.push_back(posts[p.second.first][p.second.second].second);
            if (p.second.second > 0) {
                auto post = posts[p.second.first][p.second.second - 1];
                pq.push({post.first, {p.second.first, p.second.second - 1}});
            }
        }

        return feed;
    }
    
    void follow(int followerId, int followeeId) {
        followmap[followerId].insert(followeeId);
    }
    
    void unfollow(int followerId, int followeeId) {
        followmap[followerId].erase(followeeId);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter* obj = new Twitter();
 * obj->postTweet(userId,tweetId);
 * vector<int> param_2 = obj->getNewsFeed(userId);
 * obj->follow(followerId,followeeId);
 * obj->unfollow(followerId,followeeId);
 */
```
