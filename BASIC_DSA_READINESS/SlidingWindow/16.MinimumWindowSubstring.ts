/* 76. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window substring 
of s such that every character in t (including duplicates) is included in the window. 
If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 10^5
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?

                                                BRUTE FORCE
                                                -----------

- Generate all the subarrays and get the minimum until the hashes are exactly equal or more
  if t has 2 Bs, s should have minimum 2 Bs

  Now, here to check if s's map has all the chars with at least the frequencies of t's map, we 
  need to iterate the t's map each time, 
  So, TC = O((n ^ 2) * (s_map + t_map))  --> Kind of O(n ^ 3)

  There is a technique to do this map frequency verification efficiently

  let s = ddaaabbca t = abc

     maintain a hash with already filled values of t's frequency
     and other chars frequency = 0
     a - 1
     b - 1
     c - 1
     we also maintain a count = 0

     Whenever s[i] is there in this hash, we decrease the frequency in hash and
     we increase the count if hash had positive value

     d d a a a b b c a
     i
     j

     we are here generating all possible substrings starting with ith index
     
     i = 0:

        j = 0: 
            s[j] NOT in hash
            hash[s[j]]--;
            count = 0;
            d - -1
            a - 1
            b - 1
            c - 1

        j = 1: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i j

            s[j] NOT in hash
            hash[s[j]]--;
            count = 0;
            d - -2
            a - 1
            b - 1
            c - 1

        j = 2: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i   j

            s[j] in hash
            hash[s[j]] > 0 -> count++ -> hash[s[j]]--;
            count = 1;
            d - -2
            a - 0
            b - 1
            c - 1

        j = 3: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i     j

            s[j] in hash
            hash[s[j]] <= 0 -> hash[s[j]]--;
            count = 1;
            d - -2
            a - -1
            b - 1
            c - 1

        j = 4: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i       j

            s[j] in hash
            hash[s[j]] <= 0 -> hash[s[j]]--;
            count = 1;
            d - -2
            a - -2
            b - 1
            c - 1

        j = 5: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i         j

            s[j] in hash
            hash[s[j]] > 0 -> count++ -> hash[s[j]]--;
            count = 2;
            d - -2
            a - -2
            b - 0
            c - 1

        j = 6: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i           j

            s[j] in hash
            hash[s[j]] <= 0 -> hash[s[j]]--;
            count = 2;
            d - -2
            a - -2
            b - -1
            c - 1

        j = 7: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            i             j

            s[j] in hash
            hash[s[j]] > 0 -> count++ -> hash[s[j]]--;
            count = 3;
            d - -2
            a - -2
            b - -1
            c - 0

            count = t.length -> means we have included all the characters
            don't need to check ahead as we need minumum length

            Now, store substring's length and store the i, we will need to 
            generate substring

                            hash[256] = [0, 0, ....]

                            for(j = 0 --- (m - 1)) {
                                hash[t[j]]++;  // fill the hash
                            }

                            for(i = 0 --- (n - 1)) {
                                for(j = 0 --- (m - 1)) {
                                    if((hash[s[j]]) > 0) count++;
                                    hash[s[j]]--

                                    if(count === t.length) {
                                        minLen = Math.min(minLen, (j - i + 1));
                                        startingIndex = i;
                                    }
                                }
                            }

                            return s.substring(startingIndex, minLen);

TC: O(n^2)
SC: O(256)

We need optimisation here, we can think of sliding window here since we are asked the minumum window here

Approach is almost same as above, lets see the dry run

  let s = ddaaabbca t = abc

     maintain a hash with already filled values of t's frequency
     and other chars frequency = 0
     a - 1
     b - 1
     c - 1
     we also maintain a count = 0

     Whenever s[i] is there in this hash, we decrease the frequency in hash and
     we increase the count if hash had positive value

     d d a a a b b c a
     l
     r

        r = 0: 
            s[r] NOT in hash
            hash[s[r]]--;
            count = 0;
            d - -1
            a - 1
            b - 1
            c - 1

        r = 1: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l r

            s[r] NOT in hash
            hash[s[r]]--;
            count = 0;
            d - -2
            a - 1
            b - 1
            c - 1

        r = 2: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l   r

            s[r] in hash
            hash[s[r]] > 0 -> hash[s[r]]--;
            count = 1;
            d - -2
            a - 0
            b - 1
            c - 1

        r = 3: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l     r

            s[r] in hash
            hash[s[r]] <= 0 -> hash[s[r]]--;
            count = 1;
            d - -2
            a - -1
            b - 1
            c - 1

        r = 4: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l       r

            s[r] in hash
            hash[s[r]] <= 0 -> hash[s[r]]--;
            count = 1;
            d - -2
            a - -2
            b - 1
            c - 1

        r = 5: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l         r

            s[r] in hash
            hash[s[r]] > 0 -> hash[s[r]]--;
            count = 2;
            d - -2
            a - -2
            b - 0
            c - 1

        r = 6: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l           r

            s[r] in hash
            hash[s[r]] <= 0 -> hash[s[r]]--;
            count = 2;
            d - -2
            a - -2
            b - -1
            c - 1

        r = 7: 
            0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l             r

            s[r] in hash
            hash[s[r]] > 0 -> hash[s[r]]--;
            count = 3;
            d - -2
            a - -2
            b - -1
            c - 0

            count = t.length -> means we have included all the characters
            
            NOTE HERE: Since count = t.length, the current substring has all chars of 
            t with frequencies

            Until count === t.length, we shrink the window and update minLen

            Now, do l++ and increase and do hash[s[l]]++ this time

   l = 0:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
            l             r

            hash[s[l]]++ and then l++
            count = 3;
            count is still 3, so its valid substring, update minLen
            d - -2 -> -1
            a - -2
            b - -1
            c - 0


   l = 1:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
              l           r

            hash[s[l]]++ and then l++
            count = 3;
            count is still 3, so its valid substring, update minLen
            d - -1 -> 0
            a - -2
            b - -1
            c - 0

   l = 2:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
                l         r

            hash[s[l]]++ and then l++
            count = 3;
            count is still 3, so its valid substring, update minLen
            d - 0
            a - -2 -> -1
            b - -1
            c - 0

   l = 3:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
                  l       r

            hash[s[l]]++ and then l++
            count = 3;
            count is still 3, so its valid substring, update minLen
            d - 0
            a - -1 -> 0
            b - -1
            c - 0

   l = 4:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
                    l     r

            hash[s[l]]++ and here, hash[s[l]] > 0 now, it means this character is reinserted
            Before doing l++, update minLen and at this moment s = "abbc" = valid
            count--;
            count = 2;
            d - 0
            a - 0 -> 1
            b - -1
            c - 0

   l = 5:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
                      l   r

            count !== t.length, hence we need to increment the window, r++
            count = 2;
            d - 0
            a - 1
            b - -1
            c - 0

   r = 8:   0 1 2 3 4 5 6 7 8
            d d a a a b b c a
                      l     r

            s[r] > 0, count++, hash[s[r]]--
            count = 3;
            d - 0
            a - 0
            b - -1
            c - 0

            Repeat the same shrinking window here now for this l

*/

function minWindow(s: string, t: string): string {
    const n1 = s.length
    const n2 = t.length

    if(n2 > n1) return "";

    let l = 0, r = 0, count = 0, minLen = Number.MAX_SAFE_INTEGER, startIndex = -1;
    let t_map = Array(256).fill(0);

    /* prefill t_map first */
    for(let i = 0; i < n2; i++) t_map[t.charCodeAt(i)]++;

    while (r < n1) {

        if(t_map[s.charCodeAt(r)] > 0) count++;
        t_map[s.charCodeAt(r)]--;
        
        /* Keep shrinking the window and update minLen until the count is valid */
        while((count === n2) && (l <= r)) {

            if((r - l + 1) < minLen) {
                startIndex = l;
                minLen = Math.min(minLen, (r - l + 1));
            }

            t_map[s.charCodeAt(l)]++; /* Increase the hash */
            if(t_map[s.charCodeAt(l)] > 0) count--;
            l++;
        }

        r++;
    }

    if(startIndex === -1) return ""; /* In case s = "a", t = "b" */
    return s.substring(startIndex, startIndex + minLen);
};