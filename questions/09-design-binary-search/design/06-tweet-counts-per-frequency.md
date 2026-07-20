# Tweet Counts Per Frequency

**Link:** https://leetcode.com/problems/tweet-counts-per-frequency/

## Problem
Design a system to record tweets and query how many tweets a user posted per time chunk. Given a tweet name, a frequency (minute/hour/day), and a time range, return a list where each entry is the tweet count for that time interval.

## Solution
Store each tweet as a timestamp in a sorted map keyed by `(tweetName, time)`. For a query, determine the interval size in seconds, compute the number of chunks, then use lower/upper bound to iterate over matching timestamps and bin them by `(timestamp - startTime) / interval`.

## Code
```cpp
class TweetCounts {
    unordered_map<string, map<int,int>> mp;

    TweetCounts() {}

    void recordTweet(string tweetName, int time) {
        if(mp.find(tweetName) == mp.end()) {
            mp[tweetName] = *(new map<int,int>());
        }
        mp[tweetName][time]++;
    }

    vector<int> getTweetCountsPerFrequency(string freq, string tweetName, int startTime, int endTime) {
        vector<int> chunks;

        int interval = 0, size = 0;
        if (freq == "minute") {
            interval = 60;
        } else if (freq == "hour") {
            interval = 3600;
        } else {
            interval = 86400;
        }
        size = ((endTime - startTime) / interval) + 1;
        vector<int> buckets(size, 0);

        auto it = mp[tweetName].lower_bound(startTime);
        while(it != mp[tweetName].end() && it->first <= endTime) {
            int index = (it->first - startTime) / interval;
            buckets[index] += it->second;
            it++;
        }

        return buckets;
    }
};
```
