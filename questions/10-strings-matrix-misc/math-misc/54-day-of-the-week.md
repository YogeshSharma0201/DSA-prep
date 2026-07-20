# Day of the Week

**Link:** https://leetcode.com/problems/day-of-the-week/

## Problem
Given a date as `day`, `month`, `year`, return the name of the day of the week for that date. The input is guaranteed to be a valid date between 1971-01-01 and 2100-12-31.

## Solution — Days from epoch (1971-01-01)
Count the number of days elapsed from 1971-01-01 (a known Saturday) to the target date. Do the same for a known anchor — today's date (2026-06-13, also a Saturday at index 0). The difference `(target_days - today_days) % 7` gives the offset from Saturday. Use `((diff % 7) + 7) % 7` to handle negative offsets when the target is before today.

`dayNames` is indexed from Saturday so that index 0 maps directly to the epoch day without any offset arithmetic.

## Code
```cpp
class Solution {
public:
    int dayOfMonth[2][12] = {
        {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
        {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
    };
    string dayNames[7] = {"Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};

    bool isLeapYear(int year) {
        return (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
    }

    int daysTill1971(int year, int month, int day) {
        int y = 1971, m = 1, res = 0;

        while (y != year) {
            res += isLeapYear(y) ? 366 : 365;
            y++;
        }

        bool b = isLeapYear(year);
        while (m < month) {
            res += dayOfMonth[b][m - 1];
            m++;
        }

        res += day - 1;
        return res;
    }

    string dayOfTheWeek(int day, int month, int year) {
        int days1 = daysTill1971(2026, 6, 13); // today (Saturday) = index 0
        int days2 = daysTill1971(year, month, day);

        return dayNames[((days2 - days1) % 7 + 7) % 7];
    }
};
```
