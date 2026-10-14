/* Two problems are covered here 

Longest Substring with K Uniques
Longest Substring with At most K Uniques

You are given a string s consisting only lowercase alphabets and an integer k.
 Your task is to find the length of the longest substring that contains exactly k distinct characters.

Note : If no such substring exists, return -1. 

Input: s = "aabacbebebe", k = 3
Output: 7
Explanation: The longest substring with exactly 3 distinct characters is "cbebebe",
             which includes 'c', 'b', and 'e'.

Input: s = "aaaa", k = 2
Output: -1
Explanation: There's no substring with 2 distinct characters.

Input: s = "aabaaab", k = 2
Output: 7
Explanation: The entire string "aabaaab" has exactly 2 unique characters 'a' and 'b', 
             making it the longest valid substring.

Constraints:
    1 ≤ s.size() ≤ 10^5
    1 ≤ k ≤ 26

Approach:
- Same variable sliding window approach we used in sum <= k problem, just here
  instead of sum, we use map.size */

function longestSubstrWithExactKDistinctChars(a, k) {
    const n = a.length

    let l = 0, r = 0, maxLen = -1; /* keep maxLen = -1, because return -1 if maxLen never updates */
    let map = new Map();

    while (r < n) {
        
        /* Add the character to the map */
        if(!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        /* shrink the window if map size exceeds k */
        while ((l <= r) && (map.size > k)) {
            if(map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            l++;
        }

        /* If map size === k, update maxLen */
        if (map.size === k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
        
}

function longestSubstrWithAtMostKDistinctChars(a, k) {
    const n = a.length

    let l = 0, r = 0, maxLen = -1; /* keep maxLen = -1, because return -1 if maxLen never updates */
    let map = new Map();

    while (r < n) {
        
        /* Add the character to the map */
        if(!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        /* shrink the window if map size exceeds k */
        while ((l <= r) && (map.size > k)) {
            if(map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            l++;
        }

        /* If map size <= k, update maxLen */
        if (map.size <= k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
        
}