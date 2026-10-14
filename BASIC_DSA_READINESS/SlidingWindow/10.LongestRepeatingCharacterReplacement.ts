/* 424. Longest Repeating Character Replacement

You are given a string s and an integer k. You can choose any character of the 
string and change it to any other uppercase English character. 
You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get 
after performing the above operations.

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:
    1 <= s.length <= 10^5
    s consists of only uppercase English letters.
    0 <= k <= s.length


This problem requires slighlty different approach

s = "AABABBA", k = 1
A - 4
B - 3

In order to maximise the frequency of any one specific character in a string, we need to maximise the 
frequency of the char that occurs maximum number of times.
For this to happen, we need to flip those chars that appear less frequently
So, flips = (n - MostFreqCharsFrequency) 

In Brute Force, We will apply this concept to each subarray

We will preserve the chars who is occurring max times, we try to flip the chars that have lower frequency

                                for(i=0---(n-1)) {

                                    for(j = i---(n - 1)) {

                                        // add current char to the hash
                                        hash[a[j] - 'A']++;    
                                        
                                        // Update the max frequency till now
                                        maxFreq = max(maxFreq, hash[a[j] - 'A']);

                                        // for this subarray, find the no of flips required
                                        // to maximise the majority char's frequency
                                        changes = (j - i + 1) - maxFreq;
                                        
                                        // at most k such changes are allowed
                                        if(changes <= k) maxLen = max(maxLen, (j - i + 1));
                                        
                                        // break out the loop since k exceeded, no point in accumulating further
                                        else break;
                                    }
                                }

                                return maxLen;

TC: O(n ^ 2)
SC: O(26) - Hash for capital alphabets only

To Optimise it to O(n) and also we need to think of subarrays, we can think of sliding window + 2 pointers

s = A A A B B C C D, k = 2
    l
    r

    maxLen = 0
    maxFreq = 0
    We will also maintain a hash<char, freq>

i = 0:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l
        r

        hash = (A, 1)

        maxFreq = 1

        Subarray length = 1, maxFreq = 1, hence flips = 1 - 1 = 0 <= k
        maxLen = 1

i = 1:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l r

        hash = (A, 2)

        maxFreq = 2

        Subarray length = 2, maxFreq = 2, hence flips = 2 - 2 = 0 <= k
        maxLen = 2

i = 2:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l   r

        hash = (A, 3)

        maxFreq = 3

        Subarray length = 3, maxFreq = 3, hence flips = 3 - 3 = 0 <= k
        maxLen = 3
i = 3:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l     r

        hash = (A, 3), (B, 1)

        maxFreq = 3

        Subarray length = 4, maxFreq = 3, hence flips = 4 - 3 = 1 <= k
        maxLen = 3

i = 4:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l       r

        hash = (A, 3), (B, 2)

        maxFreq = 3

        Subarray length = 5, maxFreq = 3, hence flips = 5 - 3 = 2 <= k
        maxLen = 5

i = 5:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
        l         r

        hash = (A, 3), (B, 2), (C, 1)

        maxFreq = 3

        Subarray length = 6, maxFreq = 3, hence flips = 6 - 3 = 3 > k

        when we cross k, Shink the window from left and while shrinking, update map and maxFreq

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
          l       r

        hash = (A, 2), (B, 2), (C, 1)
        maxFreq = 2
        Subarray length = 5, maxFreq = 2, hence flips = 5 - 2 = 3 > k

        Again we crossed k, shrink the window again

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
            l     r

        hash = (A, 1), (B, 2), (C, 1)
        maxFreq = 2
        Subarray length = 4, maxFreq = 2, hence flips = 4 - 2 = 2 <= k

        maxLen = 5 (Don't update)

i = 6:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
            l       r

        hash = (A, 1), (B, 2), (C, 2)

        maxFreq = 2

        Subarray length = 5, maxFreq = 2, hence flips = 5 - 2 > k
        We exceeded k, shrink the window

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
              l     r

        hash = (A, 0), (B, 2), (C, 2)
        maxFreq = 2
        Subarray length = 4, maxFreq = 2, hence flips = 4 - 2 = 2 <= k

        maxLen = 5 (Don't update)

i = 7:

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
              l       r

        hash = (A, 0), (B, 2), (C, 2), (D, 1)

        maxFreq = 2

        Subarray length = 5, maxFreq = 2, hence flips = 5 - 2 = 3 > k
        K exceeded, shrink the window

        0 1 2 3 4 5 6 7
    s = A A A B B C C D, k = 2
                l     r

        hash = (A, 0), (B, 1), (C, 2), (D, 1)
        maxFreq = 2
        Subarray length = 4, maxFreq = 2, hence flips = 4 - 2 = 2 <= k

        maxLen = 5 (Don't update)

        return maxLen = 5

TC: O(2n + k) outer loop, while loop and we are rescanning the map whenever we shrink the window
SC: O(k) for map
*/

