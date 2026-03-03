/* 1358. Number of Substrings Containing All Three Characters

Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence 
of all these characters a, b and c.

Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the 
             characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", 
             "cabc" and "abc" (again). 

Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters 
             a, b and c are "aaacb", "aacb" and "acb". 

Input: s = "abc"
Output: 1
 

Constraints:
    3 <= s.length <= 5 x 10^4
    s only consists of a, b or c characters.


                                                BRUTE FORCE
                                                -----------

- Just form substring starting from each char and check when the hash.size = 3 (a, b, c). Count++

                                    for(i = 0 --- (n - 1)) {

                                        let hash;
                                        for(j = i --- (n - 1)) {
                                            hash.set(a[j], count);
                                            if(hash.size === 3) count++;    
                                        }
                                    }

TC: O(n ^ 2)
SC: O(k) - hash size

                                            Slight Optimisation
                                            --------------------

Ex: a a c b c b   n = 6
    0 1 2 3 4 5
          i

          Moment we are at index = 3, hash size === 3, and adding any further character will keep it same
          So, we can say that substrings formed by adding further characters will also increase answer count

          Hence, we can directly add (n - i) to ans

          But this optimisation won't help for all the test cases. Like aaaaaaaa

                                    for(i = 0 --- (n - 1)) {

                                        let hash;
                                        for(j = i --- (n - 1)) {
                                            hash.set(a[j], count);
                                            if(hash.size === 3) count += (n - j); break;  // break immediately   
                                        }
                                    }

TC: O(n ^ 2)
SC: O(k) - hash size


                                            Optimisation
                                            ------------
    
- Since we need O(n) around TC, and we need substring, we can think of sliding window + 2 pointers

ex: b b a b c

This is slightly different logic.

In Brute force, we were considering all substrings starting from i, we were looking forward,
But here, we will look backwards, i.e. ends with a[i]

    b b a c b a
      i

      Here, we will look all the substrings that ends with b at i = 1 (b, bb)

    We will take 3 variables that store the latest index of a, b and c

    a = -1 
    b = -1
    c = -1

i = 0: 
    s = b b a c b a
        0 1 2 3 4 5
        i

        a = -1 
        b = 0
        c = -1

        Other two are still -1, so i++

i = 1: 
    s = b b a c b a
        0 1 2 3 4 5
          i

        a = -1 
        b = 1
        c = -1

        Other two are still -1, so i++

i = 2: 
    s = b b a c b a
        0 1 2 3 4 5
            i

        a = 2 
        b = 1
        c = -1

        c is still -1, so i++

i = 3: 
    s = b b a c b a
        0 1 2 3 4 5
              i

        a = 2 
        b = 1
        c = 3

        now we have all 3, a, b and c

        Now, we need to find the minimum subarray that contains all 3 chars, 
        We can find this using the indices we have maintained, 
        minIndex = b = 1, and max = c = 3 --> min substring with all 3 chars = b a c
                                                                               1 2 3
        
        We are now sure that if we include any characters before i = 1, we will get valid substrings only

        So, count += (minI + 1) -> 1 + 1 -> 2 -> (bbac, bac)

i = 4: 
    s = b b a c b a
        0 1 2 3 4 5
                i

        a = 2 
        b = 4
        c = 3

        now again we have all 3, a, b and c

        We need minumum window, which can be figured from these three hashes,
        its  a c b
             2 3 4

            All chars before this can be safely added keeping the string valid,
            count += (minI + 1) -> 2 + 1 = 3 -> (bbacb, bacb, acb)


i = 5: 
    s = b b a c b a
        0 1 2 3 4 5
                  i

        a = 5 
        b = 4
        c = 3

        now again we have all 3, a, b and c

        We need minumum window, which can be figured from these three hashes,
        its    c b c
               3 4 5

            All chars before this can be safely added keeping the string valid,
            count += (minI + 1) -> 3 + 1 = 4 -> (bbacba, bacba, acba, cba)

TC: O(n)
SC: O(1) */

function numberOfSubstrings(s: string): number {
    const n = s.length;

    let a = -1, b = -1, c = -1;

    let ans = 0;

    for(let i = 0; i < n; i++) {
        if(s[i] === 'a') a = i;
        if(s[i] === 'b') b = i;
        if(s[i] === 'c') c = i;

        /* if any of the three flags is -1, it means, string don't have all chars yet, so continue */
        if((a === -1) || (b === -1) || (c === -1)) continue;

        ans += Math.min(a, b, c) + 1;
    }

    return ans;
}


/* TODO - Sliding window here */
function numberOfSubstringsSlidingWindow(s: string): number {
    const n = s.length;
    let map = new Map();
    let l = 0, r = 0, ans = 0;

    while(r < n) {

        /* add current char to the map */
        if(!map.has(s[r])) map.set(s[r], 1);
        else map.set(s[r], map.get(s[r]) + 1);

        /* Shrink the window from left until we have all 3 chars in the substring/map */
        while((l <= r) && (map.size === 3)) {
            if(map.get(s[l]) === 1) map.delete(s[l]);
            else map.set(s[l], map.get(s[l]) - 1);

            ans += ()

            l++;
            ans++;
        }

        if(map.size === 3) ans++;

        r++;
    }

    return ans;
}