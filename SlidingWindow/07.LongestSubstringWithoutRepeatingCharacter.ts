/* 3. Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without duplicate characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

                                                BRUTE FORCE
                                                -----------

for each char, generate substrings with non-repeating chars
Use hashmap to track the character's frequency

                                for(i = 0 ---- (n - 1)) {

                                    substr = "";
                                    hash = new Map();

                                    for(j = i --- (n - 1)) {
                                        if(!hash.get(a[j])) {
                                            substr += arr[j];  // add only if its unique
                                            maxLen = max(maxLen, (j - 1 + 1));
                                            hash.set(a[j], 1)
                                        }

                                        // if the char is not unique, no point in adding it
                                        // and moving further, because, we already have duplicate in substr now
                                        else break;
                                    }
                                }

                                return maxLen;

TC: O(n ^ 2)
SC: O(256) -> hash

                                            OPTIMAL SOLUTION
                                            ----------------

Whenever we are asked to find longest/shortest substrings, always think of sliding window + 2 pointers

let s = c a d b z a b c d
        0 1 2 3 4 5 6 7 8
        l
        r

we will also maintain the hash where we store the <char, latest_occurrence_index>

i = 0:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        lr
    a[r] not there in hash, so include this in ans
    maxLen = 1
    hash = (c, 0)

i = 1:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l r
    a[r] not there in hash, so include this in ans
    maxLen = 2
    hash = (c, 0), (a, 1)

i = 2:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l   r
    a[r] not there in hash, so include this in ans
    maxLen = 3
    hash = (c, 0), (a, 1), (d, 2)

i = 3:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l     r
    a[r] not there in hash, so include this in ans
    maxLen = 4
    hash = (c, 0), (a, 1), (d, 2), (b, 3)

i = 4:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l       r
    a[r] not there in hash, so include this in ans
    maxLen = 5
    hash = (c, 0), (a, 1), (d, 2), (b, 3), (z, 4)

i = 5:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l         r
    
        a[r] IS IN HASH

        c a d b z a b c d                         we will move previously seen index + 1
        0 1 2 3 4 5 6 7 8
        l         r

        c a d b z a b c d                        Now, that repeating a will be gone, but this window is smaller
        0 1 2 3 4 5 6 7 8                        So, don't update maxLen, 
            l       r                            before doing r++, update a's index in the map and r++

    maxLen = 5
    hash = (c, 0), (a, 5), (d, 2), (b, 3), (z, 4)
                    ||||

i = 6:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
        l           r
    
        a[r] IS IN HASH

        c a d b z a b c d                         we will move previously seen index + 1
        0 1 2 3 4 5 6 7 8
                l   r

        c a d b z a b c d                        Now, that repeating b will be gone, but this window is smaller
        0 1 2 3 4 5 6 7 8                        So, don't update maxLen, 
                l     r                          before doing r++, update b's index in the map and r++

    maxLen = 5
    hash = (c, 0), (a, 5), (d, 2), (b, 6), (z, 4)
                                     ||||

 i = 7:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
                l     r
    
        a[r] IS IN HASH

        c a d b z a b c d                         we will move previously seen index + 1
        0 1 2 3 4 5 6 7 8
                l     r

        c a d b z a b c d                        Now, that repeating c will be gone, this window is also larger
        0 1 2 3 4 5 6 7 8                        So, UPDATE maxLen
            l           r                        before doing r++, update c's index in the map and r++

    maxLen = 6
    hash = (c, 7), (a, 5), (d, 2), (b, 6), (z, 4)
            ||||

 i = 8:
        c a d b z a b c d  
        0 1 2 3 4 5 6 7 8
            l           r
    
        a[r] IS IN HASH

        c a d b z a b c d                         we will move previously seen index + 1
        0 1 2 3 4 5 6 7 8
              l         r

        c a d b z a b c d                        Now, that repeating d will be gone, but this window is smaller
        0 1 2 3 4 5 6 7 8                        So, DONT UPDATE maxLen
              l           r                      before doing r++, update d's index in the map and r++

    maxLen = 6
    hash = (c, 7), (a, 5), (d, 8), (b, 6), (z, 4)
                            ||||


TC: O(n)
SC: O(1) */

/* Leetcode submission */
function lengthOfLongestSubstring(s: string): number {
    const n = s.length;

    let l = 0, r = 0, maxLen = 0;
    let map = new Map();

    while (r < n) {
        if (!map.has(s[r])) {
            map.set(s[r], r);
            maxLen = Math.max(maxLen, (r - l + 1));
        }
        else {
            const lastIndex = map.get(s[r]);
            if (lastIndex >= l) l = lastIndex + 1; // update l only if next index is ahead
            maxLen = Math.max(maxLen, (r - l + 1));
            map.set(s[r], r);
        }

        r++;
    }

    return maxLen;
};

/* GFG Submission */
class Solution {
    longestUniqueSubstr(s) {
        const n = s.length;
        let lastIndex = new Array(256).fill(-1);
        
        let l = 0;
        let maxLen = 0;

        for (let r = 0; r < n; r++) {
            const charCode = s.charCodeAt(r);

            if (lastIndex[charCode] >= l) {
                l = lastIndex[charCode] + 1;
            }

            lastIndex[charCode] = r;
            maxLen = Math.max(maxLen, r - l + 1);
        }

        return maxLen;
        
    }
}