/* Leetcode 981. Time Based Key-Value Store

Design a time-based key-value data structure that can store multiple values for the same key 
at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

TimeMap() --> Initializes the object of the data structure.
void set(String key, String value, int timestamp) --> Stores the key key with the value value at the given time timestamp.
String get(String key, int timestamp) --> Returns a value such that set was called previously, with timestamp_prev <= timestamp. 
                                          If there are multiple such values, it returns the value associated with the 
                                          largest timestamp_prev. If there are no values, it returns "".
 

Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
 

Constraints:
    1 <= key.length, value.length <= 100
    key and value consist of lowercase English letters and digits.
    1 <= timestamp <= 10^7
    All the timestamps timestamp of set are strictly increasing.
    At most 2 * 10^5 calls will be made to set and get.


Thought process:

                We want something like:

                    Key1  --> [(v1, t1), (v2, t2), (v3, t3)]
                    Key2  --> [(v1, t1), (v2, t2)]
                    Key3  --> [(v1, t1)]
                    Key4  --> []

                get(key1, t2) --> v2
                get(key2, t3) --> v2--> Such timestamp value doesnt exists, hence return the previous max value
                get(key4, t2) --> "" --> no value is there for this key at any timestamp

                All the timestamps timestamp of set are strictly increasing, this means the values[] will always be sorted by timestamps
                We can think of Binary search approach here

                for get() -> we always have to return timestamp <= targetTimestamp.
                i.e: either the current timestamp, or the one just smaller/previous than this

                Rather than linear search, we can leverage the sorted array based on timestamp and find <= target

                        0  1  2  3
               let a = [1, 2, 3, 6]           Find 4 here or ele <= 4
                        |         |
                       low       high

                       mid = (0 + 3) / 2 --> 1 --> 2, 
                       2 <= 4 --> explore higher possibility, move right hence low = mid + 1

                        0  1  2  3  4  5
                   a = [1, 2, 3, 6, 7, 8] 
                        |     |        |
                       low   mid      high

                       mid = (0 + 5) / 2 --> 2 --> 3
                       3 <= 4 --> explore higher possibility hence low = mid + 1

                        0  1  2  3  4  5  6   7   8
                   a = [1, 2, 3, 6, 7, 8, 9, 10, 11] 
                        |           |             |
                       low         mid           high

                       mid = (0 + 8) / 2 --> 4 --> 7
                       7 > 4 --> move left hence high = mid - 1

                        BS Logic seems something like this

                            if targetTimestamp <= a[mid] --> low = mid + 1 // explore higher possibility (update ans)
                            else                         --> high = mid - 1

                            return ans;

                    Corner cases:
                    - [4, 5, 6] and asked to find 2 -> we should return ""
                       if(timestamp[0] > targetTS) return ""
                    - [] find 1 -> return ""
*/

class TimeMap {
             //    key   tuple of value and timestamp
    timeMap: Map<string, [string, number][]>;

    constructor() {
        this.timeMap = new Map();
    }

    set(key: string, value: string, timestamp: number): void {

        /* If we already have values --> push the values at end, we know the input is such that timestamps are always sorted */
        if(this.timeMap.has(key)) {
            this.timeMap.get(key)?.push([value, timestamp]);
        }

        /* If there is already now value, then add new tuple */
        else {
            this.timeMap.set(key, [[value, timestamp]]);
        }
    }

    /* Binary search logic is here */
    get(key: string, timestamp: number): string {
        
        /* Corner cases */
        if(!this.timeMap.has(key)) return "";
        if(this.timeMap.get(key)![0][1] > timestamp) return "";

        let ans: string = ""; /* Stores the key of max possible timestamp from the BS for targetTimestamp */

        let low: number = 0;
        let high: number = this.timeMap.get(key)!.length - 1;

        while(low <= high) {

            const mid: number = low + Math.floor((high - low) / 2);
            const valuesAndTimestampArray = this.timeMap.get(key)![mid];

            if(valuesAndTimestampArray[1] <= timestamp) {
                low = mid + 1;
                ans = valuesAndTimestampArray[0];
            }
            else high = mid - 1;
        }

        return ans;
    }
}