function characterReplacement(a: string, k: number): number {
    const n = a.length

    let l = 0, r = 0, maxLen = -1; /* keep maxLen = -1, because return -1 if maxLen never updates */
    let map = new Map();
    let maxFreq = Number.MIN_SAFE_INTEGER;
    let flips = 0;

    while (r < n) {

        /* Add the character to the map */
        if (!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        maxFreq = Math.max(maxFreq, map.get(a[r]));  /* Update max Frequency */
        flips = (r - l + 1) - maxFreq;

        /* shrink the window if flips required exceeds k */
        while ((l <= r) && (flips > k)) {
            if (map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            /* Shrink window before calculating anything */
            l++;

            /* After window is shrinked, map is updated, recalculate maxFreq */
            let mapMax = Number.MIN_SAFE_INTEGER;
            for (const [key, value] of map) {
                mapMax = Math.max(mapMax, value);
            }
            maxFreq = Math.max(maxFreq, mapMax);  /* Update max Frequency */

            flips = (r - l + 1) - maxFreq;
            maxLen = Math.max(maxLen, (r - l + 1));     /* Update max Length */
        }

        /* If flips <= k, update maxLen */
        if (flips <= k) maxLen = Math.max(maxLen, (r - l + 1));     /* Update max Length */

        r++;
    }

    return maxLen;

}

/* Opimisation:

ex: A A A B B C

our ans is contributed by windowLength - maxFreq

when we have maxFreq = 5, no point in decreasing it to 4 or 3 when we shrink the window, 
It will not increase our answer, we need to focus on increasing window length

Now, TC: O(n + n)

Another optimisation: we don't need to use while during shrinking, 
                      we can just shrink once, so that maxLen is preserved

                      Note: this only works when we need only length, not actual substring

*/

function characterReplacementOpt(a: string, k: number): number {
    const n = a.length

    let l = 0, r = 0, maxLen = -1; /* keep maxLen = -1, because return -1 if maxLen never updates */
    let map = new Map();
    let maxFreq = Number.MIN_SAFE_INTEGER;
    let flips = 0;

    while (r < n) {

        /* Add the character to the map */
        if (!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        maxFreq = Math.max(maxFreq, map.get(a[r]));  /* Update max Frequency */
        flips = (r - l + 1) - maxFreq;

        /* shrink the window if flips required exceeds k */
        while ((l <= r) && (flips > k)) {
            if (map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            /* Shrink window before calculating anything */
            l++;

            /* Avoid recalculating */

            // /* After window is shrinked, map is updated, recalculate maxFreq */
            // let mapMax = Number.MIN_SAFE_INTEGER;
            // for (const [key, value] of map) {
            //     mapMax = Math.max(mapMax, value);
            // }
            // maxFreq = Math.max(maxFreq, mapMax);  /* Update max Frequency */

            flips = (r - l + 1) - maxFreq;
            maxLen = Math.max(maxLen, (r - l + 1));     /* Update max Length */
        }

        /* If flips <= k, update maxLen */
        if (flips <= k) maxLen = Math.max(maxLen, (r - l + 1));     /* Update max Length */

        r++;
    }

    return maxLen;
};